import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Menu, User, LogOut, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/services/LanguageContext';
import { useAuth } from '@/services/AuthContext';
import { searchProjectsApi } from '@/services/api';
import type { Project } from '@/data/types';
import { formatINR } from '@/utils/currency';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(`/projects/${results[0].id}`);
      setQuery('');
      setShowResults(false);
    }
  };

  const onChange = (val: string) => {
    setQuery(val);
    setShowResults(val.length > 0);
    searchProjectsApi(val).then((data) => {
      setResults(data);
    });
  };

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-surface-mid">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button onClick={onMenuClick} className="lg:hidden text-ink-secondary hover:text-ink" aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div ref={searchRef} className="relative flex-1 max-w-xl">
          <form onSubmit={onSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                value={query}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => query && setShowResults(true)}
                placeholder="Search projects, IDs, departments..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-low border border-transparent focus:border-primary focus:bg-surface text-sm text-ink placeholder:text-outline transition-colors"
                aria-label="Global search"
              />
            </div>
          </form>

          {showResults && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-surface rounded-xl shadow-card-hover border border-surface-mid max-h-96 overflow-y-auto animate-fade-in z-50">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-ink-secondary">
                  No results for "{query}"
                </div>
              ) : (
                results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate(`/projects/${p.id}`);
                      setQuery('');
                      setShowResults(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-surface-low border-b border-surface-mid last:border-0 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-ink truncate">{p.name}</p>
                        <p className="text-xs text-ink-secondary mt-0.5">
                          {p.id} · {p.district} · {p.progress}% Complete
                        </p>
                      </div>
                      <span className="text-xs font-medium text-primary flex-shrink-0">{formatINR(p.budget)}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Location indicator */}
        <div className="hidden md:flex items-center gap-1.5 text-sm text-ink-secondary px-3 py-2 rounded-lg bg-surface-low">
          <MapPin className="w-4 h-4 text-secondary" />
          <span className="font-medium">Tamil Nadu</span>
        </div>

        {/* Language switcher */}
        <div className="flex items-center gap-1 bg-surface-low rounded-lg p-1">
          <Globe className="w-4 h-4 text-outline ml-1.5" />
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-1 rounded text-sm font-medium transition-colors ${lang === 'en' ? 'bg-primary text-white' : 'text-ink-secondary hover:text-ink'}`}
          >
            EN
          </button>
          <span className="text-outline text-xs">|</span>
          <button
            onClick={() => setLang('ta')}
            className={`px-2 py-1 rounded text-sm font-medium transition-colors ${lang === 'ta' ? 'bg-primary text-white' : 'text-ink-secondary hover:text-ink'}`}
          >
            தமிழ்
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface-low text-ink-secondary hover:text-ink transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          {user ? (
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 pr-2 rounded-lg hover:bg-surface-low transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4 text-outline hidden sm:block" />
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-primary text-sm py-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {showProfile && user && (
            <div className="absolute top-full mt-2 right-0 w-56 bg-surface rounded-xl shadow-card-hover border border-surface-mid py-2 animate-fade-in z-50">
              <div className="px-4 py-2 border-b border-surface-mid">
                <p className="font-semibold text-sm text-ink">{user.name}</p>
                <p className="text-xs text-ink-secondary truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wide text-secondary">{user.role}</span>
              </div>
              <button
                onClick={() => { setShowProfile(false); logout(); navigate('/'); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-ink-secondary hover:bg-surface-low hover:text-ink transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
