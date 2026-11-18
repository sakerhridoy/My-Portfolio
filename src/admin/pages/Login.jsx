import { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fallbackAdmin = slug ? `/${slug}/admin` : '/admin';
  const redirectTo = location.state?.from || fallbackAdmin;

  if (user) return <Navigate to={user.slug ? `/${user.slug}/admin` : redirectTo} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const account = await login(form.email.trim(), form.password);
      navigate(account?.slug ? `/${account.slug}/admin` : redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070b] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 blur-[180px] rounded-full" />

      <div className="relative w-full max-w-md p-px rounded-2xl bg-linear-to-br from-cyan-400/50 via-blue-500/40 to-purple-600/50">
        <div className="rounded-2xl bg-black/60 backdrop-blur-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/80 font-semibold">Control Panel</p>
            <h1 className="text-2xl font-extrabold mt-2">Admin Sign In</h1>
            <p className="text-sm text-gray-400 mt-2">Manage your portfolio content and leads</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email address"
                className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password"
                className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
