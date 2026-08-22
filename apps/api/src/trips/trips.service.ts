import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateTripDto } from './dto/trip.dto';
import {
  CreateBookingDto, CreateCollaboratorDto, CreateExpenseDto,
  CreateJournalEntryDto, CreatePackingItemDto, ReplanDto,
  UpdateBookingDto, UpdatePackingItemDto,
} from './dto/workspace.dto';
import type { GeneratedItinerary, TripItineraryInput } from '../ai/ai.types';
import type { JwtUser } from '../common/guards/jwt-auth.guard';

const workspaceInclude = {
  itineraries: { orderBy: { createdAt: 'desc' as const } },
  expenses: { orderBy: { spentAt: 'desc' as const } },
  packingItems: { orderBy: [{ category: 'asc' as const }, { createdAt: 'asc' as const }] },
  collaborators: { orderBy: { createdAt: 'asc' as const } },
  journalEntries: { orderBy: { entryDate: 'desc' as const } },
  bookings: { orderBy: { createdAt: 'desc' as const } },
} satisfies Prisma.TripInclude;

type TripWithWorkspace = Prisma.TripGetPayload<{ include: typeof workspaceInclude }>;

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService, private readonly ai: AiService) {}

  async create(userId: string, dto: CreateTripDto) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) throw new BadRequestException('Ngày không hợp lệ');
    if (end < start) throw new BadRequestException('Ngày kết thúc phải sau ngày bắt đầu');
    const input: TripItineraryInput = {
      destination: dto.destination, startDate: start.toISOString(), endDate: end.toISOString(),
      travelers: dto.travelers, budget: dto.budget, preferences: dto.preferences ?? '',
    };
    const generated = await this.ai.generateItinerary(input);
    const trip = await this.prisma.trip.create({
      data: {
        userId, destination: dto.destination.trim(), startDate: start, endDate: end,
        travelers: dto.travelers, budget: dto.budget, preferences: dto.preferences?.trim() ?? '',
        status: 'GENERATED',
        itineraries: { create: { title: generated.title, description: generated.summary ?? '', content: JSON.stringify(generated) } },
      },
      include: workspaceInclude,
    });
    return this.formatTrip(trip, userId, '');
  }

  async listByUser(current: JwtUser) {
    const trips = await this.prisma.trip.findMany({
      where: { OR: [{ userId: current.sub }, { collaborators: { some: { email: current.email.toLowerCase() } } }] },
      orderBy: { createdAt: 'desc' }, include: workspaceInclude,
    });
    return trips.map((trip) => this.formatTrip(trip, current.sub, current.email));
  }

  async getById(current: JwtUser, tripId: string) {
    const trip = await this.findTrip(tripId);
    this.assertCanView(trip, current);
    return this.formatTrip(trip, current.sub, current.email);
  }

  async getShared(token: string) {
    const trip = await this.prisma.trip.findFirst({ where: { shareToken: token, isPublic: true }, include: workspaceInclude });
    if (!trip) throw new NotFoundException('Liên kết hành trình không tồn tại hoặc đã hết hiệu lực');
    const formatted = this.formatTrip(trip, '', '');
    return {
      ...formatted, userId: undefined, expenses: undefined, collaborators: undefined,
      bookings: formatted.bookings.map((booking) => ({ ...booking, confirmation: '' })),
      canEdit: false, isOwner: false,
    };
  }

  async remove(current: JwtUser, tripId: string) {
    const trip = await this.findTrip(tripId);
    this.assertOwner(trip, current);
    await this.prisma.trip.delete({ where: { id: tripId } });
    return { id: tripId, deleted: true };
  }

  async updateItinerary(current: JwtUser, tripId: string, raw: Record<string, unknown>) {
    const trip = await this.findTrip(tripId);
    this.assertCanEdit(trip, current);
    await this.saveVersion(tripId, validateItinerary(raw));
    return this.getById(current, tripId);
  }

  async replan(current: JwtUser, tripId: string, dto: ReplanDto) {
    const trip = await this.findTrip(tripId);
    this.assertCanEdit(trip, current);
    const currentContent = this.latestContent(trip);
    const generated = await this.ai.generateItinerary({
      destination: trip.destination, startDate: trip.startDate.toISOString(), endDate: trip.endDate.toISOString(),
      travelers: trip.travelers, budget: trip.budget,
      preferences: [trip.preferences, dto.reason].filter(Boolean).join('. '),
    });
    let next = generated;
    if (currentContent && typeof dto.dayIndex === 'number') {
      if (!currentContent.days[dto.dayIndex]) throw new BadRequestException('Ngày được chọn không tồn tại');
      next = structuredClone(currentContent);
      const generatedDay = generated.days[dto.dayIndex] ?? generated.days[0];
      if (!generatedDay) throw new BadRequestException('AI không tạo được ngày thay thế');
      if (typeof dto.activityIndex === 'number') {
        if (!next.days[dto.dayIndex].activities[dto.activityIndex]) throw new BadRequestException('Hoạt động được chọn không tồn tại');
        const replacement = generatedDay.activities[dto.activityIndex] ?? generatedDay.activities[0];
        if (!replacement) throw new BadRequestException('AI không tạo được hoạt động thay thế');
        next.days[dto.dayIndex].activities[dto.activityIndex] = replacement;
      } else {
        next.days[dto.dayIndex] = { ...generatedDay, day: currentContent.days[dto.dayIndex].day, date: currentContent.days[dto.dayIndex].date };
      }
    }
    await this.saveVersion(tripId, next);
    return this.getById(current, tripId);
  }

  async toggleShare(current: JwtUser, tripId: string, enabled: boolean) {
    const trip = await this.findTrip(tripId);
    this.assertOwner(trip, current);
    return this.prisma.trip.update({
      where: { id: tripId },
      data: { isPublic: enabled, shareToken: enabled ? trip.shareToken ?? randomUUID().replace(/-/g, '') : null },
      select: { isPublic: true, shareToken: true },
    });
  }

  async addExpense(current: JwtUser, tripId: string, dto: CreateExpenseDto) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    return this.prisma.tripExpense.create({ data: {
      tripId, title: dto.title.trim(), category: dto.category.trim(), amount: dto.amount,
      paidBy: dto.paidBy?.trim() ?? '', spentAt: dto.spentAt ? new Date(dto.spentAt) : new Date(),
    } });
  }

  async removeExpense(current: JwtUser, tripId: string, id: string) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    await this.assertChildExists('expense', id, tripId); await this.prisma.tripExpense.delete({ where: { id } });
    return { id, deleted: true };
  }

  async addPackingItem(current: JwtUser, tripId: string, dto: CreatePackingItemDto) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    return this.prisma.packingItem.create({ data: {
      tripId, name: dto.name.trim(), category: dto.category?.trim() || 'Khác', quantity: dto.quantity ?? 1,
    } });
  }

  async generatePacking(current: JwtUser, tripId: string) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    const days = Math.max(1, Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / 86_400_000) + 1);
    const suggestions = [
      ['Giấy tờ', 'CCCD/Hộ chiếu', 1], ['Giấy tờ', 'Vé và xác nhận đặt chỗ', 1],
      ['Trang phục', 'Áo', Math.min(days + 1, 10)], ['Trang phục', 'Quần', Math.min(Math.ceil(days / 2) + 1, 7)],
      ['Cá nhân', 'Đồ vệ sinh cá nhân', 1], ['Sức khỏe', 'Thuốc cá nhân', 1],
      ['Điện tử', 'Sạc điện thoại', 1], ['Điện tử', 'Pin dự phòng', 1],
      ['Du lịch', 'Ô hoặc áo mưa gọn nhẹ', 1], ['Du lịch', `Bản đồ ngoại tuyến ${trip.destination}`, 1],
    ] as const;
    const existing = new Set(trip.packingItems.map((item) => item.name.toLowerCase()));
    const data = suggestions.filter(([, name]) => !existing.has(name.toLowerCase())).map(([category, name, quantity]) => ({ tripId, category, name, quantity }));
    if (data.length) await this.prisma.packingItem.createMany({ data });
    return this.getById(current, tripId);
  }

  async updatePackingItem(current: JwtUser, tripId: string, id: string, dto: UpdatePackingItemDto) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    await this.assertChildExists('packing', id, tripId);
    return this.prisma.packingItem.update({ where: { id }, data: dto });
  }

  async removePackingItem(current: JwtUser, tripId: string, id: string) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    await this.assertChildExists('packing', id, tripId); await this.prisma.packingItem.delete({ where: { id } });
    return { id, deleted: true };
  }

  async inviteCollaborator(current: JwtUser, tripId: string, dto: CreateCollaboratorDto) {
    const trip = await this.findTrip(tripId); this.assertOwner(trip, current);
    const email = dto.email.trim().toLowerCase();
    if (email === current.email.toLowerCase()) throw new BadRequestException('Bạn đã là chủ sở hữu chuyến đi');
    const collaborator = await this.prisma.tripCollaborator.upsert({
      where: { tripId_email: { tripId, email } }, update: { role: dto.role }, create: { tripId, email, role: dto.role },
    });
    const invited = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (invited) await this.prisma.notification.create({ data: {
      userId: invited.id, type: 'COLLABORATION', title: 'Lời mời cộng tác hành trình',
      message: `Bạn được mời tham gia chuyến đi ${trip.destination}.`, link: `/trips/${tripId}`,
    } });
    return collaborator;
  }

  async removeCollaborator(current: JwtUser, tripId: string, id: string) {
    const trip = await this.findTrip(tripId); this.assertOwner(trip, current);
    if (!trip.collaborators.some((row) => row.id === id)) throw new NotFoundException('Thành viên không tồn tại');
    await this.prisma.tripCollaborator.delete({ where: { id } }); return { id, deleted: true };
  }

  async addJournal(current: JwtUser, tripId: string, dto: CreateJournalEntryDto) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    return this.prisma.journalEntry.create({ data: {
      tripId, title: dto.title.trim(), content: dto.content.trim(), imageUrl: dto.imageUrl?.trim() ?? '',
      entryDate: dto.entryDate ? new Date(dto.entryDate) : new Date(),
    } });
  }

  async removeJournal(current: JwtUser, tripId: string, id: string) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    await this.assertChildExists('journal', id, tripId); await this.prisma.journalEntry.delete({ where: { id } });
    return { id, deleted: true };
  }

  async addBooking(current: JwtUser, tripId: string, dto: CreateBookingDto) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    return this.prisma.booking.create({ data: {
      tripId, type: dto.type.trim(), provider: dto.provider.trim(), confirmation: dto.confirmation?.trim() ?? '',
      amount: dto.amount ?? 0, status: dto.status ?? 'PLANNED', bookedAt: dto.status === 'BOOKED' ? new Date() : null,
    } });
  }

  async updateBooking(current: JwtUser, tripId: string, id: string, dto: UpdateBookingDto) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    await this.assertChildExists('booking', id, tripId);
    return this.prisma.booking.update({ where: { id }, data: { ...dto, bookedAt: dto.status === 'BOOKED' ? new Date() : undefined } });
  }

  async removeBooking(current: JwtUser, tripId: string, id: string) {
    const trip = await this.findTrip(tripId); this.assertCanEdit(trip, current);
    await this.assertChildExists('booking', id, tripId); await this.prisma.booking.delete({ where: { id } });
    return { id, deleted: true };
  }

  async weather(current: JwtUser, tripId: string) {
    const trip = await this.findTrip(tripId); this.assertCanView(trip, current);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trip.destination)}&count=1&language=vi&format=json`, { signal: AbortSignal.timeout(6000) });
      if (!geoRes.ok) throw new Error();
      const geo = await geoRes.json() as { results?: Array<{ latitude: number; longitude: number; name: string; country?: string }> };
      const place = geo.results?.[0];
      if (!place) return { available: false, reason: 'Không tìm thấy tọa độ điểm đến' };
      const limit = new Date(); limit.setDate(limit.getDate() + 15);
      if (trip.startDate > limit) return { available: false, reason: 'Dự báo sẽ có trước ngày khởi hành khoảng 16 ngày', place };
      const endDate = trip.endDate < limit ? trip.endDate : limit;
      const query = `latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${trip.startDate.toISOString().slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}`;
      const forecastRes = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`, { signal: AbortSignal.timeout(6000) });
      if (!forecastRes.ok) throw new Error();
      const forecast = await forecastRes.json() as { daily?: Record<string, unknown> };
      return { available: true, place, daily: forecast.daily ?? null };
    } catch {
      return { available: false, reason: 'Dữ liệu thời tiết tạm thời chưa khả dụng' };
    }
  }

  async passport(current: JwtUser) {
    const trips = await this.prisma.trip.findMany({
      where: { userId: current.sub }, include: { itineraries: { orderBy: { createdAt: 'desc' }, take: 1 }, expenses: true }, orderBy: { startDate: 'desc' },
    });
    const destinations = [...new Set(trips.map((trip) => trip.destination.trim()))];
    const totalDays = trips.reduce((sum, trip) => sum + Math.max(1, Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / 86_400_000) + 1), 0);
    const totalSpent = trips.flatMap((trip) => trip.expenses).reduce((sum, item) => sum + item.amount, 0);
    const badges = [
      trips.length >= 1 && { id: 'first-trip', icon: '✈️', title: 'Chuyến đi đầu tiên', description: 'Đã bắt đầu hành trình cùng TravelMind' },
      trips.length >= 5 && { id: 'explorer', icon: '🧭', title: 'Nhà khám phá', description: 'Đã lên kế hoạch ít nhất 5 chuyến đi' },
      destinations.length >= 3 && { id: 'city-hopper', icon: '🌏', title: 'Dấu chân thành phố', description: 'Đã ghé thăm ít nhất 3 điểm đến' },
      totalDays >= 14 && { id: 'slow-traveler', icon: '🌿', title: 'Người đi sâu', description: 'Đã có hơn 14 ngày trải nghiệm' },
    ].filter(Boolean);
    return {
      totalTrips: trips.length, totalDays, totalSpent, destinations, badges,
      timeline: trips.map((trip) => ({
        id: trip.id, destination: trip.destination, startDate: trip.startDate.toISOString(), endDate: trip.endDate.toISOString(),
        coverImage: safeParseItinerary(trip.itineraries[0]?.content)?.coverImage ?? '',
      })),
    };
  }

  private async findTrip(id: string): Promise<TripWithWorkspace> {
    const trip = await this.prisma.trip.findUnique({ where: { id }, include: workspaceInclude });
    if (!trip) throw new NotFoundException('Không tìm thấy chuyến đi'); return trip;
  }

  private assertCanView(trip: TripWithWorkspace, current: JwtUser) {
    if (trip.userId === current.sub || trip.collaborators.some((row) => row.email === current.email.toLowerCase())) return;
    throw new ForbiddenException('Bạn không có quyền xem chuyến đi này');
  }

  private assertCanEdit(trip: TripWithWorkspace, current: JwtUser) {
    if (trip.userId === current.sub || trip.collaborators.some((row) => row.email === current.email.toLowerCase() && row.role === 'EDITOR')) return;
    throw new ForbiddenException('Bạn không có quyền chỉnh sửa chuyến đi này');
  }

  private assertOwner(trip: TripWithWorkspace, current: JwtUser) {
    if (trip.userId !== current.sub) throw new ForbiddenException('Chỉ chủ sở hữu được thực hiện thao tác này');
  }

  private latestContent(trip: TripWithWorkspace) { return safeParseItinerary(trip.itineraries[0]?.content); }

  private async saveVersion(tripId: string, content: GeneratedItinerary) {
    const serialized = JSON.stringify(content);
    if (serialized.length > 1_000_000) throw new BadRequestException('Lịch trình quá lớn');
    await this.prisma.$transaction([
      this.prisma.itinerary.create({ data: { tripId, title: content.title, description: content.summary ?? '', content: serialized } }),
      this.prisma.trip.update({ where: { id: tripId }, data: { status: 'GENERATED' } }),
    ]);
  }

  private async assertChildExists(type: 'expense' | 'packing' | 'journal' | 'booking', id: string, tripId: string) {
    const found = type === 'expense'
      ? await this.prisma.tripExpense.findFirst({ where: { id, tripId }, select: { id: true } })
      : type === 'packing'
        ? await this.prisma.packingItem.findFirst({ where: { id, tripId }, select: { id: true } })
        : type === 'journal'
          ? await this.prisma.journalEntry.findFirst({ where: { id, tripId }, select: { id: true } })
          : await this.prisma.booking.findFirst({ where: { id, tripId }, select: { id: true } });
    if (!found) throw new NotFoundException('Dữ liệu không tồn tại trong chuyến đi này');
  }

  private formatTrip(trip: TripWithWorkspace, userId: string, email: string) {
    const itinerary = trip.itineraries[0];
    const collaborator = trip.collaborators.find((row) => row.email === email.toLowerCase());
    const isOwner = trip.userId === userId;
    return {
      id: trip.id, userId: trip.userId, destination: trip.destination,
      startDate: trip.startDate.toISOString(), endDate: trip.endDate.toISOString(), travelers: trip.travelers,
      budget: trip.budget, preferences: trip.preferences, status: trip.status,
      isPublic: trip.isPublic, shareToken: isOwner ? trip.shareToken : null,
      isOwner, canEdit: isOwner || collaborator?.role === 'EDITOR',
      createdAt: trip.createdAt.toISOString(), updatedAt: trip.updatedAt.toISOString(),
      itinerary: itinerary ? {
        id: itinerary.id, title: itinerary.title, description: itinerary.description,
        content: safeParseItinerary(itinerary.content), createdAt: itinerary.createdAt.toISOString(),
        updatedAt: itinerary.updatedAt.toISOString(), versionCount: trip.itineraries.length,
      } : null,
      expenses: trip.expenses, packingItems: trip.packingItems, collaborators: trip.collaborators,
      journalEntries: trip.journalEntries, bookings: trip.bookings,
    };
  }
}

function validateItinerary(raw: Record<string, unknown>): GeneratedItinerary {
  const content = raw as unknown as GeneratedItinerary;
  if (typeof content.title !== 'string' || typeof content.summary !== 'string' || !Array.isArray(content.days) ||
    !content.days.every((day) => typeof day.day === 'number' && typeof day.date === 'string' && Array.isArray(day.activities) &&
      day.activities.every((activity) => typeof activity.time === 'string' && typeof activity.title === 'string' && typeof activity.location === 'string'))) {
    throw new BadRequestException('Cấu trúc lịch trình không hợp lệ');
  }
  return content;
}

function safeParseItinerary(input?: string): GeneratedItinerary | null {
  if (!input) return null;
  try { return JSON.parse(input) as GeneratedItinerary; } catch { return null; }
}
