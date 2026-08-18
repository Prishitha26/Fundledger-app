import { useState, useMemo, useEffect } from 'react';
import { Download, FileText, Receipt, ArrowDownToLine, ArrowUpFromLine, Loader2 } from 'lucide-react';
import FundFlow from '@/components/FundFlow';
import { formatINR, formatDate } from '@/utils/currency';
import { useToast } from '@/services/ToastContext';
import { fetchProjects } from '@/services/api';
import type { Project } from '@/data/types';

export default function FundTracking() {
  const { toast } = useToast();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetchProjects().then((data) => {
      setAllProjects(data);
      if (data.length > 0) setSelectedId(data[0].id);
      setLoading(false);
    });
  }, []);

  const project = useMemo(() => allProjects.find((p) => p.id === selectedId), [allProjects, selectedId]);

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const transactions = project.payments.map((p, i) => ({
    id: p.transactionId,
    date: p.date,
    recipient: p.recipient,
    amountIn: i === 0 ? project.fundsReleased : 0,
    amountOut: p.amount,
    status: p.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="section-title">Follow the Money Trail</h1>
          <p className="section-subtitle mt-1">Trace exactly how public funds move from central allocation to local execution for complete transparency.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="input max-w-xs" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {allProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button onClick={() => toast('success', 'Fund tracking report exported as CSV.')} className="btn-primary flex-shrink-0">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Fund flow timeline */}
      <div className="card p-6">
        <h2 className="font-bold text-ink mb-5">Fund Flow Timeline</h2>
        <FundFlow project={project} />
      </div>

      {/* Transaction Log */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-mid">
          <h2 className="font-bold text-ink">Transaction Log</h2>
          <p className="text-xs text-ink-secondary mt-0.5">Every fund movement recorded with transaction ID</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-low text-left text-ink-secondary">
                <th className="px-4 py-3 font-semibold">Transaction ID</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Recipient</th>
                <th className="px-4 py-3 font-semibold">Amount In</th>
                <th className="px-4 py-3 font-semibold">Amount Out</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t border-surface-mid hover:bg-surface-low transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{t.id}</td>
                  <td className="px-4 py-3 text-ink-secondary">{formatDate(t.date)}</td>
                  <td className="px-4 py-3 font-medium text-ink">{t.recipient}</td>
                  <td className="px-4 py-3">
                    {t.amountIn > 0 ? (
                      <span className="flex items-center gap-1 text-success font-medium"><ArrowDownToLine className="w-3.5 h-3.5" />{formatINR(t.amountIn)}</span>
                    ) : <span className="text-outline">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    {t.amountOut > 0 ? (
                      <span className="flex items-center gap-1 text-error font-medium"><ArrowUpFromLine className="w-3.5 h-3.5" />{formatINR(t.amountOut)}</span>
                    ) : <span className="text-outline">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenditure Breakdown + Audit Docs + Site Update */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-ink mb-3 text-sm">Expenditure Breakdown</h3>
          <div className="space-y-2.5">
            {project.expenditureBreakdown.map((e, i) => (
              <div key={e.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink-secondary">{e.name}</span>
                  <span className="font-medium text-ink">{formatINR(e.value)}</span>
                </div>
                <div className="h-1.5 bg-surface-mid rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(e.value / project.spent) * 100}%`, background: ['#00355F', '#006A6A', '#0F4C81', '#90EFEF'][i % 4] }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-ink mb-3 text-sm flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Audit Documents</h3>
          <div className="space-y-2">
            {project.documents.map((d) => (
              <div key={d.id} className="flex items-center gap-2 text-sm py-1.5 border-b border-surface-mid last:border-0">
                <Receipt className="w-4 h-4 text-outline flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">{d.title}</p>
                  <p className="text-xs text-ink-secondary">{formatDate(d.uploadDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-ink mb-3 text-sm">Latest Site Update</h3>
          {project.evidence.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-ink">{project.evidence[project.evidence.length - 1].title}</p>
              <p className="text-xs text-ink-secondary mt-1">{project.evidence[project.evidence.length - 1].location}</p>
              <p className="text-xs text-ink-secondary mt-1">Uploaded: {formatDate(project.evidence[project.evidence.length - 1].uploadDate)}</p>
              <div className="mt-3 p-3 bg-surface-low rounded-lg">
                <p className="text-xs text-ink-secondary">Current Milestone</p>
                <p className="text-sm font-semibold text-secondary mt-0.5">{project.milestones.find((m) => m.status === 'In Progress')?.name ?? 'N/A'}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-secondary">No updates available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
