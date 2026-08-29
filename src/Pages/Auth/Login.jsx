import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PawPrint, 
  Stethoscope, 
  Home as ShelterIcon, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { loginUser } from '../../Services/authApi';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roleTabs = [
    { id: 'user', label: 'Pet Owner', icon: PawPrint },
    { id: 'vet', label: 'Veterinarian', icon: Stethoscope },
    { id: 'shelter', label: 'Animal Shelter', icon: ShelterIcon }
  ];

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await loginUser(form);
      login(data);
      const userRole = data.user?.role || selectedRole;
      
      if (userRole === 'vet') navigate('/vet');
      else if (userRole === 'shelter') navigate('/shelter');
      else navigate('/owner');
    } catch (errorResponse) {
      setError(errorResponse.response?.data?.message || 'Unable to sign in right now. Please check credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 flex items-center justify-center bg-[#08090B] text-[#F5F5F5] relative overflow-hidden font-sans carbon-pattern">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(200,169,107,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111318] rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10 space-y-7 backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] text-[#C8A96B] border border-[#C8A96B]/40 grid place-items-center shadow-lg transition-transform hover:scale-105">
              <Shield size={24} />
            </div>
            <h1 className="font-display text-3xl font-black text-[#F5F5F5] tracking-tight mt-2">
              WELCOME BACK
            </h1>
            <p className="text-xs text-[#A7ADB7] uppercase tracking-wider font-medium">
              Sign in to your FURSHIELD portal
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="bg-[#181B21] p-1.5 rounded-xl border border-white/10 grid grid-cols-3 gap-1">
            {roleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedRole === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedRole(tab.id)}
                  className={`py-2 px-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-[#08090B] shadow-md'
                      : 'text-[#A7ADB7] hover:text-[#F5F5F5] hover:bg-[#252A32]'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#08090B]' : 'text-[#A7ADB7]'} />
                  <span className="truncate max-w-full">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {error && (
            <div role="alert" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B] flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#C94B4B] animate-ping" />
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-black text-[#A7ADB7] uppercase tracking-widest">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-10 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                  placeholder="Enter password"
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
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] py-3.5 text-xs font-black uppercase tracking-widest text-[#08090B] shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? 'Authenticating...' : (
                <>
                  SIGN IN <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="pt-3 border-t border-white/10 text-center text-xs text-[#A7ADB7]">
              New to FURSHIELD?{' '}
              <Link to="/register" className="font-black text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
