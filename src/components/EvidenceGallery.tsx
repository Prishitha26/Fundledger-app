import { FileText, Image, Receipt, ClipboardCheck, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { formatDate } from '@/utils/currency';
import type { EvidenceItem } from '@/data/types';

const typeIcon = {
  Photo: Image,
  Document: FileText,
  Receipt: Receipt,
  Audit: ClipboardCheck,
};

export default function EvidenceGallery({ items }: { items: EvidenceItem[] }) {
  if (items.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-ink-secondary text-sm">No evidence documents uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const Icon = typeIcon[item.type];
        return (
          <div key={item.id} className="card card-hover p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm text-ink">{item.title}</h4>
                <span className="inline-block text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded mt-1">{item.type}</span>
              </div>
              {item.verified ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" /> Pending
                </span>
              )}
            </div>
            <div className="mt-3 space-y-1 text-xs text-ink-secondary">
              <p>Uploaded: {formatDate(item.uploadDate)}</p>
              <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</p>
              <p>By: {item.uploadedBy}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
