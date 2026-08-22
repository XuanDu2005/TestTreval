import { useState } from 'react';
import toast from 'react-hot-toast';
import ItineraryView from '@/components/ItineraryView';
import { tripService } from '@/services';
import type { GeneratedItinerary, Trip } from '@/types';
import ItineraryEditor from './ItineraryEditor';
import { BookingPanel, BudgetPanel, JournalPanel, PackingPanel, TeamPanel, WeatherMapPanel } from './WorkspacePanels';
import { useTranslation } from 'react-i18next';

type Tab = 'itinerary' | 'map' | 'budget' | 'packing' | 'team' | 'journal' | 'bookings';
const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'itinerary', label: 'workspace.tabs.itinerary', icon: '✨' },
  { id: 'map', label: 'workspace.tabs.map', icon: '🗺️' },
  { id: 'budget', label: 'workspace.tabs.budget', icon: '💰' },
  { id: 'packing', label: 'workspace.tabs.packing', icon: '🎒' },
  { id: 'team', label: 'workspace.tabs.team', icon: '👥' },
  { id: 'journal', label: 'workspace.tabs.journal', icon: '📖' },
  { id: 'bookings', label: 'workspace.tabs.bookings', icon: '🎫' },
];

export default function TripWorkspace({ trip, onChange, onReload }: { trip: Trip; onChange: (trip: Trip) => void; onReload: () => Promise<void> }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('itinerary');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [replanning, setReplanning] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const content = trip.itinerary?.content;

  const save = async (next: GeneratedItinerary) => {
    setSaving(true);
    try { const updated = await tripService.updateItinerary(trip.id, next); onChange(updated); setEditing(false); toast.success(t('workspace.toasts.saved')); }
    finally { setSaving(false); }
  };

  const replan = async (dayIndex?: number, activityIndex?: number, reason?: string) => {
    const key = typeof dayIndex === 'number' && typeof activityIndex === 'number' ? `${dayIndex}-${activityIndex}` : 'all';
    setReplanning(key);
    try {
      const updated = await tripService.replan(trip.id, { dayIndex, activityIndex, reason });
      onChange(updated); toast.success(key === 'all' ? t('workspace.toasts.replanned') : t('workspace.toasts.replaced'));
    } finally { setReplanning(null); }
  };

  const toggleShare = async () => {
    setSharing(true);
    try {
      const result = await tripService.toggleShare(trip.id, !trip.isPublic);
      onChange({ ...trip, ...result });
      toast.success(result.isPublic ? t('workspace.toasts.shareOn') : t('workspace.toasts.shareOff'));
    } finally { setSharing(false); }
  };

  const shareUrl = trip.shareToken ? `${window.location.origin}/shared/${trip.shareToken}` : '';

  return (
    <div className="space-y-6">
      {/* 1. Floating Glass Segmented Tabbar (7 Tabs) */}
      <div className="no-print sticky top-24 z-30 overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-1.5 shadow-xl backdrop-blur-2xl">
        <div className="flex min-w-max gap-1.5">
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{t(item.label)}</span>
                {item.id === 'team' && trip.collaborators.length > 0 && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${active ? 'bg-white/25 text-white' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-cyan-300'}`}>
                    {trip.collaborators.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Public Share Banner */}
      {trip.isPublic && trip.isOwner && (
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-emerald-200/90 bg-emerald-50/90 dark:border-emerald-500/30 dark:bg-emerald-950/30 p-4 shadow-sm backdrop-blur-xl">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <strong className="text-sm font-extrabold text-emerald-800 dark:text-emerald-200">{t('workspace.publicShare')}</strong>
            </div>
            <p className="mt-1 truncate text-xs text-emerald-700/80 dark:text-emerald-300/80 font-mono">{shareUrl}</p>
          </div>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(shareUrl);
              toast.success(t('workspace.toasts.linkCopied'));
            }}
            className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 transition cursor-pointer"
          >
            📋 {t('workspace.copyLink')}
          </button>
        </div>
      )}

      {/* 3. Tab Contents */}
      {tab === 'itinerary' && (
        <div className="print-area space-y-6">
          {/* Action Header Controls Bar */}
          <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-5 shadow-sm backdrop-blur-xl">
            <div>
              <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.controlsTitle')}</h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t('workspace.versionDescription', { version: trip.itinerary?.versionCount ?? 1 })}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                🖨️ {t('workspace.exportPdf')}
              </button>
              <button
                type="button"
                onClick={() => exportCalendar(trip)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                📅 {t('workspace.exportCalendar')}
              </button>
              {trip.isOwner && (
                <button
                  type="button"
                  disabled={sharing}
                  onClick={toggleShare}
                  className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-900/40 px-3.5 py-2 text-xs font-bold text-blue-700 dark:text-cyan-300 hover:bg-blue-100 transition cursor-pointer"
                >
                  {trip.isPublic ? `🔒 ${t('workspace.disableShare')}` : `🔗 ${t('workspace.share')}`}
                </button>
              )}
              {trip.canEdit && !editing && (
                <button
                  type="button"
                  disabled={replanning !== null}
                  onClick={() => replan(undefined, undefined, t('workspace.replanAllReason'))}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  {replanning === 'all' ? `✨ ${t('workspace.aiReplanning')}` : `✨ ${t('workspace.aiReplan')}`}
                </button>
              )}
              {trip.canEdit && (
                <button
                  type="button"
                  onClick={() => setEditing((value) => !value)}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  {editing ? `👁️ ${t('workspace.viewItinerary')}` : `✏️ ${t('common.edit')}`}
                </button>
              )}
            </div>
          </div>

          {!content ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-12 text-center text-sm text-slate-500">
              {t('workspace.emptyItinerary')}
            </div>
          ) : editing ? (
            <ItineraryEditor
              content={content}
              saving={saving}
              replanning={replanning}
              onCancel={() => setEditing(false)}
              onSave={save}
              onReplan={(day, activity) => replan(day, activity, t('workspace.replaceReason'))}
            />
          ) : (
            <ItineraryView content={content} />
          )}
        </div>
      )}

      {tab === 'map' && <WeatherMapPanel trip={trip} onReload={onReload} />}
      {tab === 'budget' && <BudgetPanel trip={trip} onReload={onReload} />}
      {tab === 'packing' && <PackingPanel trip={trip} onReload={onReload} />}
      {tab === 'team' && <TeamPanel trip={trip} onReload={onReload} />}
      {tab === 'journal' && <JournalPanel trip={trip} onReload={onReload} />}
      {tab === 'bookings' && <BookingPanel trip={trip} onReload={onReload} />}
    </div>
  );
}

function exportCalendar(trip: Trip) {
  const activities = trip.itinerary?.content?.days.flatMap((day) => day.activities.map((item) => ({ ...item, date: day.date }))) ?? [];
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TravelMind//Trip Calendar//VI'];
  activities.forEach((item, index) => {
    const start = `${item.date.replace(/-/g, '')}T${item.time.replace(':', '')}00`;
    lines.push('BEGIN:VEVENT', `UID:${trip.id}-${index}@travelmind`, `DTSTART:${start}`, `SUMMARY:${escapeIcs(item.title)}`, `LOCATION:${escapeIcs(item.location)}`, `DESCRIPTION:${escapeIcs(item.description)}`, 'END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `TravelMind-${trip.destination}.ics`; link.click(); URL.revokeObjectURL(url);
}

function escapeIcs(value: string) { return value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n'); }
