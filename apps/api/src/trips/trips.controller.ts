import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/trip.dto';
import {
  CreateBookingDto, CreateCollaboratorDto, CreateExpenseDto, CreateJournalEntryDto,
  CreatePackingItemDto, ReplanDto, ToggleShareDto, UpdateBookingDto,
  UpdateItineraryDto, UpdatePackingItemDto,
} from './dto/workspace.dto';
import { JwtAuthGuard, JwtUser } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly trips: TripsService) {}

  @Post()
  create(@CurrentUser() current: JwtUser, @Body() dto: CreateTripDto) {
    return this.trips.create(current.sub, dto);
  }

  @Get()
  list(@CurrentUser() current: JwtUser) { return this.trips.listByUser(current); }

  @Get('passport/summary')
  passport(@CurrentUser() current: JwtUser) { return this.trips.passport(current); }

  @Public()
  @Get('shared/:token')
  shared(@Param('token') token: string) { return this.trips.getShared(token); }

  @Get(':id')
  byId(@CurrentUser() current: JwtUser, @Param('id') id: string) { return this.trips.getById(current, id); }

  @Patch(':id/itinerary')
  updateItinerary(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: UpdateItineraryDto) {
    return this.trips.updateItinerary(current, id, dto.content);
  }

  @Post(':id/replan')
  replan(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: ReplanDto) {
    return this.trips.replan(current, id, dto);
  }

  @Patch(':id/share')
  share(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: ToggleShareDto) {
    return this.trips.toggleShare(current, id, dto.enabled);
  }

  @Get(':id/weather')
  weather(@CurrentUser() current: JwtUser, @Param('id') id: string) { return this.trips.weather(current, id); }

  @Post(':id/expenses')
  addExpense(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: CreateExpenseDto) {
    return this.trips.addExpense(current, id, dto);
  }

  @Delete(':id/expenses/:expenseId')
  removeExpense(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('expenseId') expenseId: string) {
    return this.trips.removeExpense(current, id, expenseId);
  }

  @Post(':id/packing')
  addPacking(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: CreatePackingItemDto) {
    return this.trips.addPackingItem(current, id, dto);
  }

  @Post(':id/packing/generate')
  generatePacking(@CurrentUser() current: JwtUser, @Param('id') id: string) { return this.trips.generatePacking(current, id); }

  @Patch(':id/packing/:itemId')
  updatePacking(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('itemId') itemId: string, @Body() dto: UpdatePackingItemDto) {
    return this.trips.updatePackingItem(current, id, itemId, dto);
  }

  @Delete(':id/packing/:itemId')
  removePacking(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('itemId') itemId: string) {
    return this.trips.removePackingItem(current, id, itemId);
  }

  @Post(':id/collaborators')
  invite(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: CreateCollaboratorDto) {
    return this.trips.inviteCollaborator(current, id, dto);
  }

  @Delete(':id/collaborators/:collaboratorId')
  removeCollaborator(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('collaboratorId') collaboratorId: string) {
    return this.trips.removeCollaborator(current, id, collaboratorId);
  }

  @Post(':id/journal')
  addJournal(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: CreateJournalEntryDto) {
    return this.trips.addJournal(current, id, dto);
  }

  @Delete(':id/journal/:entryId')
  removeJournal(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('entryId') entryId: string) {
    return this.trips.removeJournal(current, id, entryId);
  }

  @Post(':id/bookings')
  addBooking(@CurrentUser() current: JwtUser, @Param('id') id: string, @Body() dto: CreateBookingDto) {
    return this.trips.addBooking(current, id, dto);
  }

  @Patch(':id/bookings/:bookingId')
  updateBooking(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('bookingId') bookingId: string, @Body() dto: UpdateBookingDto) {
    return this.trips.updateBooking(current, id, bookingId, dto);
  }

  @Delete(':id/bookings/:bookingId')
  removeBooking(@CurrentUser() current: JwtUser, @Param('id') id: string, @Param('bookingId') bookingId: string) {
    return this.trips.removeBooking(current, id, bookingId);
  }

  @Delete(':id')
  remove(@CurrentUser() current: JwtUser, @Param('id') id: string) { return this.trips.remove(current, id); }
}
