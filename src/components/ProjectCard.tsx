import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Calendar, Wallet } from 'lucide-react';
import type { Project } from '@/data/types';
import { formatINR, formatDate } from '@/utils/currency';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/projects/${project.id}`)}
      className="card card-hover p-5 text-left w-full hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-ink group-hover:text-primary transition-colors line-clamp-1">{project.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-ink-secondary mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location.village ? `${project.location.village}, ` : ''}{project.district}</span>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-ink-secondary mb-4">
        <Building2 className="w-3.5 h-3.5" />
        <span className="truncate">{project.department}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-surface-low rounded-lg px-3 py-2">
          <p className="text-[11px] text-ink-secondary font-medium">Allocated</p>
          <p className="text-sm font-bold text-ink mt-0.5">{formatINR(project.budget)}</p>
        </div>
        <div className="bg-surface-low rounded-lg px-3 py-2">
          <p className="text-[11px] text-ink-secondary font-medium">Spent</p>
          <p className="text-sm font-bold text-secondary mt-0.5">{formatINR(project.spent)}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-ink-secondary font-medium">Physical Progress</span>
          <span className="font-bold text-ink">{project.progress}%</span>
        </div>
        <div className="h-2 bg-surface-mid rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-ink-secondary pt-3 border-t border-surface-mid">
        <Calendar className="w-3.5 h-3.5" />
        <span>Started {formatDate(project.startDate)}</span>
        <span className="mx-1">·</span>
        <span>Est. {formatDate(project.estimatedCompletion)}</span>
      </div>
    </button>
  );
}
