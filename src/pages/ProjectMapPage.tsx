import { useState, useMemo, useEffect } from 'react';
import { Filter, X, Layers, Loader2 } from 'lucide-react';
import { districts } from '@/data/districts';
import ProjectMap from '@/components/ProjectMap';
import StatusBadge from '@/components/StatusBadge';
import { formatINR } from '@/utils/currency';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '@/services/api';
import type { Project, ProjectStatus, ProjectCategory } from '@/data/types';

const statuses: ProjectStatus[] = ['Completed', 'In Progress', 'Delayed', 'Flagged', 'Planned'];
const categories: ProjectCategory[] = ['Infrastructure', 'Education', 'Healthcare', 'Water Supply', 'Rural Development'];

export default function ProjectMapPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: '',
    district: '',
    status: '',
    budgetRange: '',
  });
  const [showFilters, setShowFilters] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
      if (filters.category && p.category !== filters.category) return false;
      if (filters.district && p.district !== filters.district) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.budgetRange) {
        const b = p.budget;
        if (filters.budgetRange === '0-50L' && b >= 5000000) return false;
        if (filters.budgetRange === '50L-1Cr' && (b < 5000000 || b >= 10000000)) return false;
        if (filters.budgetRange === '1Cr+' && b < 10000000) return false;
      }
      return true;
    });
  }, [allProjects, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const activeCount = Object.values(filters).filter(Boolean).length;
  const selected = filtered.find((p) => p.id === selectedId) ?? filtered[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Project Map</h1>
        <p className="section-subtitle mt-1">Explore government projects across Tamil Nadu districts. Click markers for details.</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <span className="font-medium text-ink-secondary">Legend:</span>
        {statuses.map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{
              background: s === 'Completed' ? '#2E7D32' : s === 'In Progress' ? '#006A6A' : s === 'Delayed' ? '#ED6C02' : s === 'Flagged' ? '#C62828' : '#0F4C81'
            }} />
            <span className="text-ink-secondary">{s}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden h-[500px] lg:h-[600px]">
            <ProjectMap projects={filtered} />
          </div>
        </div>

        {/* Explorer panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Explorer</h2>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-ghost text-xs py-2 px-3">
              <Filter className="w-3.5 h-3.5" /> Filters {activeCount > 0 && <span className="bg-primary text-white rounded-full px-1.5 text-[10px]">{activeCount}</span>}
            </button>
          </div>

          {showFilters && (
            <div className="card p-4 space-y-3 animate-fade-in">
              <div>
                <label className="label text-xs" htmlFor="pm-cat">Category</label>
                <select id="pm-cat" className="input text-sm py-2" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                  <option value="">All Categories</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label text-xs" htmlFor="pm-dist">District</label>
                <select id="pm-dist" className="input text-sm py-2" value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })}>
                  <option value="">All Districts</option>
                  {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label text-xs" htmlFor="pm-st">Status</label>
                <select id="pm-st" className="input text-sm py-2" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                  <option value="">All Statuses</option>
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label text-xs" htmlFor="pm-budget">Budget Range</label>
                <select id="pm-budget" className="input text-sm py-2" value={filters.budgetRange} onChange={(e) => setFilters({ ...filters, budgetRange: e.target.value })}>
                  <option value="">Any Budget</option>
                  <option value="0-50L">Under ₹50 Lakh</option>
                  <option value="50L-1Cr">₹50 Lakh - ₹1 Cr</option>
                  <option value="1Cr+">Above ₹1 Cr</option>
                </select>
              </div>
              {activeCount > 0 && (
                <button onClick={() => setFilters({ category: '', district: '', status: '', budgetRange: '' })} className="text-xs text-ink-secondary hover:text-ink flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>
          )}

          {/* Selected project summary */}
          {selected && (
            <div className="card p-5 animate-fade-in">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-bold text-ink text-sm leading-tight">{selected.name}</h3>
                <StatusBadge status={selected.status} />
              </div>
              <p className="text-xs text-ink-secondary mb-3">{selected.department}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-surface-low rounded-lg px-3 py-2">
                  <p className="text-[11px] text-ink-secondary">Budget</p>
                  <p className="text-sm font-bold text-ink">{formatINR(selected.budget)}</p>
                </div>
                <div className="bg-surface-low rounded-lg px-3 py-2">
                  <p className="text-[11px] text-ink-secondary">Progress</p>
                  <p className="text-sm font-bold text-secondary">{selected.progress}%</p>
                </div>
              </div>
              <button onClick={() => navigate(`/projects/${selected.id}`)} className="btn-primary w-full text-sm">
                View Full Report
              </button>
            </div>
          )}

          {/* Project list */}
          <div className="card overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left px-4 py-3 border-b border-surface-mid last:border-0 transition-colors ${selectedId === p.id ? 'bg-surface-low' : 'hover:bg-surface-low'}`}
                >
                  <p className="font-semibold text-sm text-ink truncate">{p.name}</p>
                  <p className="text-xs text-ink-secondary mt-0.5">{p.district} · {formatINR(p.budget)}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
