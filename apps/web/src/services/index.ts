import { aiApi, api, tokenStore } from './api';
import {
  AdminAnalytics,
  AdminDashboardStats,
  AdminHeroSlide,
  AdminTrip,
  AdminUser,
  AuthResponse,
  AuthUser,
  ChangePasswordPayload,
  ChatMessage,
  ChatSendResponse,
  ChatSessionSummary,
  CreateRecommendationPayload,
  CreateTripPayload,
  GeneratedItinerary,
  HeroSlideCreatePayload,
  HeroSlideUpdatePayload,
  Recommendation,
  RecommendationSummary,
  Trip,
  WeatherData,
  TravelPassport,
  AppNotification,
  UpdateProfilePayload,
  UpdateRecommendationPayload,
  UserProfile,
} from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    tokenStore.set(data.accessToken);
    return data;
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    tokenStore.set(data.accessToken);
    return data;
  },

  async fetchMe(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser>('/users/me');
    return data;
  },

  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>('/users/me');
    return data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const { data } = await api.patch<UserProfile>('/users/me', payload);
    return data;
  },

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await api.post('/users/me/password', payload);
  },

  logout() {
    tokenStore.clear();
  },
};

export const tripService = {
  async create(payload: CreateTripPayload): Promise<Trip> {
    // POST /trips triggers backend AI generation (can take 40-90s), so use the long-timeout instance.
    const { data } = await aiApi.post<Trip>('/trips', payload);
    return data;
  },

  async list(): Promise<Trip[]> {
    const { data } = await api.get<Trip[]>('/trips');
    return data;
  },

  async byId(id: string): Promise<Trip> {
    const { data } = await api.get<Trip>(`/trips/${id}`);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/trips/${id}`);
  },
  async shared(token: string): Promise<Trip> {
    const { data } = await api.get<Trip>(`/trips/shared/${token}`);
    return data;
  },
  async updateItinerary(id: string, content: GeneratedItinerary): Promise<Trip> {
    const { data } = await api.patch<Trip>(`/trips/${id}/itinerary`, { content });
    return data;
  },
  async replan(id: string, payload: { dayIndex?: number; activityIndex?: number; reason?: string }): Promise<Trip> {
    const { data } = await aiApi.post<Trip>(`/trips/${id}/replan`, payload);
    return data;
  },
  async toggleShare(id: string, enabled: boolean): Promise<{ isPublic: boolean; shareToken: string | null }> {
    const { data } = await api.patch<{ isPublic: boolean; shareToken: string | null }>(`/trips/${id}/share`, { enabled });
    return data;
  },
  async weather(id: string): Promise<WeatherData> {
    const { data } = await api.get<WeatherData>(`/trips/${id}/weather`);
    return data;
  },
  async passport(): Promise<TravelPassport> {
    const { data } = await api.get<TravelPassport>('/trips/passport/summary');
    return data;
  },
  async addExpense(id: string, payload: { title: string; category: string; amount: number; paidBy?: string }): Promise<void> {
    await api.post(`/trips/${id}/expenses`, payload);
  },
  async removeExpense(id: string, expenseId: string): Promise<void> {
    await api.delete(`/trips/${id}/expenses/${expenseId}`);
  },
  async addPacking(id: string, payload: { name: string; category?: string; quantity?: number }): Promise<void> {
    await api.post(`/trips/${id}/packing`, payload);
  },
  async generatePacking(id: string): Promise<Trip> {
    const { data } = await api.post<Trip>(`/trips/${id}/packing/generate`);
    return data;
  },
  async updatePacking(id: string, itemId: string, payload: { isPacked?: boolean; quantity?: number }): Promise<void> {
    await api.patch(`/trips/${id}/packing/${itemId}`, payload);
  },
  async removePacking(id: string, itemId: string): Promise<void> {
    await api.delete(`/trips/${id}/packing/${itemId}`);
  },
  async invite(id: string, email: string, role: 'VIEWER' | 'EDITOR'): Promise<void> {
    await api.post(`/trips/${id}/collaborators`, { email, role });
  },
  async removeCollaborator(id: string, collaboratorId: string): Promise<void> {
    await api.delete(`/trips/${id}/collaborators/${collaboratorId}`);
  },
  async addJournal(id: string, payload: { title: string; content: string; imageUrl?: string; entryDate?: string }): Promise<void> {
    await api.post(`/trips/${id}/journal`, payload);
  },
  async removeJournal(id: string, entryId: string): Promise<void> {
    await api.delete(`/trips/${id}/journal/${entryId}`);
  },
  async addBooking(id: string, payload: { type: string; provider: string; confirmation?: string; amount?: number; status?: 'PLANNED' | 'BOOKED' | 'CANCELLED' }): Promise<void> {
    await api.post(`/trips/${id}/bookings`, payload);
  },
  async updateBooking(id: string, bookingId: string, payload: { confirmation?: string; amount?: number; status?: 'PLANNED' | 'BOOKED' | 'CANCELLED' }): Promise<void> {
    await api.patch(`/trips/${id}/bookings/${bookingId}`, payload);
  },
  async removeBooking(id: string, bookingId: string): Promise<void> {
    await api.delete(`/trips/${id}/bookings/${bookingId}`);
  },

  async generateItinerary(payload: CreateTripPayload): Promise<GeneratedItinerary> {
    const { data } = await aiApi.post<GeneratedItinerary>('/ai/generate', payload);
    return data;
  },
};

export const recommendationService = {
  async list(): Promise<RecommendationSummary[]> {
    const { data } = await api.get<RecommendationSummary[]>('/recommendations');
    return data;
  },
  async byId(id: string): Promise<Recommendation> {
    const { data } = await api.get<Recommendation>(`/recommendations/${id}`);
    return data;
  },
  async review(id: string, rating: number, content: string): Promise<Recommendation> {
    const { data } = await api.post<Recommendation>(`/recommendations/${id}/reviews`, { rating, content });
    return data;
  },
};

export const notificationService = {
  async list(): Promise<AppNotification[]> {
    const { data } = await api.get<AppNotification[]>('/users/me/notifications');
    return data;
  },
  async read(id: string): Promise<void> { await api.patch(`/users/me/notifications/${id}/read`); },
  async readAll(): Promise<void> { await api.patch('/users/me/notifications/read-all'); },
};

export const favoriteService = {
  async list(): Promise<RecommendationSummary[]> {
    const { data } = await api.get<RecommendationSummary[]>('/favorites');
    return data;
  },
  async listIds(): Promise<string[]> {
    const { data } = await api.get<string[]>('/favorites/ids');
    return data;
  },
  async add(id: string): Promise<void> {
    await api.post(`/favorites/${id}`);
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/favorites/${id}`);
  },
};

export const adminService = {
  async dashboard(): Promise<AdminDashboardStats> {
    const { data } = await api.get<AdminDashboardStats>('/admin/dashboard');
    return data;
  },
  async listUsers(): Promise<AdminUser[]> {
    const { data } = await api.get<AdminUser[]>('/admin/users');
    return data;
  },
  async listRecommendations(): Promise<RecommendationSummary[]> {
    const { data } = await api.get<RecommendationSummary[]>('/admin/recommendations');
    return data;
  },
  async listTrips(): Promise<AdminTrip[]> {
    const { data } = await api.get<AdminTrip[]>('/admin/trips');
    return data;
  },
  async analytics(): Promise<AdminAnalytics> {
    const { data } = await api.get<AdminAnalytics>('/admin/analytics');
    return data;
  },
  async deleteTrip(id: string): Promise<void> {
    await api.delete(`/admin/trips/${id}`);
  },
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },
  async setUserStatus(
    id: string,
    status: 'ACTIVE' | 'LOCKED',
    reason?: string,
  ): Promise<void> {
    await api.patch(`/admin/users/${id}/status`, { status, reason });
  },
  async createRecommendation(payload: CreateRecommendationPayload): Promise<Recommendation> {
    const { data } = await api.post<Recommendation>('/admin/recommendations', payload);
    return data;
  },
  async updateRecommendation(id: string, payload: UpdateRecommendationPayload): Promise<Recommendation> {
    const { data } = await api.patch<Recommendation>(`/admin/recommendations/${id}`, payload);
    return data;
  },
  async deleteRecommendation(id: string): Promise<void> {
    await api.delete(`/admin/recommendations/${id}`);
  },
  async publish(id: string): Promise<Recommendation> {
    const { data } = await api.patch<Recommendation>(`/admin/recommendations/${id}/publish`);
    return data;
  },
};

export const chatService = {
  async listSessions(): Promise<ChatSessionSummary[]> {
    const { data } = await api.get<ChatSessionSummary[]>('/chat/sessions');
    return data;
  },

  async createSession(): Promise<ChatSessionSummary> {
    const { data } = await api.post<ChatSessionSummary>('/chat/sessions');
    return data;
  },

  async listMessages(sessionId: string): Promise<ChatMessage[]> {
    const { data } = await api.get<ChatMessage[]>(`/chat/sessions/${sessionId}/messages`);
    return data;
  },

  async sendMessage(sessionId: string, content: string): Promise<ChatSendResponse> {
    // Chat goes through aiApi because the AI provider call can take 20-60s on
    // slower models (Gemini/Ollama). Regular 20s timeout is too tight.
    const { data } = await aiApi.post<ChatSendResponse>(
      `/chat/sessions/${sessionId}/messages`,
      { content },
    );
    return data;
  },

  async deleteSession(sessionId: string): Promise<void> {
    await api.delete(`/chat/sessions/${sessionId}`);
  },
};

export const heroService = {
  async listActiveSlides(): Promise<{ id: string; imageUrl: string }[]> {
    const { data } = await api.get<{ id: string; imageUrl: string }[]>('/hero/slides');
    return data;
  },

  async listAll(): Promise<AdminHeroSlide[]> {
    const { data } = await api.get<AdminHeroSlide[]>('/admin/hero/slides');
    return data;
  },

  async create(payload: HeroSlideCreatePayload): Promise<AdminHeroSlide> {
    const { data } = await api.post<AdminHeroSlide>('/admin/hero/slides', payload);
    return data;
  },

  async update(id: string, payload: HeroSlideUpdatePayload): Promise<AdminHeroSlide> {
    const { data } = await api.patch<AdminHeroSlide>(`/admin/hero/slides/${id}`, payload);
    return data;
  },

  async move(id: string, direction: 'up' | 'down'): Promise<AdminHeroSlide | null> {
    const { data } = await api.post<AdminHeroSlide>(
      `/admin/hero/slides/${id}/move`,
      { direction },
    );
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/admin/hero/slides/${id}`);
  },
};
