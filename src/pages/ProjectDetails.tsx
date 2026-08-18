import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Calendar, FileText, ShieldCheck, AlertTriangle, Upload, Download, Loader2 } from 'lucide-react';
import { formatINR, formatINRFull, formatDate } from '@/utils/currency';
import { detectAnomalies } from '@/services/anomalyDetection';
import StatusBadge from '@/components/StatusBadge';
import Timeline from '@/components/Timeline';
import PaymentTable from '@/components/PaymentTable';
import BlockchainCard from '@/components/BlockchainCard';
import EvidenceGallery from '@/components/EvidenceGallery';
import AnomalyAlert from '@/components/AnomalyAlert';
import { ExpenditureDonut } from '@/components/Charts';
import { useToast } from '@/services/ToastContext';
import { useState, useEffect } from 'react';
import { fetchProjectById } from '@/services/api';
import type { Project } from '@/data/types';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [project, setProject] = useState<Project | undefined | null>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProjectById(id).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="card p-12 text-center">
        <p className="text-ink font-semibold text-lg">Project not found</p>
        <p className="text-sm text-ink-secondary mt-1">The project ID "{id}" does not exist.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary mt-4">Back to Dashboard</button>
      </div>
    );
  }

  const anomalies = detectAnomalies(project);
  const financials = [
    { label: 'Approved Budget', value: formatINR(project.budget), color: 'text-ink' },
    { label: 'Funds Released', value: formatINR(project.fundsReleased), color: 'text-primary' },
    { label: 'Total Spent', value: formatINR(project.spent), color: 'text-secondary' },
    { label: 'Remaining Balance', value: formatINR(project.remaining), color: project.remaining < 0 ? 'text-error' : 'text-success' },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">{project.id}</span>
              <StatusBadge status={project.status} size="md" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-ink tracking-tight">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-ink-secondary">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location.village ? `${project.location.village}, ` : ''}{project.district} District</span>
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {project.department}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Started {formatDate(project.startDate)}</span>
            </div>
          </div>
          <div className="lg:text-right">
            <p className="text-xs text-ink-secondary">Overall Progress</p>
            <p className="text-3xl font-bold text-secondary">{project.progress}%</p>
            <div className="w-full lg:w-48 h-2 bg-surface-mid rounded-full overflow-hidden mt-2">
              <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly Detection */}
      {anomalies.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-ink flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-warning" /> Smart Anomaly Detection</h2>
          {anomalies.map((a) => (
            <AnomalyAlert
              key={a.id}
              anomaly={a}
              onReport={() => navigate('/feedback')}
              onAudit={() => toast('info', `Audit log for ${project.id}: ${a.title} — Full audit trail available in ledger view.`)}
            />
          ))}
        </div>
      )}

      {/* Project Overview */}
      <div className="card p-6">
        <h2 className="font-bold text-ink mb-4">Project Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <p className="text-sm text-ink-secondary leading-relaxed">{project.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div><p className="text-xs text-ink-secondary">Contractor</p><p className="text-sm font-medium text-ink mt-0.5">{project.contractor}</p></div>
              <div><p className="text-xs text-ink-secondary">Category</p><p className="text-sm font-medium text-ink mt-0.5">{project.category}</p></div>
              <div><p className="text-xs text-ink-secondary">Start Date</p><p className="text-sm font-medium text-ink mt-0.5">{formatDate(project.startDate)}</p></div>
              <div><p className="text-xs text-ink-secondary">Est. Completion</p><p className="text-sm font-medium text-ink mt-0.5">{formatDate(project.estimatedCompletion)}</p></div>
            </div>
          </div>
          <div className="bg-surface-low rounded-xl p-4">
            <p className="text-xs text-ink-secondary mb-3">Financial Progress vs Physical Progress</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-ink-secondary">Physical</span><span className="font-bold text-ink">{project.progress}%</span></div>
                <div className="h-2 bg-surface-mid rounded-full overflow-hidden"><div className="h-full bg-secondary rounded-full" style={{ width: `${project.progress}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-ink-secondary">Financial</span><span className="font-bold text-ink">{project.financialProgress}%</span></div>
                <div className="h-2 bg-surface-mid rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${project.financialProgress}%` }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financials.map((f) => (
          <div key={f.label} className="card p-5">
            <p className="text-xs text-ink-secondary font-medium">{f.label}</p>
            <p className={`text-xl font-bold mt-1.5 ${f.color}`}>{f.value}</p>
            <p className="text-[11px] text-outline mt-1">{formatINRFull(f.label === 'Approved Budget' ? project.budget : f.label === 'Funds Released' ? project.fundsReleased : f.label === 'Total Spent' ? project.spent : project.remaining)}</p>
          </div>
        ))}
      </div>

      {/* Expenditure Breakdown */}
      <div className="card p-6">
        <h2 className="font-bold text-ink mb-4">Expenditure Breakdown</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ExpenditureDonut data={project.expenditureBreakdown} />
          <div className="space-y-3">
            {project.expenditureBreakdown.map((e, i) => {
              const pct = ((e.value / project.spent) * 100).toFixed(1);
              const colors = ['#00355F', '#006A6A', '#0F4C81', '#90EFEF'];
              return (
                <div key={e.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: colors[i % colors.length] }} />
                    <span className="text-sm font-medium text-ink">{e.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-ink">{formatINR(e.value)}</span>
                    <span className="text-xs text-ink-secondary ml-2">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h2 className="font-bold text-ink mb-3">Recipient / Payment Information</h2>
        <PaymentTable payments={project.payments} />
      </div>

      {/* Execution Timeline */}
      <div className="card p-6">
        <h2 className="font-bold text-ink mb-6">Execution Timeline</h2>
        <Timeline milestones={project.milestones} />
      </div>

      {/* Blockchain + Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
          <BlockchainCard record={project.blockchainRecord} onViewLedger={() => toast('info', 'Opening complete ledger view...')} />
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-ink flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Project Evidence</h2>
            <button onClick={() => setShowUpload(!showUpload)} className="btn-secondary text-xs py-2 px-3">
              <Upload className="w-3.5 h-3.5" /> Upload Evidence
            </button>
          </div>
          {showUpload && (
            <div className="card p-4 mb-4 animate-fade-in">
              <div className="border-2 border-dashed border-surface-high rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-outline mx-auto mb-2" />
                <p className="text-sm text-ink-secondary">Drop geotagged photos, documents, or receipts here</p>
                <p className="text-xs text-outline mt-1">JPG, PNG, PDF up to 10MB</p>
              </div>
            </div>
          )}
          <EvidenceGallery items={[...project.evidence, ...project.documents]} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/feedback')} className="btn-outline">
          <AlertTriangle className="w-4 h-4" /> Report Issue
        </button>
        <button onClick={() => toast('success', 'Project report downloaded successfully.')} className="btn-outline">
          <Download className="w-4 h-4" /> Export Report
        </button>
        <button onClick={() => navigate('/funds')} className="btn-primary">
          <ShieldCheck className="w-4 h-4" /> View Fund Tracking
        </button>
      </div>
    </div>
  );
}
