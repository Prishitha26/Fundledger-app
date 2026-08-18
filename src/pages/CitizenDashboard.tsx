import { useState, useMemo, useEffect } from 'react';
import { MapPin, Filter, X, Loader2 } from 'lucide-react';
import { districts, departments, villages } from '@/data/districts';
import ProjectCard from '@/components/ProjectCard';
import { fetchProjects } from '@/services/api';
import type { Project, ProjectStatus } from '@/data/types';

const statuses: ProjectStatus[] = ['Completed', 'In Progress', 'Delayed', 'Flagged', 'Planned'];

export default function CitizenDashboard() {
  const [filters, setFilters] = useState({ district: '', village: '', department: '', status: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((data) => {
      setAllProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (filters.district && p.district !== filters.district) return false;
      if (filters.village && p.location.village !== filters.village) return false;
      if (filters.department && p.department !== filters.department) return false;
      if (filters.status && p.status !== filters.status) return false;
      return true;
    });
  }, [allProjects, filters]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Projects Near You</h1>
        <p className="section-subtitle mt-1">Track the progress of government initiatives in your local area.</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline">
          <Filter className="w-4 h-4" />
          Filters
          {activeCount > 0 && <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">{activeCount}</span>}
        </button>
        {activeCount > 0 && (
          <button onClick={() => setFilters({ district: '', village: '', department: '', status: '' })} className="text-sm text-ink-secondary hover:text-ink flex items-center gap-1">
            <X className="w-4 h-4" /> Clear all
          </button>
        )}
        <span className="text-sm text-ink-secondary ml-auto">{filtered.length} projects found</span>
      </div>

      {showFilters && (
        <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          <div>
            <label className="label" htmlFor="f-district">District</label>
            <select id="f-district" className="input" value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })}>
              <option value="">All Districts</option>
              {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="f-village">Village/Town</label>
            <select id="f-village" className="input" value={filters.village} onChange={(e) => setFilters({ ...filters, village: e.target.value })}>
              <option value="">All Villages</option>
              {villages.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="f-dept">Department</label>
            <select id="f-dept" className="input" value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
              <option value="">All Departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="f-status">Project Status</label>
            <select id="f-status" className="input" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Statuses</option>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <MapPin className="w-10 h-10 text-outline mx-auto mb-3" />
          <p className="text-ink font-semibold">No projects match your filters</p>
          <p className="text-sm text-ink-secondary mt-1">Try adjusting or clearing your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
}
