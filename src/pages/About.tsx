import { Landmark, Eye, Scale, Globe2, ShieldCheck, FileText, Map, Wallet, BarChart3, MessageSquareWarning, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const features = [
    { icon: Eye, title: 'Complete Transparency', desc: 'Track every rupee from initial allocation to final disbursement with full audit trails.' },
    { icon: Scale, title: 'Strict Accountability', desc: 'View project timelines, departments, contractors, delays, and financial information in one place.' },
    { icon: Globe2, title: 'Universal Accessibility', desc: 'Convert complicated financial information into simple visual information anyone can understand.' },
    { icon: ShieldCheck, title: 'Blockchain Verification', desc: 'Financial records are immutably logged, ensuring they cannot be altered or deleted silently.' },
    { icon: BarChart3, title: 'Analytics Engine', desc: 'Real-time tracking of public expenditure with automated anomaly detection.' },
    { icon: MessageSquareWarning, title: 'Public Feedback', desc: 'Citizens can report discrepancies securely with guaranteed tracking and follow-up.' },
  ];

  const links = [
    { to: '/map', label: 'Project Map', icon: Map },
    { to: '/funds', label: 'Fund Tracking', icon: Wallet },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/feedback', label: 'Public Feedback', icon: MessageSquareWarning },
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="card p-8 lg:p-12 bg-gradient-to-br from-primary to-primary-container text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">FundLedger</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">Making public spending transparent, understandable, and accessible for every citizen.</h1>
          <p className="text-lg text-white/80 leading-relaxed">FundLedger is a next-generation government transparency platform that transforms complex financial data into clear, visual, and searchable information — empowering citizens to hold their government accountable.</p>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-ink tracking-tight mb-6">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card card-hover p-6">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-bold text-ink tracking-tight mb-6">Explore the Platform</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.to} to={l.to} className="card card-hover p-5 group hover:border-primary/30 transition-all">
                <Icon className="w-6 h-6 text-primary mb-3" />
                <p className="font-semibold text-ink group-hover:text-primary transition-colors">{l.label}</p>
                <div className="flex items-center gap-1 text-xs text-ink-secondary mt-2 group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* RTI + Data */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-6">
          <FileText className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-bold text-ink mb-2">RTI Desk</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">FundLedger supplements the Right to Information Act by making project data proactively available — no RTI application needed. Search any project, track its funds, and view evidence instantly.</p>
          <Link to="/dashboard" className="btn-secondary text-sm">Browse Projects</Link>
        </div>
        <div className="card p-6">
          <ShieldCheck className="w-8 h-8 text-secondary mb-3" />
          <h3 className="font-bold text-ink mb-2">Data Integrity</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">All financial records are simulated on a blockchain-style ledger for the demo. The architecture is designed so a real blockchain service can be integrated without changing the application layer.</p>
          <Link to="/funds" className="btn-secondary text-sm">View Ledger</Link>
        </div>
      </section>
    </div>
  );
}
