import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/data/types';
import { formatINR } from '@/utils/currency';
import StatusBadge from './StatusBadge';

export default function ProjectTable({ projects }: { projects: Project[] }) {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-ink-secondary text-sm">No projects match your filters.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-low text-left text-ink-secondary">
              <th className="px-4 py-3 font-semibold">Project</th>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Budget</th>
              <th className="px-4 py-3 font-semibold">Progress</th>
              <th className="px-4 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-surface-mid hover:bg-surface-low transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-ink-secondary mt-0.5">{p.department}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-primary">{p.id}</span>
                </td>
                <td className="px-4 py-3 text-ink-secondary">{p.district}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 font-semibold text-ink">{formatINR(p.budget)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-surface-mid rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-ink">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-container text-sm font-medium transition-colors"
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
