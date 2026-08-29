import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PawPrint, 
  Stethoscope, 
  Home as ShelterIcon, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { registerUser } from '../../Services/authApi';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.username || !form.email || !form.password || !form.phone || !form.address) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await registerUser(form);
      login(data);
      const role = data.user?.role || form.role;
      if (role === 'vet') navigate('/vet');
      else if (role === 'shelter') navigate('/shelter');
      else navigate('/owner');
    } catch (errorResponse) {
      setError(errorResponse.response?.data?.message || 'Unable to create your account right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const roles = [
    {
      id: 'user',
      title: 'Pet Owner',
      desc: 'Track pet health, book vet visits & order food',
      icon: PawPrint,
    },
    {
      id: 'vet',
      title: 'Veterinarian',
      desc: 'Provide clinical consults & medical treatment',
      icon: Stethoscope,
    },
    {
      id: 'shelter',
      title: 'Animal Shelter',
      desc: 'Manage rescue pets & process adoption applications',
      icon: ShelterIcon,
    }
  ];

  return (
    <div className="min-h-[90vh] py-12 px-4 sm:px-6 flex items-center justify-center bg-[#08090B] text-[#F5F5F5] relative overflow-hidden font-sans carbon-pattern">
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[radial-gradient(circle,rgba(200,169,107,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="bg-[#111318] rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10 space-y-8 backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#181B21] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30 shadow-md">
              <Sparkles size={15} className="text-[#C8A96B]" />
              JOIN FURSHIELD PLATFORM
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-[#F5F5F5] tracking-tight">
              CREATE YOUR ACCOUNT
            </h1>
            <p className="text-xs text-[#A7ADB7] max-w-md mx-auto uppercase tracking-wider">
              Select your role below to unlock your specialized workspace.
            </p>
          </div>

          {error && (
            <div role="alert" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B] flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#C94B4B] animate-ping" />
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#A7ADB7] mb-3 flex items-center gap-2">
                <span>Select Your Role *</span>
                <span className="text-[10px] uppercase font-bold text-[#C8A96B]">({roles.find(r => r.id === form.role)?.title} selected)</span>
              </label>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = form.role === r.id;
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => update('role', r.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative group cursor-pointer ${
                        isSelected
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 shadow-lg shadow-[#C8A96B]/10 translate-y-[-2px]'
                          : 'border-white/10 bg-[#181B21] hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2 size={18} className="absolute top-3 right-3 text-[#C8A96B]" />
                      )}
                      <div className={`h-10 w-10 rounded-lg grid place-items-center mb-3 transition-colors ${
                        isSelected ? 'bg-gradient-to-br from-[#8C7445] to-[#C8A96B] text-[#08090B] font-bold' : 'bg-[#111318] text-[#A7ADB7] group-hover:text-[#F5F5F5]'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className={`font-black text-xs uppercase tracking-wider ${isSelected ? 'text-[#C8A96B]' : 'text-[#F5F5F5]'}`}>
                          {r.title}
                        </p>
                        <p className="text-[11px] text-[#A7ADB7] leading-snug mt-1">
                          {r.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="e.g. Areeba Ahmed"
                    className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Username *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-xs font-bold text-[#6F7682]">@</span>
                  <input
                    required
                    type="text"
                    value={form.username}
                    onChange={(e) => update('username', e.target.value)}
                    placeholder="areeba_petowner"
                    className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-9 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="areeba@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                <input
                  required
                  type="text"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  placeholder="Street Address, City, Country"
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-3.5 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-[#6F7682]" size={16} />
                <input
                  required
                  minLength={6}
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-10 py-3 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all placeholder:text-[#6F7682]"
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
              className="w-full rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] py-4 text-xs font-black uppercase tracking-widest text-[#08090B] shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? 'Creating Account...' : (
                <>
                  CREATE {roles.find(r => r.id === form.role)?.title} ACCOUNT <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#A7ADB7] pt-2">
              Already registered?{' '}
              <Link to="/login" className="font-black text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
                Sign in to your account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
