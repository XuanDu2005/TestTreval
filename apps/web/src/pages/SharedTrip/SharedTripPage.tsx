import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItineraryView from '@/components/ItineraryView';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { tripService } from '@/services';
import type { Trip } from '@/types';
import { useTranslation } from 'react-i18next';

export default function SharedTripPage() {
  const { t, i18n } = useTranslation();
  const { token } = useParams<{ token: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    tripService
      .shared(token)
      .then(setTrip)
      .catch(() => setError(true));
  }, [token]);

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
        <ErrorState message={t('sharedTrip.notFound')} />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
        <LoadingState message={t('sharedTrip.loading')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
      {/* 1. Hero Share Header Banner */}
      <section className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-blue-100 dark:border-slate-800 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-sky-50/70 dark:from-[#0B1528] dark:via-[#09101F] dark:to-[#070B16] shadow-xl p-6 sm:p-10 lg:p-12">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/15 dark:bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/60 px-4 py-1.5 text-xs font-bold text-blue-700 dark:text-cyan-300 backdrop-blur-md">
              <span>✈️</span> {t('sharedTrip.eyebrow')}
            </span>

            <h1 className="font-outfit text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {trip.itinerary?.title ?? trip.destination}
            </h1>

            {trip.itinerary?.description && (
              <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {trip.itinerary.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="rounded-full bg-white/80 dark:bg-slate-800/80 px-3.5 py-1.5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                📍 {trip.destination}
              </span>
              <span className="rounded-full bg-white/80 dark:bg-slate-800/80 px-3.5 py-1.5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                👥 {t('sharedTrip.travelers', { count: trip.travelers })}
              </span>
              <span className="rounded-full bg-white/80 dark:bg-slate-800/80 px-3.5 py-1.5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                📅 {new Date(trip.startDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')} – {new Date(trip.endDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')}
              </span>
            </div>
          </div>

          <Link
            to="/register"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition"
          >
            <span>{t('sharedTrip.createSimilar')}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* 2. Itinerary View */}
      <div className="print-area">
        <ItineraryView content={trip.itinerary?.content ?? null} />
      </div>

      {/* 3. Journal Highlights */}
      {trip.journalEntries.length > 0 && (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-400">{t('sharedTrip.moments')}</p>
            <h2 className="mt-1 font-outfit text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('sharedTrip.journal')}</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {trip.journalEntries.map((entry) => (
              <article key={entry.id} className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm">
                {entry.imageUrl && (
                  <img src={entry.imageUrl} alt="" className="h-56 w-full object-cover" />
                )}
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                    {new Date(entry.entryDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')}
                  </span>
                  <h3 className="mt-1 font-outfit text-lg font-extrabold text-slate-900 dark:text-white">{entry.title}</h3>
                  <p className="mt-2 line-clamp-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">{entry.content}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
