import { INTEGRATION, LEGACY_ENTITY_IDS } from './consts'
import type { HomeAssistant, MassaEntities, MassaKey } from './types'

/** Devices that own at least one massa_node entity. */
export function findMassaDevices (hass: HomeAssistant): string[] {
  const devices = new Set<string>()
  for (const entry of Object.values(hass.entities ?? {})) {
    if (entry.platform === INTEGRATION && entry.device_id != null) devices.add(entry.device_id)
  }
  return [...devices]
}

/**
 * Map each Massa key to an entity id.
 * Uses the entity registry (translation_key + device), so renamed entities keep working,
 * and falls back to the entity ids of version 1 of the integration.
 */
export function resolveEntities (hass: HomeAssistant, deviceId?: string): MassaEntities {
  const result: MassaEntities = {}
  const device = deviceId ?? findMassaDevices(hass)[0]

  for (const entry of Object.values(hass.entities ?? {})) {
    if (entry.platform !== INTEGRATION || entry.translation_key == null) continue
    if (device != null && entry.device_id !== device) continue
    result[entry.translation_key as MassaKey] = entry.entity_id
  }

  if (Object.keys(result).length === 0) {
    for (const [key, entityId] of Object.entries(LEGACY_ENTITY_IDS)) {
      if (hass.states[entityId] !== undefined) result[key as MassaKey] = entityId
    }
  }
  return result
}

export function numericState (hass: HomeAssistant, entityId?: string): number | undefined {
  if (entityId == null) return undefined
  const value = parseFloat(hass.states[entityId]?.state ?? '')
  return Number.isFinite(value) ? value : undefined
}

export function isOnline (hass: HomeAssistant, entityId?: string): boolean | undefined {
  if (entityId == null) return undefined
  const state = hass.states[entityId]?.state
  if (state === undefined) return undefined
  // binary_sensor (v2) is on/off, the old text sensor (v1) is Online/Offline.
  return state === 'on' || state === 'Online'
}
