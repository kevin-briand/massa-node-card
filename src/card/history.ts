import type { DailyGain, HomeAssistant } from './types'

interface StatisticValue {
  start: number | string
  state?: number | null
}

interface CompressedState {
  s: string
  lu: number
}

const dayKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const toDate = (value: number | string): Date =>
  typeof value === 'number' ? new Date(value) : new Date(value)

/**
 * Value of the daily gain sensor at the end of each of the previous `days` days.
 * Long term statistics are used first (state_class total → one value per day),
 * the raw history fills the days that have no statistics yet.
 */
export async function fetchDailyGains (
  hass: HomeAssistant,
  entityId: string,
  days: number
): Promise<Map<string, number>> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - days)

  const values = new Map<string, number>()

  try {
    const stats = await hass.callWS<Record<string, StatisticValue[]>>({
      type: 'recorder/statistics_during_period',
      start_time: start.toISOString(),
      end_time: today.toISOString(),
      statistic_ids: [entityId],
      period: 'day',
      types: ['state']
    })
    for (const stat of stats[entityId] ?? []) {
      if (stat.state != null) values.set(dayKey(toDate(stat.start)), stat.state)
    }
  } catch (err) {
    console.debug('massa-node-card: statistics unavailable', err)
  }

  if (values.size >= days) return values

  try {
    const history = await hass.callWS<Record<string, CompressedState[]>>({
      type: 'history/history_during_period',
      start_time: start.toISOString(),
      end_time: today.toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true
    })
    // Keep the last numeric value of each day.
    const lastOfDay = new Map<string, number>()
    for (const item of history[entityId] ?? []) {
      const value = parseFloat(item.s)
      if (!Number.isFinite(value)) continue
      lastOfDay.set(dayKey(new Date(item.lu * 1000)), value)
    }
    for (const [key, value] of lastOfDay) {
      if (!values.has(key)) values.set(key, value)
    }
  } catch (err) {
    console.debug('massa-node-card: history unavailable', err)
  }

  return values
}

/** The last `days` days (oldest first), today being the live sensor value. */
export function buildSeries (
  past: Map<string, number>,
  todayValue: number | undefined,
  days: number
): Array<DailyGain | null> {
  const series: Array<DailyGain | null> = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let offset = days - 1; offset >= 0; offset--) {
    const day = new Date(today)
    day.setDate(day.getDate() - offset)
    if (offset === 0) {
      series.push(todayValue === undefined ? null : { day, value: todayValue, live: true })
    } else {
      const value = past.get(dayKey(day))
      series.push(value === undefined ? null : { day, value, live: false })
    }
  }
  return series
}
