/**
 * Format a number in rupees into Indian-style currency strings.
 * Supports Lakh (1,00,000) and Crore (1,00,00,000) notation.
 */
export function formatINR(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 10000000) {
    const cr = (abs / 10000000).toFixed(2).replace(/\.00$/, '');
    return `${sign}₹${cr} Cr`;
  }
  if (abs >= 100000) {
    const l = (abs / 100000).toFixed(1).replace(/\.0$/, '');
    return `${sign}₹${l} Lakh`;
  }
  if (abs >= 1000) {
    const k = (abs / 1000).toFixed(0);
    return `${sign}₹${k},000`;
  }
  return `${sign}₹${abs}`;
}

/** Full numeric INR formatting with grouping (e.g. ₹32,50,000) */
export function formatINRFull(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(Math.round(amount));
  const str = abs.toString();
  let formatted = '';
  if (str.length <= 3) {
    formatted = str;
  } else {
    const last3 = str.slice(-3);
    const rest = str.slice(0, -3);
    formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  }
  return `${sign}₹${formatted}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

/** Generate a tracking ID like FL-REP-XXXX */
export function generateTrackingId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `FL-REP-${n}`;
}

/** Generate a simulated transaction hash */
export function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let h = '0x';
  for (let i = 0; i < 16; i++) h += chars[Math.floor(Math.random() * 16)];
  return h + '...';
}

export function generateRecordId(): string {
  const n = Math.floor(Math.random() * 999);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `REC-${n}-${suffix}`;
}
