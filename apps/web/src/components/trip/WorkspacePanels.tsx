import { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { tripService } from '@/services';
import type { Trip, WeatherData } from '@/types';
import { useTranslation } from 'react-i18next';

type PanelProps = { trip: Trip; onReload: () => Promise<void> };

/* ========================================================================= */
/* 1. BUDGET & EXPENSE TRACKER PANEL                                         */
/* ========================================================================= */
export function BudgetPanel({ trip, onReload }: PanelProps) {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const estimates = useMemo(
    () =>
      trip.itinerary?.content?.days
        .flatMap((day) => day.activities)
        .map((item) => parseMoney(item.estimatedCost))
        .reduce((a, b) => a + b, 0) ?? 0,
    [trip]
  );

  const actual = trip.expenses.reduce((sum, item) => sum + item.amount, 0);
  const booked = trip.bookings
    .filter((item) => item.status === 'BOOKED')
    .reduce((sum, item) => sum + item.amount, 0);

  const byCategory = Object.entries(
    trip.expenses.reduce<Record<string, number>>(
      (result, item) => ({
        ...result,
        [item.category]: (result[item.category] ?? 0) + item.amount,
      }),
      {}
    )
  );

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const value = Number(amount);
    if (!title.trim() || !Number.isFinite(value) || value < 0) return;
    setSaving(true);
    try {
      await tripService.addExpense(trip.id, {
        title,
        category,
        amount: Math.round(value),
      });
      setTitle('');
      setAmount('');
      await onReload();
      toast.success(t('workspace.budget.added'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric
          tone="blue"
          icon="🤖"
          label={t('workspace.budget.aiEstimate')}
          value={formatMoney(estimates, i18n.language)}
          hint={t('workspace.budget.aiEstimateHint')}
        />
        <Metric
          tone="violet"
          icon="🎫"
          label={t('workspace.budget.booked')}
          value={formatMoney(booked, i18n.language)}
          hint={t('workspace.budget.confirmedServices', { count: trip.bookings.filter((item) => item.status === 'BOOKED').length })}
        />
        <Metric
          tone="emerald"
          icon="💳"
          label={t('workspace.budget.actual')}
          value={formatMoney(actual, i18n.language)}
          hint={estimates > 0 ? t('workspace.budget.percentage', { percentage: Math.round((actual / estimates) * 100) }) : t('workspace.budget.noEstimate')}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left: Expenses List */}
        <section className="lg:col-span-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.budget.ledgerTitle')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('workspace.budget.ledgerDescription')}</p>
            </div>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {t('workspace.budget.expenseCount', { count: trip.expenses.length })}
            </span>
          </div>

          <div className="space-y-2.5">
            {trip.expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/40 p-3.5 transition hover:border-blue-200"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100/70 text-lg dark:bg-emerald-500/15">
                  💳
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t(`workspace.budget.categories.${item.category}`, { defaultValue: item.category })} • {new Date(item.spentAt).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')}
                  </div>
                </div>
                <strong className="text-sm font-black text-slate-900 dark:text-white font-mono">
                  {formatMoney(item.amount, i18n.language)}
                </strong>
                {trip.canEdit && (
                  <button
                    type="button"
                    onClick={async () => {
                      await tripService.removeExpense(trip.id, item.id);
                      await onReload();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 transition cursor-pointer"
                    title={t('workspace.budget.deleteExpense')}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {!trip.expenses.length && <Empty icon="🧾" text={t('workspace.budget.empty')} />}
          </div>
        </section>

        {/* Right: Add Expense Form & Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {trip.canEdit && (
            <form onSubmit={submit} className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm space-y-4">
              <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.budget.addTitle')}</h3>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('workspace.budget.titlePlaceholder')}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500 cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {['Ăn uống', 'Di chuyển', 'Lưu trú', 'Tham quan', 'Mua sắm', 'Khác'].map((item) => (
                    <option key={item} value={item}>{t(`workspace.budget.categories.${item}`)}</option>
                  ))}
                </select>
                <input
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t('workspace.moneyPlaceholder')}
                  required
                />
              </div>
              <button
                disabled={saving}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer"
              >
                {saving ? t('workspace.saving') : `+ ${t('workspace.budget.addExpense')}`}
              </button>
            </form>
          )}

          <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.budget.breakdown')}</h3>
            <div className="mt-4 space-y-3.5">
              {byCategory.map(([name, value], index) => {
                const pct = actual ? Math.round((value / actual) * 100) : 0;
                return (
                  <div key={name}>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-300">{t(`workspace.budget.categories.${name}`, { defaultValue: name })}</span>
                      <span className="text-slate-900 dark:text-white font-mono">{formatMoney(value, i18n.language)} ({pct}%)</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${['bg-blue-600', 'bg-violet-600', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'][index % 6]} transition-all`}
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {!byCategory.length && <p className="text-xs text-slate-400 text-center py-4">{t('workspace.budget.noCategories')}</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. PACKING LIST PANEL                                                     */
/* ========================================================================= */
export function PackingPanel({ trip, onReload }: PanelProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cá nhân');
  const [loading, setLoading] = useState(false);

  const packed = trip.packingItems.filter((item) => item.isPacked).length;
  const total = trip.packingItems.length;
  const groups = Object.entries(
    trip.packingItems.reduce<Record<string, typeof trip.packingItems>>(
      (result, item) => ({
        ...result,
        [item.category]: [...(result[item.category] ?? []), item],
      }),
      {}
    )
  );

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start">
      <section className="lg:col-span-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.packing.title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('workspace.packing.progress', { packed, total })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-40 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                style={{ width: `${total ? (packed / total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
              {total ? Math.round((packed / total) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {groups.map(([group, items]) => (
            <div key={group}>
              <h4 className="mb-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t(`workspace.packing.categories.${group}`, { defaultValue: group })}
              </h4>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {items.map((item) => (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition select-none ${
                      item.isPacked
                        ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-950/20'
                        : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.isPacked}
                      disabled={!trip.canEdit}
                      onChange={async () => {
                        await tripService.updatePacking(trip.id, item.id, {
                          isPacked: !item.isPacked,
                        });
                        await onReload();
                      }}
                      className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                    />
                    <span className={`flex-1 text-xs sm:text-sm ${item.isPacked ? 'text-slate-400 line-through' : 'font-semibold text-slate-800 dark:text-slate-100'}`}>
                      {item.name}
                    </span>
                    <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                      ×{item.quantity}
                    </span>
                    {trip.canEdit && (
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault();
                          await tripService.removePacking(trip.id, item.id);
                          await onReload();
                        }}
                        className="text-slate-300 hover:text-rose-500 transition cursor-pointer"
                        title={t('workspace.packing.deleteItem')}
                      >
                        ×
                      </button>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!groups.length && <Empty icon="🎒" text={t('workspace.packing.empty')} />}
        </div>
      </section>

      {/* Right: AI Generator & Add Form */}
      {trip.canEdit && (
        <aside className="lg:col-span-4 space-y-6">
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await tripService.generatePacking(trip.id);
                await onReload();
                toast.success(t('workspace.packing.generated'));
              } finally {
                setLoading(false);
              }
            }}
            className="w-full rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-left text-white shadow-xl shadow-blue-500/25 transition hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-xl">
              ✨
            </div>
            <strong className="mt-4 block font-outfit text-lg font-black tracking-tight">{t('workspace.packing.aiTitle')}</strong>
            <span className="mt-1 block text-xs leading-relaxed text-blue-100 font-medium">
              {loading ? t('workspace.packing.aiLoading') : t('workspace.packing.aiDescription')}
            </span>
          </button>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!name.trim()) return;
              await tripService.addPacking(trip.id, { name, category });
              setName('');
              await onReload();
              toast.success(t('workspace.packing.added'));
            }}
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm space-y-3.5"
          >
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.packing.addTitle')}</h3>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('workspace.packing.itemPlaceholder')}
              required
            />
            <select
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500 cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {['Giấy tờ', 'Trang phục', 'Cá nhân', 'Sức khỏe', 'Điện tử', 'Du lịch', 'Khác'].map((item) => (
                <option key={item} value={item}>{t(`workspace.packing.categories.${item}`)}</option>
              ))}
            </select>
            <button className="w-full rounded-xl bg-slate-900 dark:bg-slate-100 py-2.5 text-xs sm:text-sm font-bold text-white dark:text-slate-900 shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer">
              + {t('workspace.packing.addToList')}
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 3. WEATHER & MAP PANEL                                                    */
/* ========================================================================= */
export function WeatherMapPanel({ trip, onReload }: PanelProps) {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [replanning, setReplanning] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    tripService
      .weather(trip.id)
      .then((data) => active && setWeather(data))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [trip.id]);

  const mapUrl = weather?.place
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${weather.place.longitude - 0.08}%2C${weather.place.latitude - 0.05}%2C${weather.place.longitude + 0.08}%2C${weather.place.latitude + 0.05}&layer=mapnik&marker=${weather.place.latitude}%2C${weather.place.longitude}`
    : '';

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <section className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">
              {t('workspace.weather.mapTitle', { destination: trip.destination })}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('workspace.weather.mapDescription')}
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.destination)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-900/40 px-4 py-2 text-xs font-bold text-blue-700 dark:text-cyan-300 hover:bg-blue-100 transition"
          >
            <span>{t('workspace.weather.openMaps')}</span>
            <span>↗</span>
          </a>
        </div>
        {mapUrl ? (
          <iframe title={t('workspace.weather.mapAria', { destination: trip.destination })} src={mapUrl} className="h-[380px] w-full border-0" loading="lazy" />
        ) : (
          <div className="grid h-[320px] place-items-center bg-slate-50 dark:bg-slate-950">
            <span className="text-xs text-slate-500">{loading ? t('workspace.weather.locating') : t('workspace.weather.mapUnavailable')}</span>
          </div>
        )}
      </section>

      {/* Weather Forecast & Smart Replan */}
      <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.weather.forecastTitle')}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('workspace.weather.forecastDescription')}</p>
        </div>

        {loading ? (
          <Empty icon="⛅" text={t('workspace.weather.loading')} />
        ) : !weather?.available || !weather.daily?.time ? (
          <Empty icon="📅" text={weather?.reason ?? t('workspace.weather.noData')} />
        ) : (
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {weather.daily.time.map((date, index) => {
              const rain = weather.daily?.precipitation_probability_max?.[index] ?? 0;
              return (
                <div
                  key={date}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{weatherIcon(weather.daily?.weather_code?.[index])}</span>
                    <span className="text-xs font-bold text-slate-500">
                      {new Date(date).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                  <strong className="mt-3 block font-outfit text-lg font-black text-slate-900 dark:text-white">
                    {Math.round(weather.daily?.temperature_2m_max?.[index] ?? 0)}°C{' '}
                    <span className="text-xs font-normal text-slate-400">
                      / {Math.round(weather.daily?.temperature_2m_min?.[index] ?? 0)}°C
                    </span>
                  </strong>
                  <p className="mt-1 text-xs text-slate-500">{t('workspace.weather.rainChance')} <strong className={rain >= 50 ? 'text-rose-500' : 'text-blue-600 dark:text-cyan-400'}>{rain}%</strong></p>

                  {trip.canEdit && rain >= 50 && index < (trip.itinerary?.content?.days.length ?? 0) && (
                    <button
                      type="button"
                      disabled={replanning !== null}
                      onClick={async () => {
                        setReplanning(index);
                        try {
                          await tripService.replan(trip.id, {
                            dayIndex: index,
                            reason: t('workspace.weather.replanReason', { rain }),
                          });
                          await onReload();
                          toast.success(t('workspace.weather.replannedDay', { day: index + 1 }));
                        } finally {
                          setReplanning(null);
                        }
                      }}
                      className="mt-3 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer"
                    >
                      {replanning === index ? t('workspace.weather.replanning') : `✨ ${t('workspace.weather.optimizeRainyDay')}`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Places in Itinerary Deep-Link List */}
      <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
        <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white mb-4">{t('workspace.weather.placesTitle')}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {trip.itinerary?.content?.days.flatMap((day) =>
            day.activities.map((activity) => (
              <a
                key={`${day.day}-${activity.time}-${activity.location}`}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activity.location}, ${trip.destination}`)}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 transition hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-cyan-300">
                  📍
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition">
                    {activity.title}
                  </strong>
                  <span className="block truncate text-xs text-slate-500">{activity.location}</span>
                </div>
                <span className="text-slate-300 group-hover:text-blue-600 transition group-hover:translate-x-1">→</span>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

/* ========================================================================= */
/* 4. COLLABORATION & TEAM PANEL                                             */
/* ========================================================================= */
export function TeamPanel({ trip, onReload }: PanelProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'VIEWER' | 'EDITOR'>('VIEWER');

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start">
      <section className="lg:col-span-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
        <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.team.title')}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {t('workspace.team.description')}
        </p>

        <div className="mt-6 space-y-3">
          {/* Owner Card */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-blue-200/90 bg-blue-50/70 p-4 dark:border-blue-500/30 dark:bg-blue-950/30">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-black text-white shadow-md shadow-blue-500/25">
              👑
            </span>
            <div className="flex-1">
              <strong className="text-sm font-extrabold text-slate-900 dark:text-white">{t('workspace.team.you')}</strong>
              <p className="text-xs text-slate-500">{t('workspace.team.ownerDescription')}</p>
            </div>
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">{t('workspace.team.owner')}</span>
          </div>

          {/* Collaborator List */}
          {trip.collaborators.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                {item.email[0].toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <strong className="block truncate text-sm text-slate-900 dark:text-white">{item.email}</strong>
                <p className="text-xs text-slate-500">{t('workspace.team.collaborator')}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.role === 'EDITOR' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                {item.role}
              </span>
              {trip.isOwner && (
                <button
                  type="button"
                  onClick={async () => {
                    await tripService.removeCollaborator(trip.id, item.id);
                    await onReload();
                    toast.success(t('workspace.team.removed'));
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                  title={t('workspace.team.removeMember')}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {!trip.collaborators.length && <Empty icon="👥" text={t('workspace.team.empty')} />}
        </div>
      </section>

      {/* Invite Form */}
      {trip.isOwner && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await tripService.invite(trip.id, email, role);
            setEmail('');
            await onReload();
            toast.success(t('workspace.team.invited'));
          }}
          className="lg:col-span-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">✉️</span>
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.team.inviteTitle')}</h3>
          </div>
          <p className="text-xs text-slate-500">{t('workspace.team.inviteDescription')}</p>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <select
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500 cursor-pointer"
            value={role}
            onChange={(e) => setRole(e.target.value as 'VIEWER' | 'EDITOR')}
          >
            <option value="VIEWER">{t('workspace.team.viewer')}</option>
            <option value="EDITOR">{t('workspace.team.editor')}</option>
          </select>
          <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer">
            {t('workspace.team.sendInvite')}
          </button>
        </form>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 5. JOURNAL & MEMORIES PANEL                                               */
/* ========================================================================= */
export function JournalPanel({ trip, onReload }: PanelProps) {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start">
      {/* Journal Feed */}
      <div className="lg:col-span-8 space-y-5">
        {trip.journalEntries.map((entry) => (
          <article
            key={entry.id}
            className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm"
          >
            {entry.imageUrl && (
              <img
                src={entry.imageUrl}
                alt=""
                className="h-64 w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                    📅 {new Date(entry.entryDate).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'vi-VN')}
                  </span>
                  <h3 className="mt-1 font-outfit text-xl font-black text-slate-900 dark:text-white">{entry.title}</h3>
                </div>
                {trip.canEdit && (
                  <button
                    type="button"
                    onClick={async () => {
                      await tripService.removeJournal(trip.id, entry.id);
                      await onReload();
                      toast.success(t('workspace.journal.deleted'));
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
              <p className="mt-3 whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {entry.content}
              </p>
            </div>
          </article>
        ))}
        {!trip.journalEntries.length && (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-12 text-center">
            <Empty icon="📖" text={t('workspace.journal.empty')} />
          </div>
        )}
      </div>

      {/* Writer Form */}
      {trip.canEdit && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await tripService.addJournal(trip.id, { title, content, imageUrl });
            setTitle('');
            setContent('');
            setImageUrl('');
            await onReload();
            toast.success(t('workspace.journal.saved'));
          }}
          className="lg:col-span-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.journal.writeTitle')}</h3>
          </div>
          <input
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('workspace.journal.titlePlaceholder')}
            required
          />
          <textarea
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500 min-h-32 leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('workspace.journal.contentPlaceholder')}
            required
          />
          <input
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={t('workspace.journal.imagePlaceholder')}
          />
          <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer">
            {t('workspace.journal.save')}
          </button>
        </form>
      )}
    </div>
  );
}

/* ========================================================================= */
/* 6. BOOKING VAULT PANEL                                                    */
/* ========================================================================= */
export function BookingPanel({ trip, onReload }: PanelProps) {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState('Khách sạn');
  const [provider, setProvider] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [amount, setAmount] = useState('');

  const total = trip.bookings
    .filter((item) => item.status !== 'CANCELLED')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="rounded-2xl border border-blue-200/90 bg-blue-50/80 dark:border-blue-500/30 dark:bg-blue-950/30 p-4 text-xs leading-relaxed text-blue-900 dark:text-blue-200 backdrop-blur-md flex items-center gap-3">
        <span className="text-xl">🔐</span>
        <div>
          <strong>{t('workspace.booking.noticeTitle')}</strong> {t('workspace.booking.noticeDescription')}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Bookings List */}
        <section className="lg:col-span-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.booking.title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('workspace.booking.total')} <strong className="text-slate-900 dark:text-white font-mono">{formatMoney(total, i18n.language)}</strong></p>
            </div>
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-xs font-bold text-blue-700 dark:text-cyan-300">
              {t('workspace.booking.count', { count: trip.bookings.length })}
            </span>
          </div>

          <div className="space-y-3">
            {trip.bookings.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4"
              >
                <div className="flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-100 text-xl dark:bg-blue-500/15">
                    {bookingIcon(item.type)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-sm font-extrabold text-slate-900 dark:text-white">{item.provider}</strong>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                        item.status === 'BOOKED'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : item.status === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                      }`}>
                        {t(`workspace.booking.status.${item.status}`)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {t(`workspace.booking.types.${item.type}`, { defaultValue: item.type })} {item.confirmation ? `• ${t('workspace.booking.code')}: ${item.confirmation}` : ''}
                    </p>
                  </div>
                  <strong className="text-sm font-black text-slate-900 dark:text-white font-mono">
                    {formatMoney(item.amount, i18n.language)}
                  </strong>
                </div>

                {trip.canEdit && (
                  <div className="mt-3 flex justify-end gap-2 border-t border-slate-200/40 dark:border-slate-800/60 pt-2 text-xs">
                    <button
                      type="button"
                      onClick={async () => {
                        await tripService.updateBooking(trip.id, item.id, {
                          status: item.status === 'BOOKED' ? 'PLANNED' : 'BOOKED',
                        });
                        await onReload();
                      }}
                      className="font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                    >
                      {item.status === 'BOOKED' ? t('workspace.booking.markPlanned') : t('workspace.booking.markBooked')}
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={async () => {
                        await tripService.removeBooking(trip.id, item.id);
                        await onReload();
                        toast.success(t('workspace.booking.deleted'));
                      }}
                      className="font-bold text-rose-500 hover:underline cursor-pointer"
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {!trip.bookings.length && <Empty icon="🎫" text={t('workspace.booking.empty')} />}
          </div>
        </section>

        {/* Add Booking Form */}
        {trip.canEdit && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await tripService.addBooking(trip.id, {
                type,
                provider,
                confirmation,
                amount: Math.round(Number(amount) || 0),
              });
              setProvider('');
              setConfirmation('');
              setAmount('');
              await onReload();
              toast.success(t('workspace.booking.added'));
            }}
            className="lg:col-span-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm space-y-4"
          >
            <h3 className="font-outfit text-base font-extrabold text-slate-900 dark:text-white">{t('workspace.booking.addTitle')}</h3>
            <select
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500 cursor-pointer"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {['Khách sạn', 'Vé máy bay', 'Tàu/Xe', 'Tour', 'Nhà hàng', 'Khác'].map((item) => (
                <option key={item} value={item}>{t(`workspace.booking.types.${item}`)}</option>
              ))}
            </select>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              placeholder={t('workspace.booking.providerPlaceholder')}
              required
            />
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder={t('workspace.booking.confirmationPlaceholder')}
            />
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-blue-500"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('workspace.moneyPlaceholder')}
            />
            <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition cursor-pointer">
              {t('workspace.booking.save')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* SHARED UTILITY COMPONENTS & HELPERS                                       */
/* ========================================================================= */
function Metric({
  tone,
  icon,
  label,
  value,
  hint,
}: {
  tone: 'blue' | 'violet' | 'emerald';
  icon: string;
  label: string;
  value: string;
  hint: string;
}) {
  const styles = {
    blue: 'from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/20',
    violet: 'from-violet-600 via-purple-600 to-fuchsia-500 shadow-violet-500/20',
    emerald: 'from-emerald-600 via-teal-600 to-cyan-600 shadow-emerald-500/20',
  };

  return (
    <div className={`rounded-3xl bg-gradient-to-br ${styles[tone]} p-6 text-white shadow-xl`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <p className="text-xs font-bold text-white/80">{label}</p>
      </div>
      <strong className="mt-3 block font-outfit text-2xl font-black tracking-tight">{value}</strong>
      <p className="mt-1 text-[11px] text-white/70 font-medium">{hint}</p>
    </div>
  );
}

function Empty({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center">
      <div>
        <div className="text-3xl">{icon}</div>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{text}</p>
      </div>
    </div>
  );
}

function parseMoney(input: string) {
  const digits = input.replace(/[^0-9]/g, '');
  return Number(digits) || 0;
}

function formatMoney(value: number, lang = 'vi') {
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

function weatherIcon(code = 0) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  return '⛈️';
}

function bookingIcon(type: string) {
  if (type.includes('Khách')) return '🏨';
  if (type.includes('máy bay')) return '✈️';
  if (type.includes('Tàu')) return '🚆';
  if (type.includes('Nhà hàng')) return '🍽️';
  return '🎟️';
}
