import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Wallet, BarChart3, Map, MessageSquareWarning, Info, ShieldCheck, X, Landmark } from 'lucide-react';
import { useLanguage } from '@/services/LanguageContext';

const navItems = [
  { to: '/', key: 'nav.home', icon: Home, end: true },
  { to: '/dashboard', key: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/funds', key: 'nav.funds', icon: Wallet },
  { to: '/analytics', key: 'nav.analytics', icon: BarChart3 },
  { to: '/map', key: 'nav.map', icon: Map },
  { to: '/feedback', key: 'nav.feedback', icon: MessageSquareWarning },
  { to: '/about', key: 'nav.about', icon: Info },
  { to: '/admin', key: 'nav.admin', icon: ShieldCheck },
];

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-ink/40 z-40 lg:hidden" onClick={onClose} aria-hidden />}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-primary text-white flex-shrink-0 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ height: '100vh' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">FundLedger</h1>
              <p className="text-[10px] text-white/60 mt-0.5">Transparency Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                    isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span>{t(item.key)}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <div className="w-2 h-2 rounded-full bg-secondary-container" />
            <span>System Operational</span>
          </div>
          <p className="text-[10px] text-white/40 mt-2">v1.0 · Gov of Tamil Nadu</p>
        </div>
      </aside>
    </>
  );
}
