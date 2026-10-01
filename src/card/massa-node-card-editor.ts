import { LitElement, html, nothing, type TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { localize } from '../localize/localize'
import { DEFAULT_CONFIG, EDITOR_TAG, INTEGRATION } from './consts'
import type { CardConfig, HomeAssistant } from './types'

const SCHEMA = [
  { name: 'title', selector: { text: {} } },
  { name: 'device_id', selector: { device: { filter: { integration: INTEGRATION } } } },
  { name: 'show_history', selector: { boolean: {} } },
  { name: 'show_wallet', selector: { boolean: {} } }
]

@customElement(EDITOR_TAG)
export class MassaNodeCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant

  @state() private _config?: CardConfig

  public setConfig (config: CardConfig): void {
    this._config = config
  }

  protected render (): TemplateResult | typeof nothing {
    if (this.hass == null || this._config == null) return nothing
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ ...DEFAULT_CONFIG, ...this._config }}
        .schema=${SCHEMA}
        .computeLabel=${(field: { name: string }) =>
          localize(`editor.${field.name}`, this.hass?.locale?.language ?? this.hass?.language ?? 'en')}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `
  }

  private _valueChanged (ev: CustomEvent<{ value: CardConfig }>): void {
    ev.stopPropagation()
    const config: Record<string, unknown> = { ...ev.detail.value }
    // Keep the YAML short: drop empty values.
    for (const key of Object.keys(config)) {
      if (config[key] === '' || config[key] === undefined) delete config[key]
    }
    this._config = config as unknown as CardConfig
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true })
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: MassaNodeCardEditor
  }
}
