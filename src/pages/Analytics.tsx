import { useState, useMemo, useEffect } from 'react';
import { Download, Wallet, TrendingUp, Percent, AlertTriangle, Flag, Building2, Loader2 } from 'lucide-react';
import { districts } from '@/data/districts';
import StatCard from '@/components/StatCard';
import { MonthlyUtilizationChart, AllocatedVsSpentChart, DepartmentDonutChart, StatusPieChart, DistrictComparisonChart } from '@/components/Charts';
import { formatINR } from '@/utils/currency';
import { useToast } from '@/services/ToastContext';
import { fetchProjects } from '@/services/api';
import type { Project } from '@/data/types';

const financialYears = ['2024-25', '2023-24', '2022-23'];

export default function Analytics() {
  const { toast } = useToast();
  const [filters, setFilters] = useState({ fy: '2024-25', district: '', department: '', projectType: '' });
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
      if (filters.department && p.department !== filters.department) return false;
      if (filters.projectType && p.category !== filters.projectType) return false;
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

  const totalBudget = filtered.reduce((s, p) => s + p.budget, 0);
  const totalSpent = filtered.reduce((s, p) => s + p.spent, 0);
  const utilizationRate = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : '0';
  const delayed = filtered.filter((p) => p.status === 'Delayed').length;
  const flagged = filtered.filter((p) => p.status === 'Flagged').length;

  // Monthly data (simulated)
  const monthlyData = [
    { month: 'Apr', allocated: 420, spent: 280 },
    { month: 'May', allocated: 510, spent: 390 },
    { month: 'Jun', allocated: 480, spent: 420 },
    { month: 'Jul', allocated: 590, spent: 510 },
    { month: 'Aug', allocated: 650, spent: 480 },
    { month: 'Sep', allocated: 570, spent: 530 },
    { month: 'Oct', allocated: 620, spent: 490 },
    { month: 'Nov', allocated: 580, spent: 550 },
    { month: 'Dec', allocated: 710, spent: 460 },
  ];

  // District comparison
  const districtData = districts.slice(0, 6).map((d) => {
    const dp = filtered.filter((p) => p.district === d.name);
    return {
      district: d.name,
      allocated: Math.round(dp.reduce((s, p) => s + p.budget, 0) / 10000000 * 10) / 10 || Math.round(Math.random() * 5 * 10) / 10,
      spent: Math.round(dp.reduce((s, p) => s + p.spent, 0) / 10000000 * 10) / 10 || Math.round(Math.random() * 3 * 10) / 10,
    };
  });

  // Department donut
  const deptMap = new Map<string, number>();
  filtered.forEach((p) => {
    const key = p.department.replace('Department of ', '').replace('Tamil Nadu ', '').replace(' & Drainage Board', '').replace(' & Family Welfare', '');
    deptMap.set(key, (deptMap.get(key) ?? 0) + p.spent);
  });
  const totalSpentAll = Array.from(deptMap.values()).reduce((a, b) => a + b, 0);
  const deptData = Array.from(deptMap.entries()).map(([name, value]) => ({
    name,
    value: totalSpentAll > 0 ? Math.round((value / totalSpentAll) * 100) : 0,
  }));

  // Status breakdown
  const statusData = [
    { name: 'Completed', value: filtered.filter((p) => p.status === 'Completed').length, color: '#2E7D32' },
    { name: 'In Progress', value: filtered.filter((p) => p.status === 'In Progress').length, color: '#006A6A' },
    { name: 'Planned', value: filtered.filter((p) => p.status === 'Planned').length, color: '#0F4C81' },
    { name: 'Delayed', value: filtered.filter((p) => p.status === 'Delayed').length, color: '#ED6C02' },
    { name: 'Flagged', value: filtered.filter((p) => p.status === 'Flagged').length, color: '#C62828' },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="section-title">Analytics Engine</h1>
          <p className="section-subtitle mt-1 max-w-2xl">Real-time tracking of public expenditure. Monitor allocations, identify bottlenecks, and ensure transparent utilization of state funds.</p>
        </div>
        <button onClick={() => toast('success', 'Analytics report exported as CSV.')} className="btn-primary flex-shrink-0">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="label text-xs" htmlFor="a-fy">Financial Year</label>
          <select id="a-fy" className="input text-sm py-2" value={filters.fy} onChange={(e) => setFilters({ ...filters, fy: e.target.value })}>
            {financialYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="label text-xs" htmlFor="a-dist">District</label>
          <select id="a-dist" className="input text-sm py-2" value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })}>
            <option value="">All Districts</option>
            {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label text-xs" htmlFor="a-dept">Department</label>
          <select id="a-dept" className="input text-sm py-2" value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
            <option value="">All Departments</option>
            {[...new Set(allProjects.map((p) => p.department))].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="label text-xs" htmlFor="a-type">Project Type</label>
          <select id="a-type" className="input text-sm py-2" value={filters.projectType} onChange={(e) => setFilters({ ...filters, projectType: e.target.value })}>
            <option value="">All Types</option>
            {['Infrastructure', 'Education', 'Healthcare', 'Water Supply', 'Rural Development'].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Budget Allocated" value={formatINR(totalBudget)} icon={<Wallet className="w-5 h-5" />} accent="primary" />
        <StatCard label="Total Funds Spent" value={formatINR(totalSpent)} icon={<TrendingUp className="w-5 h-5" />} accent="secondary" />
        <StatCard label="Utilization Rate" value={`${utilizationRate}%`} icon={<Percent className="w-5 h-5" />} accent="success" />
        <StatCard label="Delayed Projects" value={String(delayed)} icon={<AlertTriangle className="w-5 h-5" />} accent="warning" />
        <StatCard label="Flagged Projects" value={String(flagged)} icon={<Flag className="w-5 h-5" />} accent="error" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-ink mb-4 text-sm">Monthly Fund Utilization</h3>
          <MonthlyUtilizationChart data={monthlyData} />
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink mb-4 text-sm">Allocated vs Spent (by Quarter)</h3>
          <AllocatedVsSpentChart data={[
            { name: 'Q1', allocated: 1410, spent: 1090 },
            { name: 'Q2', allocated: 1810, spent: 1420 },
            { name: 'Q3', allocated: 1910, spent: 1500 },
          ]} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-ink mb-4 text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Department Expenditure</h3>
          <DepartmentDonutChart data={deptData} />
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-ink mb-4 text-sm">Projects by Status</h3>
          <StatusPieChart data={statusData} />
        </div>
      </div>

      {/* District Comparison */}
      <div className="card p-5">
        <h3 className="font-bold text-ink mb-4 text-sm">District Comparison</h3>
        <DistrictComparisonChart data={districtData} />
      </div>
    </div>
  );
}
