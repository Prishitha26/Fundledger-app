import { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquareWarning, Loader2 } from 'lucide-react';
import ComplaintForm from '@/components/ComplaintForm';
import StatusBadge from '@/components/StatusBadge';
import { formatDate } from '@/utils/currency';
import { fetchComplaints } from '@/services/api';
import type { Complaint } from '@/data/types';

export default function Feedback() {
  const [tab, setTab] = useState<'submit' | 'reports'>('submit');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === 'reports') {
      setLoading(true);
      fetchComplaints().then((data) => {
        setComplaints(data);
        setLoading(false);
      });
    }
  }, [tab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">See Something Wrong? Speak Up.</h1>
        <p className="section-subtitle mt-1 max-w-2xl">Your vigilance ensures public funds are used correctly. Report discrepancies in project quality, delays, or financial irregularities securely.</p>
      </div>

      {/* Security banner */}
      <div className="card p-4 flex items-center gap-3 bg-secondary/5 border-secondary/20">
        <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
        <p className="text-sm text-ink-secondary">
          All reports are <strong className="text-ink">securely recorded on a simulated blockchain ledger</strong> and cannot be silently deleted. Your identity is protected.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-surface-low rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab('submit')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === 'submit' ? 'bg-surface text-primary shadow-sm' : 'text-ink-secondary hover:text-ink'}`}
        >
          Submit Report
        </button>
        <button
          onClick={() => setTab('reports')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === 'reports' ? 'bg-surface text-primary shadow-sm' : 'text-ink-secondary hover:text-ink'}`}
        >
          My Reports ({complaints.length})
        </button>
      </div>

      {tab === 'submit' ? (
        <ComplaintForm />
      ) : (
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : complaints.length === 0 ? (
            <div className="card p-12 text-center">
              <MessageSquareWarning className="w-10 h-10 text-outline mx-auto mb-3" />
              <p className="text-ink font-semibold">No reports filed yet</p>
              <p className="text-sm text-ink-secondary mt-1">Submit a report to see it appear here.</p>
            </div>
          ) : (
            complaints.map((c) => (
              <div key={c.id} className="card card-hover p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">{c.trackingId}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <h3 className="font-semibold text-ink text-sm">{c.projectName}</h3>
                    <p className="text-xs text-ink-secondary mt-1">Issue: {c.issueType}</p>
                    <p className="text-xs text-ink-secondary mt-1">Location: {c.location}</p>
                    <p className="text-sm text-ink mt-2 leading-relaxed">{c.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-ink-secondary">Filed on</p>
                    <p className="text-sm font-medium text-ink">{formatDate(c.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
