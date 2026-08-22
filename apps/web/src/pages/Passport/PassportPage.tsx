import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { tripService } from '@/services';
import type { TravelPassport } from '@/types';
import { useTranslation } from 'react-i18next';

interface BadgeDef {
  id: string;
  title: string;
  description: string;
  target: number;
  unit: string;
  type: 'trips' | 'destinations' | 'days';
  gradient: string;
  glowColor: string;
  icon: React.ReactNode;
}

const BADGE_DEFINITIONS: BadgeDef[] = [
  {
    id: 'first-trip',
    title: 'Chuyến đi đầu tiên',
    description: 'Bắt đầu hành trình cùng TravelMind',
    target: 1,
    unit: 'chuyến',
    type: 'trips',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
  },
  {
    id: 'explorer',
    title: 'Nhà khám phá',
    description: 'Lên kế hoạch ít nhất 5 chuyến đi',
    target: 5,
    unit: 'chuyến',
    type: 'trips',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: 'city-hopper',
    title: 'Dấu chân thành phố',
    description: 'Ghé thăm ít nhất 3 điểm đến',
    target: 3,
    unit: 'điểm',
    type: 'destinations',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 'slow-traveler',
    title: 'Người đi sâu',
    description: 'Tích lũy hơn 14 ngày trải nghiệm',
    target: 14,
    unit: 'ngày',
    type: 'days',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function PassportPage() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<TravelPassport | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    tripService
      .passport()
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-20 sm:px-8 sm:pt-22">
        <ErrorState message={t('passport.loadError')} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-20 sm:px-8 sm:pt-22">
        <LoadingState message={t('passport.loading')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-10 px-4 pb-20 pt-20 sm:px-8 sm:pt-22">

      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-indigo-500/8 to-cyan-500/10 blur-[110px] rounded-full" />
      </div>

      {/* 1. Hero Passport Card */}
      <section className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-blue-100 dark:border-slate-800 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-sky-50/70 dark:from-[#0B1528] dark:via-[#09101F] dark:to-[#070B16] shadow-xl p-6 sm:p-10 lg:p-12">
        {/* Ambient glow inside card */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/15 dark:bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="font-outfit text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {t('passport.heroTitle')} <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
                {t('passport.heroHighlight')}
              </span>
            </h1>
          </div>

          {/* Right Passport ID Floating Badge */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-white/80 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <strong className="text-base font-black text-slate-900 dark:text-white">TM EXPLORER</strong>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 p-3 text-center border border-blue-100/60 dark:border-slate-700/60">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('passport.destinations')}</p>
                  <strong className="mt-1 block text-2xl font-black text-blue-600 dark:text-cyan-400">{data.destinations.length}</strong>
                </div>
                <div className="rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 p-3 text-center border border-indigo-100/60 dark:border-slate-700/60">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('passport.days')}</p>
                  <strong className="mt-1 block text-2xl font-black text-indigo-600 dark:text-indigo-400">{data.totalDays}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Metric Stat Cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Stat
          label={t('passport.totalTrips')}
          value={t('passport.tripCount', { count: data.totalTrips })}
          icon={<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>}
          gradient="from-blue-600 to-cyan-500"
        />
        <Stat
          label={t('passport.totalDays')}
          value={t('passport.dayCount', { count: data.totalDays })}
          icon={<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          gradient="from-violet-600 to-fuchsia-500"
        />
        <Stat
          label={t('passport.totalSpent')}
          value={new Intl.NumberFormat(i18n.language === 'en' ? 'en-US' : 'vi-VN', { notation: 'compact', style: 'currency', currency: 'VND' }).format(data.totalSpent)}
          icon={<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
          gradient="from-emerald-600 to-teal-500"
        />
      </section>

      {/* 3. Discovery Badges Collection — Redesigned Gamified Achievement Showcase */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-outfit text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('passport.discoveryBadges')}
            </h2>
          </div>
          <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-4 py-1.5 text-xs font-bold text-blue-700 dark:text-cyan-300 shadow-xs">
            {t('passport.unlocked', { count: data.badges.length, total: BADGE_DEFINITIONS.length })}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BADGE_DEFINITIONS.map((badge) => {
            const currentVal =
              badge.type === 'trips'
                ? data.totalTrips
                : badge.type === 'destinations'
                ? data.destinations.length
                : data.totalDays;

            const isUnlocked = currentVal >= badge.target;
            const progress = Math.min(100, Math.round((currentVal / badge.target) * 100));

            return (
              <div
                key={badge.id}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between ${
                  isUnlocked
                    ? 'border-blue-300/80 dark:border-cyan-500/40 bg-white/95 dark:bg-slate-900/90 shadow-lg hover:shadow-2xl hover:-translate-y-1'
                    : 'border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Glow line for unlocked badges */}
                {isUnlocked && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />
                )}

                <div>
                  {/* Badge Icon Shield */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                        isUnlocked
                          ? `bg-gradient-to-br ${badge.gradient} text-white shadow-lg`
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {badge.icon}
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${
                        isUnlocked
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60'
                      }`}
                    >
                      {isUnlocked ? (
                        <>
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-500" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          <span>Đã nhận</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          <span>Chưa mở</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-outfit text-base font-bold text-slate-900 dark:text-white">
                    {badge.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {badge.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-400">Tiến độ</span>
                    <span className={isUnlocked ? 'text-blue-600 dark:text-cyan-400 font-bold' : 'text-slate-500'}>
                      {currentVal} / {badge.target} {badge.unit}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                          : 'bg-blue-400/60 dark:bg-cyan-500/50'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Timeline Places — Redesigned Scrapbook Stamp Area */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-cyan-400">
            {t('passport.timeline')}
          </p>
          <h2 className="mt-1 font-outfit text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('passport.placesVisited')}
          </h2>
        </div>

        {data.timeline.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.timeline.map((item) => (
              <Link
                key={item.id}
                to={`/trips/${item.id}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-400 flex flex-col"
              >
                {/* Image Cover */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.destination}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-white/50">
                      <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                  )}

                  {/* Stamp date badge */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>{new Date(item.startDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')}</span>
                  </span>
                </div>

                {/* Footer Content */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-outfit text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">
                      {item.destination}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>{t('passport.openTrip')}</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Ultra-Clean & Engaging Empty State Scrapbook Card */
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-10 sm:p-16 text-center shadow-sm">
            {/* Background subtle radial gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 pointer-events-none" />

            <div className="relative z-10 max-w-md mx-auto space-y-5">
              {/* Stamp Compass Emblem */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-cyan-500/15 border border-blue-200/80 dark:border-blue-800/60 shadow-lg text-blue-600 dark:text-cyan-400">
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="font-outfit text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {t('passport.emptyTitle')}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('passport.emptyDescription')}
                </p>
              </div>

              {/* Apple iOS 3D Liquid Glass CTA Button */}
              <div className="pt-2">
                <Link
                  to="/create-trip"
                  className="group relative inline-flex items-center justify-between gap-3 rounded-full bg-gradient-to-b from-[#4387f6] via-[#2563eb] to-[#1a4ecb] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45),inset_0_2px_3px_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(0,0,0,0.2)] border-t border-b border-white/60 border-t-white/85 border-b-blue-900/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(37,99,235,0.6)] active:scale-95 overflow-hidden"
                >
                  <span className="pointer-events-none absolute inset-x-3 top-1 h-[45%] rounded-full bg-gradient-to-b from-white/60 via-white/15 to-transparent" />
                  <span className="pointer-events-none absolute inset-x-5 bottom-1 h-[25%] rounded-full bg-gradient-to-t from-white/35 to-transparent" />
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{t('nav.createTrip')}</span>
                  </span>
                  <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-white/40 to-white/10 border border-white/70 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9)] backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 overflow-hidden">
                    <span className="pointer-events-none absolute inset-x-0.5 top-0 h-[40%] rounded-full bg-gradient-to-b from-white/80 to-transparent" />
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  gradient,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm flex items-center gap-4">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</p>
        <strong className="mt-0.5 block font-outfit text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </strong>
      </div>
    </div>
  );
}
