import type { CardConfig, MassaKey } from './types'

export const CARD_TAG = 'massa-node-card'
export const EDITOR_TAG = 'massa-node-card-editor'
export const INTEGRATION = 'massa_node'

export const HISTORY_DAYS = 7
export const HISTORY_REFRESH_MS = 30 * 60 * 1000

export const DEFAULT_CONFIG: Omit<CardConfig, 'type'> = {
  show_wallet: false,
  show_history: true
}

/** Entity ids created by version 1 of the integration, used when the registry has no match. */
export const LEGACY_ENTITY_IDS: Record<MassaKey, string> = {
  status: 'sensor.massa_node_status',
  massa_price: 'sensor.massa_node_massa_price',
  wallet_amount: 'sensor.massa_node_wallet_amount',
  wallet_amount_with_rolls: 'sensor.massa_node_wallet_amount_with_rolls',
  total_amount: 'sensor.massa_node_total_amount',
  total_gain_of_day: 'sensor.massa_node_total_gain_of_day',
  active_rolls: 'sensor.massa_node_active_rolls',
  produced_block: 'sensor.massa_node_produced_block',
  missed_block: 'sensor.massa_node_missed_block',
  block_miss_rate: 'sensor.massa_node_block_miss_rate',
  current_cycle: 'sensor.massa_node_current_cycle',
  node_version: 'sensor.massa_node_node_version'
}
