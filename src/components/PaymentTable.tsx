import { formatINR, formatDate } from '@/utils/currency';
import StatusBadge from './StatusBadge';
import type { Payment } from '@/data/types';

export default function PaymentTable({ payments }: { payments: Payment[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-low text-left text-ink-secondary">
              <th className="px-4 py-3 font-semibold">Recipient</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-surface-mid hover:bg-surface-low transition-colors">
                <td className="px-4 py-3 font-semibold text-ink">{p.recipient}</td>
                <td className="px-4 py-3 text-ink-secondary">{p.role}</td>
                <td className="px-4 py-3 font-bold text-secondary">{formatINR(p.amount)}</td>
                <td className="px-4 py-3 text-ink-secondary">{formatDate(p.date)}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3"><span className="font-mono text-xs text-primary">{p.transactionId}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
