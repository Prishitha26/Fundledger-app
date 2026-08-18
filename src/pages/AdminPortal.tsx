import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CheckCircle2, CreditCard, MessageSquareWarning, Building2, Wallet, AlertTriangle, Clock, FileText, X, Loader2 } from 'lucide-react';
import { detectAnomalies } from '@/services/anomalyDetection';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { formatINR, formatDate } from '@/utils/currency';
import { useToast } from '@/services/ToastContext';
import { useAuth } from '@/services/AuthContext';
import { fetchProjects, fetchComplaints, insertProject, updateMilestone, updatePaymentStatus } from '@/services/api';
import type { Project, Complaint } from '@/data/types';

export default function AdminPortal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [modal, setModal] = useState<'add-project' | 'update-milestone' | 'verify-payment' | 'review-complaints' | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    Promise.all([fetchProjects(), fetchComplaints()]).then(([p, c]) => {
      setProjects(p);
      setComplaints(c);
      setLoading(false);
    });
  }, [refreshKey]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="card p-12 text-center max-w-md mx-auto">
        <Building2 className="w-12 h-12 text-outline mx-auto mb-3" />
        <h2 className="text-xl font-bold text-ink">Admin Access Required</h2>
        <p className="text-sm text-ink-secondary mt-1 mb-4">Please sign in with an admin account to access the control center.</p>
        <button onClick={() => navigate('/login')} className="btn-primary">Sign In as Admin</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const totalOutlay = projects.reduce((s, p) => s + p.budget, 0);
  const pendingComplaints = complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected').length;
  const unverifiedMilestones = projects.reduce((s, p) => s + p.milestones.filter((m) => !m.verified && m.status !== 'Pending').length, 0);
  const allAnomalies = projects.flatMap((p) => detectAnomalies(p).map((a) => ({ ...a, projectName: p.name, projectId: p.id })));

  const recentActivity = [
    { icon: CheckCircle2, text: 'Milestone Verified — Sub-Grade Preparation (PRJ-KRI-2024-892)', time: '2 hours ago', color: 'text-success' },
    { icon: FileText, text: 'Document Uploaded — Site Survey Report (PRJ-KRI-2024-892)', time: '5 hours ago', color: 'text-primary' },
    { icon: AlertTriangle, text: 'Alert Flagged — Budget Overrun (PRJ-MAD-2024-345)', time: '1 day ago', color: 'text-error' },
    { icon: CreditCard, text: 'Payment Disbursed — ₹22.5 L to Shakti Equipment (PRJ-KRI-2024-892)', time: '2 days ago', color: 'text-secondary' },
  ];

  const quickActions = [
    { label: 'Add New Project', icon: Plus, action: () => setModal('add-project') },
    { label: 'Update Milestone', icon: Clock, action: () => setModal('update-milestone') },
    { label: 'Verify Payment', icon: CreditCard, action: () => setModal('verify-payment') },
    { label: 'Review Complaints', icon: MessageSquareWarning, action: () => setModal('review-complaints') },
  ];

  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Admin Control Center</h1>
        <p className="section-subtitle mt-1">Manage projects, verify milestones, review complaints, and monitor anomalies.</p>
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Managed Projects" value={String(projects.length)} icon={<Building2 className="w-5 h-5" />} accent="primary" />
        <StatCard label="Total Outlay" value={formatINR(totalOutlay)} icon={<Wallet className="w-5 h-5" />} accent="secondary" />
        <StatCard label="Pending Complaints" value={String(pendingComplaints)} icon={<MessageSquareWarning className="w-5 h-5" />} accent="warning" />
        <StatCard label="Unverified Milestones" value={String(unverifiedMilestones)} icon={<Clock className="w-5 h-5" />} accent="error" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-bold text-ink mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} onClick={a.action} className="card card-hover p-5 text-left hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm text-ink">{a.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Anomaly Monitor */}
      {allAnomalies.length > 0 && (
        <div>
          <h2 className="font-bold text-ink mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-warning" /> Anomaly Monitor</h2>
          <div className="space-y-2">
            {allAnomalies.slice(0, 4).map((a) => (
              <div key={a.id} className="card p-4 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.severity === 'high' ? 'bg-error' : a.severity === 'medium' ? 'bg-warning' : 'bg-primary'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink">{a.title}</p>
                  <p className="text-xs text-ink-secondary mt-0.5">{a.projectName} · {a.description.slice(0, 80)}...</p>
                </div>
                <button onClick={() => navigate(`/projects/${a.projectId}`)} className="text-xs text-primary font-medium hover:underline flex-shrink-0">View</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Projects Table */}
      <div>
        <h2 className="font-bold text-ink mb-3">Active Projects</h2>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-low text-left text-ink-secondary">
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Milestone</th>
                  <th className="px-4 py-3 font-semibold">Budget</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter((p) => p.status !== 'Completed').map((p) => {
                  const current = p.milestones.find((m) => m.status === 'In Progress');
                  return (
                    <tr key={p.id} className="border-t border-surface-mid hover:bg-surface-low transition-colors">
                      <td className="px-4 py-3 font-semibold text-ink">{p.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-primary">{p.id}</td>
                      <td className="px-4 py-3 text-ink-secondary">{p.district}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{current?.name ?? '—'}</td>
                      <td className="px-4 py-3 font-semibold text-ink">{formatINR(p.budget)}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => navigate(`/projects/${p.id}`)} className="text-primary text-xs font-medium hover:underline">Manage</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-bold text-ink mb-3">Recent Activity</h2>
        <div className="card p-5 space-y-3">
          {recentActivity.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-surface-mid last:border-0">
                <Icon className={`w-4 h-4 ${a.color} flex-shrink-0`} />
                <p className="text-sm text-ink flex-1">{a.text}</p>
                <span className="text-xs text-ink-secondary flex-shrink-0">{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <Modal onClose={() => setModal(null)} title={quickActions.find((q) => q.label === modal.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase()))?.label ?? modal}>
          {modal === 'add-project' && <AddProjectForm onSubmit={async (data) => {
            const result = await insertProject(data);
            if (result.success) { toast('success', 'Project added successfully.'); setModal(null); refresh(); }
            else toast('error', `Failed: ${result.error}`);
          }} />}
          {modal === 'update-milestone' && <UpdateMilestoneForm projects={projects} onSubmit={async (milestoneId, updates) => {
            const result = await updateMilestone(milestoneId, updates);
            if (result.success) { toast('success', 'Milestone updated and verified.'); setModal(null); refresh(); }
            else toast('error', `Failed: ${result.error}`);
          }} />}
          {modal === 'verify-payment' && <VerifyPaymentForm projects={projects} onSubmit={async (paymentId, status) => {
            const result = await updatePaymentStatus(paymentId, status);
            if (result.success) { toast('success', 'Payment verified successfully.'); setModal(null); refresh(); }
            else toast('error', `Failed: ${result.error}`);
          }} />}
          {modal === 'review-complaints' && (
            <div className="space-y-3">
              {complaints.filter((c) => c.status !== 'Resolved').length === 0 ? (
                <p className="text-sm text-ink-secondary text-center py-4">No pending complaints.</p>
              ) : (
                complaints.filter((c) => c.status !== 'Resolved').map((c) => (
                  <div key={c.id} className="border border-surface-mid rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-primary">{c.trackingId}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="text-sm font-medium text-ink">{c.projectName}</p>
                    <p className="text-xs text-ink-secondary mt-1">{c.issueType} · {c.location}</p>
                    <p className="text-xs text-ink-secondary mt-1">{c.description.slice(0, 100)}...</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => toast('success', `Complaint ${c.trackingId} marked as investigating.`)} className="text-xs text-primary font-medium hover:underline">Investigate</button>
                      <button onClick={() => toast('success', `Complaint ${c.trackingId} resolved.`)} className="text-xs text-success font-medium hover:underline">Resolve</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 animate-fade-in" onClick={onClose}>
      <div className="bg-surface rounded-2xl shadow-card-hover max-w-lg w-full max-h-[80vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-mid sticky top-0 bg-surface">
          <h3 className="font-bold text-ink">{title}</h3>
          <button onClick={onClose} className="text-outline hover:text-ink" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function AddProjectForm({ onSubmit }: { onSubmit: (data: { id: string; name: string; description: string; district: string; department: string; category: string; budget: number; contractor?: string; lat: number; lng: number }) => Promise<void> }) {
  const [form, setForm] = useState({
    name: '', description: '', district: 'Krishnagiri', department: 'Public Works Department',
    category: 'Infrastructure', budget: '', contractor: '',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PRJ-${form.district.slice(0, 3).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(Math.random() * 999)}`;
    onSubmit({
      id, name: form.name, description: form.description, district: form.district,
      department: form.department, category: form.category, budget: parseInt(form.budget) || 0,
      contractor: form.contractor || undefined, lat: 12.5266, lng: 78.2150,
    });
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div><label className="label">Project Name</label><input className="input" placeholder="e.g. Village Road Development" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">District</label><select className="input" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })}><option>Krishnagiri</option><option>Chennai</option><option>Coimbatore</option><option>Madurai</option><option>Salem</option><option>Thanjavur</option><option>Kanchipuram</option></select></div>
        <div><label className="label">Department</label><select className="input" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}><option>Public Works Department</option><option>Department of School Education</option><option>Department of Health & Family Welfare</option><option>Department of Rural Development</option><option>Tamil Nadu Water Supply & Drainage Board</option><option>Highways Department</option></select></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Budget (₹)</label><input type="number" className="input" placeholder="5000000" required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></div>
        <div><label className="label">Category</label><select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Infrastructure</option><option>Education</option><option>Healthcare</option><option>Water Supply</option><option>Rural Development</option></select></div>
      </div>
      <div><label className="label">Contractor</label><input className="input" placeholder="Contractor name (optional)" value={form.contractor} onChange={(e) => setForm({ ...form, contractor: e.target.value })} /></div>
      <div><label className="label">Description</label><textarea className="input resize-none" rows={3} placeholder="Project description..." required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
      <button type="submit" className="btn-primary w-full">Create Project</button>
    </form>
  );
}

function UpdateMilestoneForm({ projects, onSubmit }: { projects: Project[]; onSubmit: (milestoneId: string, updates: { progress?: number; status?: string; verified?: boolean }) => Promise<void> }) {
  const [projectId, setProjectId] = useState(projects[0]?.id ?? '');
  const project = projects.find((p) => p.id === projectId);
  const milestones = project?.milestones ?? [];
  const [milestoneId, setMilestoneId] = useState(milestones[0]?.id ?? '');
  const [progress, setProgress] = useState('65');
  const [verified, setVerified] = useState(true);
  const currentMilestone = milestones.find((m) => m.id === milestoneId);

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(milestoneId, { progress: parseInt(progress), status: currentMilestone?.status, verified }); }}>
      <div><label className="label">Select Project</label><select className="input" value={projectId} onChange={(e) => { setProjectId(e.target.value); const p = projects.find((p) => p.id === e.target.value); if (p) setMilestoneId(p.milestones[0]?.id ?? ''); }}>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
      <div><label className="label">Milestone</label><select className="input" value={milestoneId} onChange={(e) => setMilestoneId(e.target.value)}>{milestones.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
      <div><label className="label">Progress (%)</label><input type="number" className="input" value={progress} min={0} max={100} onChange={(e) => setProgress(e.target.value)} /></div>
      <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} /> Mark as verified</label>
      <button type="submit" className="btn-primary w-full">Update & Verify</button>
    </form>
  );
}

function VerifyPaymentForm({ projects, onSubmit }: { projects: Project[]; onSubmit: (paymentId: string, status: string) => Promise<void> }) {
  const allPayments = projects.flatMap((p) => p.payments.filter((pay) => pay.status !== 'Cleared').map((pay) => ({ ...pay, projectName: p.name })));
  const [paymentId, setPaymentId] = useState(allPayments[0]?.id ?? '');
  const [status, setStatus] = useState('Cleared');
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(paymentId, status); }}>
      <div><label className="label">Select Payment</label><select className="input" value={paymentId} onChange={(e) => setPaymentId(e.target.value)}>{allPayments.map((p) => <option key={p.id} value={p.id}>{p.recipient} — ₹{(p.amount / 100000).toFixed(1)}L ({p.projectName})</option>)}</select></div>
      <div><label className="label">Verification Status</label><select className="input" value={status} onChange={(e) => setStatus(e.target.value)}><option>Cleared</option><option>Flagged</option><option>Pending</option></select></div>
      <div><label className="label">Verification Notes</label><textarea className="input resize-none" rows={2} placeholder="Verification comments..." /></div>
      <button type="submit" className="btn-primary w-full">Verify Payment</button>
    </form>
  );
}
