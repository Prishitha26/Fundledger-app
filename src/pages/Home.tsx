import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, Building2, CheckCircle2, Eye, Scale, Globe2, ArrowRight, MapPin, Quote } from 'lucide-react';
import { useLanguage } from '@/services/LanguageContext';
import { fetchProjects } from '@/services/api';
import { formatINR } from '@/utils/currency';
import type { Project } from '@/data/types';

export default function Home() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const totalAllocated = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const activeProjects = projects.filter((p) => p.status === 'In Progress' || p.status === 'Delayed' || p.status === 'Flagged' || p.status === 'Planned').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;

  const stats = [
    { label: t('home.totalAllocated'), value: projects.length > 0 ? `${formatINR(totalAllocated)}+` : '₹5,000 Cr+', icon: Wallet, accent: 'primary' as const },
    { label: t('home.totalSpent'), value: projects.length > 0 ? `${formatINR(totalSpent)}+` : '₹3,200 Cr+', icon: TrendingUp, accent: 'secondary' as const },
    { label: t('home.activeProjects'), value: projects.length > 0 ? String(activeProjects) : '1,240', icon: Building2, accent: 'warning' as const },
    { label: t('home.completedProjects'), value: projects.length > 0 ? String(completedProjects) : '8,500', icon: CheckCircle2, accent: 'success' as const },
  ];

  const features = [
    { icon: Eye, title: t('home.transparencyTitle'), desc: t('home.transparencyDesc') },
    { icon: Scale, title: t('home.accountabilityTitle'), desc: t('home.accountabilityDesc') },
    { icon: Globe2, title: t('home.accessibilityTitle'), desc: t('home.accessibilityDesc') },
  ];

  const testimonials = [
    { name: 'Lakshmi N.', role: 'Resident, Denkanikottai', text: 'For the first time, I can see exactly how much was spent on the road near my house and who was paid. This is real transparency.' },
    { name: 'Rajesh K.', role: 'RTI Activist, Madurai', text: 'FundLedger replaced weeks of RTI applications with a few clicks. The anomaly detection flagged issues I had been chasing for months.' },
    { name: 'Priya S.', role: 'Teacher, Shoolagiri', text: 'I tracked every stage of our school upgradation project. When work stalled, I filed a complaint and got a tracking ID instantly.' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white px-6 py-16 lg:px-12 lg:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            Live Transparency Platform · Government of Tamil Nadu
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">{t('home.heroTitle')}</h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">{t('home.heroDesc')}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/map" className="btn bg-white text-primary hover:bg-white/90 px-6 py-3 text-base">
              {t('home.exploreProjects')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/funds" className="btn bg-white/10 backdrop-blur text-white border border-white/20 hover:bg-white/15 px-6 py-3 text-base">
              {t('home.trackFunds')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const accentClasses = {
            primary: 'bg-primary/10 text-primary',
            secondary: 'bg-secondary/10 text-secondary',
            warning: 'bg-warning/10 text-warning',
            success: 'bg-success/10 text-success',
          };
          return (
            <div key={s.label} className="card p-5">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 ${accentClasses[s.accent]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-ink tracking-tight">{s.value}</p>
              <p className="text-sm text-ink-secondary mt-1">{s.label}</p>
            </div>
          );
        })}
      </section>

      {/* Features */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-ink tracking-tight mb-3">Built for Citizen Trust</h2>
          <p className="text-ink-secondary">Three pillars that make public spending understandable for everyone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card card-hover p-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-ink tracking-tight mb-3">Voices from the Ground</h2>
          <p className="text-ink-secondary">Real citizens. Real transparency. Real impact.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((tm) => (
            <div key={tm.name} className="card p-6">
              <Quote className="w-8 h-8 text-secondary/30 mb-3" />
              <p className="text-sm text-ink leading-relaxed mb-4">"{tm.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-surface-mid">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {tm.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-ink">{tm.name}</p>
                  <p className="text-xs text-ink-secondary">{tm.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="card p-8 lg:p-12 text-center bg-gradient-to-br from-surface-low to-surface-mid border-surface-high">
        <MapPin className="w-10 h-10 text-secondary mx-auto mb-4" />
        <h2 className="text-2xl lg:text-3xl font-bold text-ink mb-3">{t('home.ctaReady')}</h2>
        <p className="text-ink-secondary mb-6 max-w-xl mx-auto">Explore projects, track funds, and see exactly where your tax money goes — across every district.</p>
        <Link to="/map" className="btn-primary text-base px-6 py-3">
          {t('home.openMap')} <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
