import { CheckCircle2, Clock, AlertTriangle, Flag, Calendar } from 'lucide-react';
import type { ProjectStatus, PaymentStatus, MilestoneStatus, ComplaintStatus } from '@/data/types';

type AnyStatus = ProjectStatus | PaymentStatus | MilestoneStatus | ComplaintStatus;

const config: Record<string, { bg: string; text: string; border: string; icon: typeof CheckCircle2; label: string }> = {
  Completed: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', icon: CheckCircle2, label: 'Completed' },
  'In Progress': { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20', icon: Clock, label: 'In Progress' },
  Delayed: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', icon: AlertTriangle, label: 'Delayed' },
  Flagged: { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20', icon: Flag, label: 'Flagged' },
  Planned: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', icon: Calendar, label: 'Planned' },
  Cleared: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', icon: CheckCircle2, label: 'Cleared' },
  Processing: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20', icon: Clock, label: 'Processing' },
  Pending: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', icon: Clock, label: 'Pending' },
  Submitted: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', icon: Clock, label: 'Submitted' },
  'Under Review': { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20', icon: Clock, label: 'Under Review' },
  Investigating: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', icon: AlertTriangle, label: 'Investigating' },
  Resolved: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', icon: CheckCircle2, label: 'Resolved' },
  Rejected: { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20', icon: Flag, label: 'Rejected' },
};

export default function StatusBadge({ status, size = 'sm' }: { status: AnyStatus; size?: 'sm' | 'md' }) {
  const c = config[status] ?? config['Pending'];
  const Icon = c.icon;
  const padding = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} font-medium rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      <Icon className={size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      {c.label}
    </span>
  );
}
