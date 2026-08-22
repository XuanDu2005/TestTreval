import { useEffect, useState } from 'react';
import type { GeneratedItinerary, ItineraryActivity } from '@/types';
import { useTranslation } from 'react-i18next';

type Props = {
  content: GeneratedItinerary;
  saving: boolean;
  replanning: string | null;
  onCancel: () => void;
  onSave: (content: GeneratedItinerary) => void;
  onReplan: (dayIndex: number, activityIndex: number) => void;
};

const emptyActivity = (title: string, transport: string): ItineraryActivity => ({
  time: '09:00',
  title,
  description: '',
  location: '',
  estimatedCost: '0 VND',
  transport,
  imageUrl: '',
  category: 'SIGHTSEEING',
});

export default function ItineraryEditor({
  content,
  saving,
  replanning,
  onCancel,
  onSave,
  onReplan,
}: Props) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(() => structuredClone(content));

  useEffect(() => setDraft(structuredClone(content)), [content]);

  const updateActivity = (
    dayIndex: number,
    activityIndex: number,
    patch: Partial<ItineraryActivity>
  ) => {
    setDraft((current) => {
      const next = structuredClone(current);
      next.days[dayIndex].activities[activityIndex] = {
        ...next.days[dayIndex].activities[activityIndex],
        ...patch,
      };
      return next;
    });
  };

  const moveActivity = (
    dayIndex: number,
    activityIndex: number,
    direction: -1 | 1
  ) => {
    setDraft((current) => {
      const next = structuredClone(current);
      const list = next.days[dayIndex].activities;
      const target = activityIndex + direction;
      if (target < 0 || target >= list.length) return current;
      [list[activityIndex], list[target]] = [list[target], list[activityIndex]];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview Metadata Section */}
      <div className="rounded-3xl border border-blue-200/90 dark:border-slate-800 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-sky-50/50 dark:from-slate-900/90 dark:to-slate-900/90 p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {t('workspace.editor.tripName')}
            <input
              className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-semibold outline-none focus:border-blue-500"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
          </label>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {t('workspace.editor.coverUrl')}
            <input
              className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
              value={draft.coverImage}
              onChange={(e) => setDraft((d) => ({ ...d, coverImage: e.target.value }))}
              placeholder="https://..."
            />
          </label>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 sm:col-span-2">
            {t('workspace.editor.summary')}
            <textarea
              className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500 min-h-20 leading-relaxed"
              value={draft.summary}
              onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
            />
          </label>
        </div>
      </div>

      {/* Days & Activities Section */}
      {draft.days.map((day, dayIndex) => (
        <section
          key={`${day.day}-${dayIndex}`}
          className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3 flex-1 min-w-[240px]">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-black text-white shadow-md shadow-blue-500/25">
                {day.day}
              </span>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs sm:text-sm font-bold outline-none focus:border-blue-500"
                value={day.theme}
                onChange={(e) =>
                  setDraft((current) => {
                    const next = structuredClone(current);
                    next.days[dayIndex].theme = e.target.value;
                    return next;
                  })
                }
                aria-label={t('workspace.editor.dayThemeAria', { day: day.day })}
                placeholder={t('workspace.editor.dayThemePlaceholder')}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setDraft((current) => {
                  const next = structuredClone(current);
                  next.days[dayIndex].activities.push(emptyActivity(t('workspace.editor.newActivity'), t('workspace.editor.walking')));
                  return next;
                });
              }}
              className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/40 px-3.5 py-2 text-xs font-bold text-blue-700 dark:text-cyan-300 hover:bg-blue-100 transition cursor-pointer"
            >
              + {t('workspace.editor.addActivity')}
            </button>
          </div>

          <div className="space-y-4">
            {day.activities.map((activity, activityIndex) => {
              const key = `${dayIndex}-${activityIndex}`;
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800/60 pb-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => moveActivity(dayIndex, activityIndex, -1)}
                        disabled={activityIndex === 0}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white text-slate-600 disabled:opacity-30 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
                        title={t('workspace.editor.moveUp')}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveActivity(dayIndex, activityIndex, 1)}
                        disabled={activityIndex === day.activities.length - 1}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white text-slate-600 disabled:opacity-30 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
                        title={t('workspace.editor.moveDown')}
                      >
                        ↓
                      </button>
                      <span className="text-[11px] font-bold text-slate-400 ml-1">
                        {t('workspace.editor.activityNumber', { number: activityIndex + 1 })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={replanning !== null}
                        onClick={() => onReplan(dayIndex, activityIndex)}
                        className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {replanning === key ? t('workspace.editor.aiReplacing') : `✨ ${t('workspace.editor.aiReplace')}`}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDraft((current) => {
                            const next = structuredClone(current);
                            next.days[dayIndex].activities.splice(activityIndex, 1);
                            return next;
                          })
                        }
                        className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400 transition cursor-pointer"
                      >
                        {t('common.delete')}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-6">
                    <Field label={t('workspace.editor.time')} className="sm:col-span-1">
                      <input
                        type="time"
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold outline-none focus:border-blue-500"
                        value={activity.time}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { time: e.target.value })
                        }
                      />
                    </Field>

                    <Field label={t('workspace.editor.activityName')} className="sm:col-span-3">
                      <input
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold outline-none focus:border-blue-500"
                        value={activity.title}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { title: e.target.value })
                        }
                      />
                    </Field>

                    <Field label={t('workspace.editor.category')} className="sm:col-span-2">
                      <select
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500 cursor-pointer"
                        value={activity.category}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { category: e.target.value })
                        }
                      >
                        {['FOOD', 'SIGHTSEEING', 'CULTURE', 'NATURE', 'SHOPPING', 'RELAX', 'NIGHTLIFE', 'TRANSPORT'].map(
                          (item) => (
                            <option key={item} value={item}>{t(`workspace.editor.categories.${item}`)}</option>
                          )
                        )}
                      </select>
                    </Field>

                    <Field label={t('workspace.editor.location')} className="sm:col-span-3">
                      <input
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium outline-none focus:border-blue-500"
                        value={activity.location}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { location: e.target.value })
                        }
                      />
                    </Field>

                    <Field label={t('workspace.editor.transport')} className="sm:col-span-1">
                      <input
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium outline-none focus:border-blue-500"
                        value={activity.transport}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { transport: e.target.value })
                        }
                      />
                    </Field>

                    <Field label={t('workspace.editor.estimatedCost')} className="sm:col-span-2">
                      <input
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium outline-none focus:border-blue-500"
                        value={activity.estimatedCost}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { estimatedCost: e.target.value })
                        }
                      />
                    </Field>

                    <Field label={t('workspace.editor.description')} className="sm:col-span-6">
                      <textarea
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium outline-none focus:border-blue-500 min-h-16 leading-relaxed"
                        value={activity.description}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, { description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Floating Bottom Action Bar */}
      <div className="sticky bottom-6 z-30 flex items-center justify-end gap-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition cursor-pointer"
        >
          {t('common.cancel')}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => onSave(draft)}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          {saving ? t('workspace.editor.savingVersion') : `💾 ${t('workspace.editor.saveVersion')}`}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`text-[11px] font-bold text-slate-600 dark:text-slate-300 ${className}`}>
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
