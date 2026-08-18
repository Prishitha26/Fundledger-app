import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, Paperclip } from 'lucide-react';
import { projects } from '@/data/projects';
import { generateTrackingId } from '@/utils/currency';
import { useToast } from '@/services/ToastContext';
import { useAuth } from '@/services/AuthContext';
import { insertComplaint } from '@/services/api';
import type { IssueType } from '@/data/types';

const issueTypes: IssueType[] = ['Financial Irregularity', 'Poor Material Quality', 'Unexplained Delay', 'Project Abandoned', 'Other'];

export default function ComplaintForm({ defaultProjectId }: { defaultProjectId?: string }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ trackingId: string } | null>(null);
  const [form, setForm] = useState({
    projectId: defaultProjectId ?? '',
    issueType: '' as IssueType | '',
    location: '',
    description: '',
    evidence: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.projectId) e.projectId = 'Please select a project';
    if (!form.issueType) e.issueType = 'Please select an issue type';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.description.trim() || form.description.length < 20) e.description = 'Please provide at least 20 characters of detail';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const trackingId = generateTrackingId();
    const selectedProject = projects.find((p) => p.id === form.projectId);

    if (user) {
      const result = await insertComplaint({
        projectId: form.projectId,
        projectName: selectedProject?.name ?? '',
        issueType: form.issueType as string,
        location: form.location,
        description: form.description,
        evidence: form.evidence || undefined,
        trackingId,
      });
      if (!result.success) {
        toast('error', `Failed to submit: ${result.error}`);
        setSubmitting(false);
        return;
      }
    }

    setSubmitted({ trackingId });
    toast('success', `Report submitted. Tracking ID: ${trackingId}`);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="card p-8 text-center max-w-2xl mx-auto animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold text-ink mb-2">Report Submitted Successfully</h3>
        <p className="text-ink-secondary text-sm mb-4">Your report has been securely recorded and cannot be silently deleted.</p>
        <div className="inline-block bg-surface-low rounded-lg px-6 py-3 mb-6">
          <p className="text-xs text-ink-secondary font-medium">Your Tracking ID</p>
          <p className="text-2xl font-bold text-primary font-mono mt-1">{submitted.trackingId}</p>
        </div>
        <p className="text-xs text-ink-secondary mb-6">Use this ID to track the status of your report. You can view it anytime under "My Reports".</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate('/feedback')} className="btn-primary">View My Reports</button>
          <button onClick={() => { setSubmitted(null); setForm({ projectId: '', issueType: '', location: '', description: '', evidence: '' }); }} className="btn-outline">File Another</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 max-w-2xl mx-auto space-y-5">
      <div>
        <label className="label" htmlFor="projectId">Select Project <span className="text-error">*</span></label>
        <select
          id="projectId"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
          className="input"
          aria-invalid={!!errors.projectId}
        >
          <option value="">Choose a project...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name} — {p.district}</option>
          ))}
        </select>
        {errors.projectId && <p className="text-xs text-error mt-1">{errors.projectId}</p>}
      </div>

      <div>
        <label className="label" htmlFor="issueType">Issue Type <span className="text-error">*</span></label>
        <select
          id="issueType"
          value={form.issueType}
          onChange={(e) => setForm({ ...form, issueType: e.target.value as IssueType })}
          className="input"
          aria-invalid={!!errors.issueType}
        >
          <option value="">Select issue type...</option>
          {issueTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.issueType && <p className="text-xs text-error mt-1">{errors.issueType}</p>}
      </div>

      <div>
        <label className="label" htmlFor="location">Location <span className="text-error">*</span></label>
        <input
          id="location"
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="e.g. Denkanikottai, Krishnagiri"
          className="input"
          aria-invalid={!!errors.location}
        />
        {errors.location && <p className="text-xs text-error mt-1">{errors.location}</p>}
      </div>

      <div>
        <label className="label" htmlFor="description">Detailed Description <span className="text-error">*</span></label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the issue in detail (minimum 20 characters)..."
          rows={4}
          className="input resize-none"
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="text-xs text-error mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="label" htmlFor="evidence">Upload Evidence (optional)</label>
        <div className="border-2 border-dashed border-surface-high rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer">
          <Paperclip className="w-5 h-5 text-outline mx-auto mb-1" />
          <p className="text-xs text-ink-secondary">Click to upload photos, documents, or receipts</p>
          <input id="evidence" type="file" className="hidden" onChange={(e) => setForm({ ...form, evidence: e.target.files?.[0]?.name ?? '' })} />
          {form.evidence && <p className="text-xs text-primary mt-1 font-medium">{form.evidence}</p>}
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        <Send className="w-4 h-4" />
        {submitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
}
