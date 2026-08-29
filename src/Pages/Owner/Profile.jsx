import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { getCurrentUser } from '../../Services/authApi';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(!user);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then(({ data }) => {
        if (data.user) setProfile(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading user profile...</div>;
  }

  const displayName = profile?.fullName || profile?.name || 'User Profile';
  const roleName = profile?.role === 'user' ? 'Pet Owner' : profile?.role || 'User';

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900">Your Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Manage account information and contact preferences.</p>
      </div>

      <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-2xl">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{displayName}</h2>
            <p className="text-xs font-semibold text-emerald-700 capitalize flex items-center gap-1 mt-0.5">
              <Shield size={14} /> {roleName} Account
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <User className="text-slate-400" size={18} />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Username</p>
              <p className="font-bold text-slate-800">@{profile?.username || 'user'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <Mail className="text-slate-400" size={18} />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Email Address</p>
              <p className="font-bold text-slate-800">{profile?.email || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <Phone className="text-slate-400" size={18} />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Phone Number</p>
              <p className="font-bold text-slate-800">{profile?.phone || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <MapPin className="text-slate-400" size={18} />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Registered Address</p>
              <p className="font-bold text-slate-800">{profile?.address || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
