import { css } from 'lit'

export const cardStyles = css`
  :host {
    --massa-positive: var(--success-color, #2e7d32);
    --massa-negative: var(--error-color, #c62828);
    --massa-accent: var(--primary-color, #03a9f4);
    --massa-muted: var(--secondary-text-color, #727272);
    --massa-line: var(--divider-color, rgba(127, 127, 127, 0.2));
  }

  ha-card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-variant-numeric: tabular-nums;
  }

  :where(button.plain) {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 8px;
  }
  :where(button.plain):focus-visible {
    outline: 2px solid var(--massa-accent);
    outline-offset: 2px;
  }

  /* Header */
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px 4px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }
  .status::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
  .status.online {
    color: var(--massa-positive);
    background: color-mix(in srgb, var(--massa-positive) 14%, transparent);
  }
  .status.offline {
    color: var(--massa-negative);
    background: color-mix(in srgb, var(--massa-negative) 14%, transparent);
  }
  .status.unknown {
    color: var(--massa-muted);
    background: color-mix(in srgb, var(--massa-muted) 14%, transparent);
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: opacity 0.2s;
  }
  .body.stale {
    opacity: 0.55;
  }

  .label {
    font-size: 12px;
    color: var(--massa-muted);
  }

  /* Hero: gain of the day + last days */
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 16px;
  }
  .gain {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 2px;
    margin: -2px;
  }
  .gain-value {
    font-size: 34px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--primary-text-color);
  }
  .gain-value.positive {
    color: var(--massa-positive);
  }
  .gain-value.negative {
    color: var(--massa-negative);
  }
  .gain-value .unit {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--massa-muted);
    margin-left: 4px;
  }
  .average {
    font-size: 12px;
    color: var(--massa-muted);
    margin-top: 2px;
  }

  .days {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 14px;
    column-gap: 6px;
    align-items: end;
  }
  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .bar-track {
    height: 56px;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
  .bar {
    width: 100%;
    min-height: 3px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--massa-accent) 38%, transparent);
  }
  .bar.live {
    background: var(--massa-accent);
  }
  .bar.negative {
    background: color-mix(in srgb, var(--massa-negative) 55%, transparent);
  }
  .bar.empty {
    background: var(--massa-line);
  }
  .day-letter {
    font-size: 10px;
    line-height: 1;
    color: var(--massa-muted);
  }
  .day-letter.live {
    color: var(--primary-text-color);
    font-weight: 600;
  }

  hr {
    border: none;
    border-top: 1px solid var(--massa-line);
    margin: 0;
  }

  /* Key figures */
  .figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .figure {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px 6px;
    margin: -4px -6px;
  }
  .figure-value {
    font-size: 18px;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .figure-value .unit {
    font-size: 12px;
    color: var(--massa-muted);
    margin-left: 3px;
    font-weight: 400;
  }

  /* Blocks */
  .blocks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 6px;
    margin: -4px -6px;
  }
  .blocks-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .blocks-rate {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
  }
  .meter {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--massa-line);
    gap: 2px;
  }
  .meter .produced {
    background: var(--massa-positive);
  }
  .meter .missed {
    background: var(--massa-negative);
  }
  .counts {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--massa-muted);
  }
  .counts .missed-count.has-missed {
    color: var(--massa-negative);
  }

  /* Wallet */
  .wallet {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    gap: 2px 12px;
    padding: 4px 6px;
    margin: -4px -6px;
  }
  .wallet-amount {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
    text-align: right;
  }
  .wallet-detail {
    font-size: 12px;
    color: var(--massa-muted);
  }
  .wallet-value {
    font-size: 12px;
    color: var(--massa-muted);
    text-align: right;
  }

  .message {
    font-size: 14px;
    color: var(--massa-muted);
    line-height: 1.5;
  }

  @media (max-width: 360px) {
    .hero {
      grid-template-columns: 1fr;
    }
    .gain-value {
      font-size: 28px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .body {
      transition: none;
    }
  }
`
