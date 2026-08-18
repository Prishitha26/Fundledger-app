import { CheckCircle2, Clock, Circle, MapPin } from 'lucide-react';
import { formatDate } from '@/utils/currency';
import type { Milestone } from '@/data/types';

export default function Timeline({ milestones }: { milestones: Milestone[] }) {
  const currentIdx = milestones.findIndex((m) => m.status === 'In Progress');

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-surface-mid" />

      <div className="space-y-6">
        {milestones.map((m, idx) => {
          const isCurrent = idx === currentIdx;
          const isDone = m.status === 'Completed';

          return (
            <div key={m.id} className={`relative flex gap-4 ${isCurrent ? 'animate-fade-in' : ''}`}>
              <div className="relative z-10 flex-shrink-0">
                {isDone ? (
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center ring-4 ring-bg">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center ring-4 ring-bg animate-pulse">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface-mid flex items-center justify-center ring-4 ring-bg">
                    <Circle className="w-3.5 h-3.5 text-outline" />
                  </div>
                )}
              </div>

              <div className={`flex-1 pb-2 ${isCurrent ? 'bg-secondary/5 border border-secondary/20 rounded-lg p-4 -mt-1' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className={`font-semibold text-sm ${isCurrent ? 'text-secondary' : isDone ? 'text-ink' : 'text-ink-secondary'}`}>
                    {isCurrent && 'Current Milestone — '}{m.name}
                  </h4>
                  {m.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-secondary mt-1">{m.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-ink-secondary">
                  <span>{formatDate(m.date)}</span>
                  {m.evidence && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {m.evidence}
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-ink-secondary">Progress</span>
                      <span className="font-bold text-secondary">{m.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-surface-mid rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
