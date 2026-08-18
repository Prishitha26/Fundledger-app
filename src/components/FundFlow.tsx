import { Landmark, ArrowDown } from 'lucide-react';
import { formatINR, formatDate } from '@/utils/currency';
import StatusBadge from './StatusBadge';
import type { Project } from '@/data/types';

interface FlowStage {
  label: string;
  amount: number;
  date: string;
  department: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export default function FundFlow({ project }: { project: Project }) {
  const stages: FlowStage[] = [
    { label: 'Central Government', amount: project.budget, date: project.startDate, department: 'Ministry of Finance', status: 'Completed' },
    { label: 'State Government', amount: project.budget, date: project.startDate, department: 'Govt of Tamil Nadu', status: 'Completed' },
    { label: 'District Administration', amount: project.fundsReleased, date: project.startDate, department: `${project.district} Collectorate`, status: 'Completed' },
    { label: 'Project Account', amount: project.fundsReleased, date: project.startDate, department: project.department, status: 'Completed' },
    { label: 'Contractor / Supplier', amount: project.spent, date: project.payments[0]?.date ?? project.startDate, department: project.contractor, status: 'In Progress' },
    { label: 'Actual Expenditure', amount: project.spent, date: new Date().toISOString().slice(0, 10), department: 'Site Execution', status: project.status === 'Completed' ? 'Completed' : 'In Progress' },
  ];

  return (
    <div className="space-y-1">
      {stages.map((stage, idx) => (
        <div key={idx}>
          <div className={`card p-4 flex items-center justify-between gap-4 ${stage.status === 'In Progress' ? 'border-secondary/30 bg-secondary/5' : ''}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stage.status === 'In Progress' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                <Landmark className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-ink">{stage.label}</p>
                <p className="text-xs text-ink-secondary mt-0.5">{stage.department} · {formatDate(stage.date)}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-ink">{formatINR(stage.amount)}</p>
              <div className="mt-1"><StatusBadge status={stage.status} /></div>
            </div>
          </div>
          {idx < stages.length - 1 && (
            <div className="flex justify-center py-1">
              <ArrowDown className="w-4 h-4 text-outline" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
