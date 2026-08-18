import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, User, Shield, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '@/services/AuthContext';
import { useToast } from '@/services/ToastContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<'citizen-login' | 'citizen-register' | 'admin-login'>('citizen-login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'citizen-register' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.password.trim()) e.password = 'Password is required';
    else if (form.password.length < 4) e.password = 'Password must be at least 4 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (mode === 'citizen-register') {
      register(form.name, form.email, form.password);
      toast('success', `Welcome, ${form.name}! Your account has been created.`);
    } else {
      login(form.email, form.password, mode === 'admin-login');
      toast('success', mode === 'admin-login' ? 'Admin login successful.' : 'Login successful.');
    }
    navigate(mode === 'admin-login' ? '/admin' : '/dashboard');
  };

  const tabs = [
    { id: 'citizen-login' as const, label: 'Citizen Login', icon: User },
    { id: 'citizen-register' as const, label: 'Register', icon: UserPlus },
    { id: 'admin-login' as const, label: 'Admin Login', icon: Shield },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Landmark className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ink">FundLedger</h1>
          <p className="text-sm text-ink-secondary mt-1">Sign in to track and report on public projects</p>
        </div>

        <div className="card p-6">
          <div className="flex gap-1 bg-surface-low rounded-lg p-1 mb-6">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => { setMode(t.id); setErrors({}); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-xs font-medium transition-colors ${mode === t.id ? 'bg-surface text-primary shadow-sm' : 'text-ink-secondary hover:text-ink'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === 'citizen-register' && (
              <div>
                <label className="label" htmlFor="name">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input pl-10" placeholder="Your name" aria-invalid={!!errors.name} />
                </div>
                {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
              </div>
            )}
            <div>
              <label className="label" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input pl-10" placeholder="you@example.com" aria-invalid={!!errors.email} />
              </div>
              {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input pl-10" placeholder="••••••••" aria-invalid={!!errors.password} />
              </div>
              {errors.password && <p className="text-xs text-error mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Please wait...' : mode === 'citizen-register' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-surface-low rounded-lg text-center">
            <p className="text-xs text-ink-secondary">
              {mode === 'admin-login' ? 'Admin demo: use any email/password to enter Admin Portal.' : 'Demo mode: any email and password (4+ chars) works.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
