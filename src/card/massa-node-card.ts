import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { localize } from '../localize/localize'
import { CARD_TAG, DEFAULT_CONFIG, EDITOR_TAG, HISTORY_DAYS, HISTORY_REFRESH_MS } from './consts'
import { isOnline, numericState, resolveEntities } from './entities'
import { buildSeries, fetchDailyGains } from './history'
import { cardStyles } from './styles'
import type { CardConfig, DailyGain, HomeAssistant, MassaEntities, MassaKey } from './types'
import './massa-node-card-editor'

@customElement(CARD_TAG)
export class MassaNodeCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant

  @state() private _config: CardConfig = { type: `custom:${CARD_TAG}`, ...DEFAULT_CONFIG }
  @state() private _pastGains = new Map<string, number>()

  private _entities: MassaEntities = {}
  private _historyLoadedAt = 0
  private _historyDay = ''
  private _historyLoading = false

  static styles = cardStyles

  public setConfig (config: CardConfig): void {
    this._config = { ...DEFAULT_CONFIG, ...config }
    this._historyLoadedAt = 0
  }

  public static getConfigElement (): HTMLElement {
    return document.createElement(EDITOR_TAG)
  }

  public static getStubConfig (): Partial<CardConfig> {
    return {}
  }

  public getCardSize (): number {
    return this._config.show_wallet === true ? 7 : 6
  }

  public getGridOptions (): Record<string, number | string> {
    return { columns: 12, min_columns: 6, rows: 'auto' }
  }

  protected willUpdate (changed: PropertyValues): void {
    if ((changed.has('hass') || changed.has('_config')) && this.hass != null) {
      this._entities = resolveEntities(this.hass, this._config.device_id)
    }
  }

  protected updated (): void {
    // hass is pushed on every state change, so no timer is needed: reload the
    // history when it is missing, outdated, or when the day has changed.
    const entityId = this._entities.total_gain_of_day
    if (this.hass == null || entityId == null || this._config.show_history === false) return
    const today = new Date().toDateString()
    const outdated = Date.now() - this._historyLoadedAt > HISTORY_REFRESH_MS
    if (this._historyLoading || (!outdated && this._historyDay === today)) return

    this._historyLoading = true
    this._historyDay = today
    fetchDailyGains(this.hass, entityId, HISTORY_DAYS - 1)
      .then((gains) => {
        this._pastGains = gains
        this._historyLoadedAt = Date.now()
      })
      .catch((err) => { console.debug('massa-node-card: history error', err) })
      .finally(() => { this._historyLoading = false })
  }

  // ---------------------------------------------------------------- helpers

  private _t (key: string, vars?: Record<string, string | number>): string {
    return localize(key, this.hass?.locale?.language ?? this.hass?.language ?? 'en', vars)
  }

  private _format (value: number | undefined, digits: number, signed = false): string {
    if (value === undefined) return '—'
    return new Intl.NumberFormat(this.hass?.locale?.language ?? this.hass?.language, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      signDisplay: signed ? 'exceptZero' : 'auto'
    }).format(value)
  }

  private _value (key: MassaKey): number | undefined {
    return this.hass == null ? undefined : numericState(this.hass, this._entities[key])
  }

  private _unit (key: MassaKey, fallback: string): string {
    const entityId = this._entities[key]
    if (entityId == null || this.hass == null) return fallback
    return this.hass.states[entityId]?.attributes.unit_of_measurement ?? fallback
  }

  private _moreInfo (key: MassaKey): void {
    const entityId = this._entities[key]
    if (entityId == null) return
    this.dispatchEvent(
      new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true })
    )
  }

  // ---------------------------------------------------------------- render

  protected render (): TemplateResult | typeof nothing {
    if (this.hass == null) return nothing
    const title = this._config.title ?? this._t('title')

    if (Object.keys(this._entities).length === 0) {
      return html`
        <ha-card>
          <header><h2>${title}</h2></header>
          <p class="message">${this._t('notFound')}</p>
        </ha-card>
      `
    }

    const online = isOnline(this.hass, this._entities.status)

    return html`
      <ha-card>
        <header>
          <h2>${title}</h2>
          ${this._renderStatus(online)}
        </header>
        <div class="body ${online === false ? 'stale' : ''}">
          ${this._renderHero()}
          <hr />
          ${this._renderFigures()}
          ${this._renderBlocks()}
          ${this._config.show_wallet === true ? html`<hr />${this._renderWallet()}` : nothing}
        </div>
      </ha-card>
    `
  }

  private _renderStatus (online: boolean | undefined): TemplateResult {
    let label = this._t('unknown')
    let cls = 'unknown'
    if (online === true) {
      label = this._t('online')
      cls = 'online'
    } else if (online === false) {
      cls = 'offline'
      label = this._t('offline')
      const since = this.hass?.states[this._entities.status ?? '']?.last_changed
      if (since != null) {
        const time = new Date(since).toLocaleTimeString(this.hass?.locale?.language, {
          hour: '2-digit',
          minute: '2-digit'
        })
        label = this._t('offlineSince', { time })
      }
    }
    return html`
      <button class="plain status ${cls}" @click=${() => { this._moreInfo('status') }}>
        ${label}
      </button>
    `
  }

  private _renderHero (): TemplateResult {
    const gain = this._value('total_gain_of_day')
    const unit = this._unit('total_gain_of_day', 'MAS')
    const tone = gain === undefined || gain === 0 ? '' : gain > 0 ? 'positive' : 'negative'

    const showHistory = this._config.show_history !== false
    const series = buildSeries(this._pastGains, gain, HISTORY_DAYS)
    const past = series.filter((d): d is DailyGain => d !== null && !d.live)
    const average = past.length > 0
      ? past.reduce((sum, d) => sum + d.value, 0) / past.length
      : undefined

    return html`
      <div class="hero">
        <button class="plain gain" @click=${() => { this._moreInfo('total_gain_of_day') }}>
          <span class="label">${this._t('gainOfDay')}</span>
          <span class="gain-value ${tone}">
            ${this._format(gain, 2, true)}<span class="unit">${unit}</span>
          </span>
          ${showHistory
            ? html`<span class="average">
                ${average === undefined
                  ? this._t('noHistory')
                  : this._t('average', {
                    value: `${this._format(average, 2)} ${unit}`,
                    days: past.length
                  })}
              </span>`
            : nothing}
        </button>
        ${showHistory ? this._renderDays(series, unit) : nothing}
      </div>
    `
  }

  private _renderDays (series: Array<DailyGain | null>, unit: string): TemplateResult {
    const max = Math.max(1, ...series.map((d) => Math.abs(d?.value ?? 0)))
    const lang = this.hass?.locale?.language ?? this.hass?.language
    const today = new Date()
    return html`
      <div class="days" role="img" aria-label=${this._t('gainOfDay')}>
        ${series.map((entry, index) => {
          const day = new Date(today)
          day.setDate(day.getDate() - (series.length - 1 - index))
          const letter = day.toLocaleDateString(lang, { weekday: 'narrow' })
          const longDate = day.toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long' })
          if (entry === null) {
            return html`
              <div class="day" title=${longDate}>
                <div class="bar-track"><div class="bar empty"></div></div>
                <span class="day-letter">${letter}</span>
              </div>`
          }
          const height = Math.max(6, (Math.abs(entry.value) / max) * 100)
          const cls = [entry.live ? 'live' : '', entry.value < 0 ? 'negative' : ''].join(' ')
          return html`
            <div class="day" title="${longDate}
${this._format(entry.value, 2, true)} ${unit}">
              <div class="bar-track">
                <div class="bar ${cls}" style="height: ${height}%"></div>
              </div>
              <span class="day-letter ${entry.live ? 'live' : ''}">${letter}</span>
            </div>`
        })}
      </div>
    `
  }

  private _renderFigures (): TemplateResult {
    const figure = (key: MassaKey, label: string, value: string, unit = ''): TemplateResult => html`
      <button class="plain figure" @click=${() => { this._moreInfo(key) }}>
        <span class="label">${label}</span>
        <span class="figure-value">${value}${unit !== '' ? html`<span class="unit">${unit}</span>` : nothing}</span>
      </button>
    `
    const cycle = this._value('current_cycle')
    return html`
      <div class="figures">
        ${figure('active_rolls', this._t('activeRolls'), this._format(this._value('active_rolls'), 0))}
        ${figure('massa_price', this._t('price'), this._format(this._value('massa_price'), 4), this._unit('massa_price', 'USDT'))}
        ${cycle !== undefined
          ? figure('current_cycle', this._t('cycle'), this._format(cycle, 0))
          : nothing}
      </div>
    `
  }

  private _renderBlocks (): TemplateResult {
    const produced = this._value('produced_block') ?? 0
    const missed = this._value('missed_block') ?? 0
    const total = produced + missed
    const rate = total > 0 ? (produced / total) * 100 : undefined

    return html`
      <button class="plain blocks" @click=${() => { this._moreInfo('missed_block') }}>
        <div class="blocks-head">
          <span class="label">${this._t('blocks')}</span>
          <span class="blocks-rate">${rate === undefined ? '' : `${this._format(rate, rate === 100 ? 0 : 1)} %`}</span>
        </div>
        <div class="meter" aria-hidden="true">
          ${total > 0
            ? html`
              <span class="produced" style="flex: ${produced}"></span>
              ${missed > 0 ? html`<span class="missed" style="flex: ${missed}"></span>` : nothing}`
            : nothing}
        </div>
        <div class="counts">
          ${total > 0
            ? html`
              <span>${this._t('produced', { count: this._format(produced, 0) })}</span>
              <span class="missed-count ${missed > 0 ? 'has-missed' : ''}">
                ${this._t('missed', { count: this._format(missed, 0) })}
              </span>`
            : html`<span>${this._t('noBlocks')}</span>`}
        </div>
      </button>
    `
  }

  private _renderWallet (): TemplateResult {
    const total = this._value('wallet_amount_with_rolls')
    const balance = this._value('wallet_amount')
    const value = this._value('total_amount')
    const rolls = this._value('active_rolls')
    const unit = this._unit('wallet_amount_with_rolls', 'MAS')
    return html`
      <button class="plain wallet" @click=${() => { this._moreInfo('wallet_amount_with_rolls') }}>
        <span class="label">${this._t('wallet')}</span>
        <span class="wallet-amount">${this._format(total, 2)} ${unit}</span>
        <span class="wallet-detail">
          ${this._t('walletDetail', {
            balance: `${this._format(balance, 2)} ${unit}`,
            rolls: this._format(rolls, 0)
          })}
        </span>
        <span class="wallet-value">≈ ${this._format(value, 2)} ${this._unit('total_amount', 'USDT')}</span>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: MassaNodeCard
  }
  interface Window {
    customCards?: Array<Record<string, unknown>>
  }
}

window.customCards = window.customCards ?? []
window.customCards.push({
  type: CARD_TAG,
  name: 'Massa Node Card',
  description: 'Follow the gain, rolls and blocks of your Massa node.',
  preview: true,
  documentationURL: 'https://github.com/kevin-briand/HA-massa-node-card'
})
