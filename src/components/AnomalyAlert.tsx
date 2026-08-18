import { AlertTriangle, ShieldAlert, Clock, DollarSign, FileWarning } from 'lucide-react';
import type { Anomaly } from '@/data/types';

const iconMap = {
  mismatch: ShieldAlert,
  delay: Clock,
  overrun: DollarSign,
  unverified_payment: FileWarning,
};

const severityStyles = {
  high: 'border-error/30 bg-error/5',
  medium: 'border-warning/30 bg-warning/5',
  low: 'border-primary/30 bg-primary/5',
};

export default function AnomalyAlert({ anomaly, onReport, onAudit }: { anomaly: Anomaly; onReport?: () => void; onAudit?: () => void }) {
  const Icon = iconMap[anomaly.type];
  return (
    <div className={`card p-5 border-2 ${severityStyles[anomaly.severity]}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          anomaly.severity === 'high' ? 'bg-error/10 text-error' : anomaly.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-sm text-ink">{anomaly.title}</h3>
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
              anomaly.severity === 'high' ? 'bg-error/10 text-error' : anomaly.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
            }`}>
              {anomaly.severity} severity
            </span>
          </div>
          <p className="text-sm text-ink-secondary mt-1.5 leading-relaxed">{anomaly.description}</p>
          {(onReport || onAudit) && (
            <div className="flex items-center gap-2 mt-3">
              {onReport && (
                <button onClick={onReport} className="btn-outline text-xs py-2 px-3">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Report Issue
                </button>
              )}
              {onAudit && (
                <button onClick={onAudit} className="btn-ghost text-xs py-2 px-3">
                  View Audit Log
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
