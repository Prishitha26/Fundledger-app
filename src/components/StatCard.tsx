import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: { value: string; up: boolean };
  accent?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const accentMap = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
};

export default function StatCard({ label, value, icon, trend, accent = 'primary' }: StatCardProps) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-secondary font-medium">{label}</p>
          <p className="text-2xl font-bold text-ink mt-1.5 tracking-tight">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 mt-3 text-xs">
          {trend.up ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-error" />
          )}
          <span className={trend.up ? 'text-success font-medium' : 'text-error font-medium'}>{trend.value}</span>
          <span className="text-ink-secondary">vs last quarter</span>
        </div>
      )}
    </div>
  );
}
