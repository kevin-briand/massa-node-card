// Minimal subset of the Home Assistant frontend types used by the card.
// (custom-card-helpers is no longer maintained, so the card declares what it needs.)

export interface HassEntity {
  entity_id: string
  state: string
  attributes: Record<string, any>
  last_changed: string
  last_updated: string
}

export interface HassEntityRegistryEntry {
  entity_id: string
  device_id?: string
  platform?: string
  translation_key?: string
}

export interface HassDevice {
  id: string
  name?: string | null
  name_by_user?: string | null
}

export interface HomeAssistant {
  states: Record<string, HassEntity>
  entities?: Record<string, HassEntityRegistryEntry>
  devices?: Record<string, HassDevice>
  language: string
  locale?: { language: string }
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>
}

export interface CardConfig {
  type: string
  title?: string
  device_id?: string
  show_wallet?: boolean
  show_history?: boolean
}

/** Keys of the entities created by the massa_node integration (their translation_key). */
export type MassaKey =
  | 'status'
  | 'massa_price'
  | 'wallet_amount'
  | 'wallet_amount_with_rolls'
  | 'total_amount'
  | 'total_gain_of_day'
  | 'active_rolls'
  | 'produced_block'
  | 'missed_block'
  | 'block_miss_rate'
  | 'current_cycle'
  | 'node_version'

export type MassaEntities = Partial<Record<MassaKey, string>>

export interface DailyGain {
  day: Date
  value: number
  live: boolean
}
