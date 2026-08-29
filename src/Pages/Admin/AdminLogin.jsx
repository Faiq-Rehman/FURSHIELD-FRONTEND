import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { adminLogin } from '../../Services/adminApi';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { data } = await adminLogin(form);
      if (data.token) {
        localStorage.setItem('furshield-admin-token', data.token);
        localStorage.setItem('furshield-admin-user', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError('Authentication failed. No admin token returned.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin username or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5] flex items-center justify-center p-4 relative overflow-hidden font-sans carbon-pattern">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(200,169,107,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111318] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-8 backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent" />

          {/* Brand & Security Header */}
          <div className="text-center space-y-3 pt-2">
            <div className="mx-auto h-14 w-14 rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] border border-[#C8A96B]/40 text-[#C8A96B] grid place-items-center shadow-xl">
              <ShieldCheck size={28} />
            </div>
            <div>
              <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30 inline-block mb-2">
                AUTHORIZED PERSONNEL ONLY
              </span>
              <h1 className="font-display text-2xl font-black text-[#F5F5F5] tracking-tight">
                ADMIN CONTROL CENTER
              </h1>
              <p className="text-xs text-[#A7ADB7] mt-1 font-medium">
                Secure access for system engineering telemetry
              </p>
            </div>
          </div>

          {error && (
            <div role="alert" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B] flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#C94B4B] animate-ping" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="admin"
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-10 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682] font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#6F7682] hover:text-[#F5F5F5]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] py-3.5 text-xs font-black uppercase tracking-widest text-[#08090B] shadow-xl shadow-black/60 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? 'Authenticating Admin Session...' : (
                <>
                  SIGN IN TO CONSOLE <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#A7ADB7] hover:text-[#C8A96B] transition-colors"
            >
              <ArrowLeft size={14} /> Main FURSHIELD Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
