import { ShieldCheck, FileText, Hash, Clock, ExternalLink } from 'lucide-react';
import type { BlockchainRecord } from '@/data/types';
import { formatDateTime } from '@/utils/currency';

export default function BlockchainCard({ record, onViewLedger }: { record: BlockchainRecord; onViewLedger?: () => void }) {
  return (
    <div className="card p-5 border-secondary/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-bold text-ink">Blockchain Verified</h3>
          <p className="text-xs text-ink-secondary">Financial records immutably logged on the public ledger</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs text-ink-secondary"><FileText className="w-3.5 h-3.5" /> Record ID</span>
          <span className="font-mono text-xs font-medium text-ink">{record.recordId}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs text-ink-secondary"><Hash className="w-3.5 h-3.5" /> Transaction Hash</span>
          <span className="font-mono text-xs font-medium text-primary">{record.transactionHash}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs text-ink-secondary"><Clock className="w-3.5 h-3.5" /> Timestamp</span>
          <span className="text-xs font-medium text-ink">{formatDateTime(record.timestamp)}</span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-surface-mid">
          <span className="text-xs text-ink-secondary">Verification Status</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
        </div>
      </div>

      {onViewLedger && (
        <button onClick={onViewLedger} className="btn-secondary w-full mt-4 text-sm">
          <ExternalLink className="w-4 h-4" />
          View Complete Ledger
        </button>
      )}

      <p className="text-[10px] text-outline mt-3 text-center leading-relaxed">
        Simulated blockchain verification for demonstration. Architecture supports real ledger integration.
      </p>
    </div>
  );
}
