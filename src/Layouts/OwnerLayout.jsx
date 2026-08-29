import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  CalendarDays, 
  HeartPulse, 
  LayoutDashboard, 
  Package, 
  PawPrint, 
  User, 
  Shield, 
  LogOut, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const ownerLinks = [
  [LayoutDashboard, 'Overview', '/owner'],
  [PawPrint, 'My Pets', '/owner/pets'],
  [HeartPulse, 'Health Records', '/owner/health-records'],
  [CalendarDays, 'Appointments', '/owner/appointments'],
  [Package, 'My Orders', '/owner/orders'],
  [User, 'My Profile', '/owner/profile'],
];

export default function OwnerLayout() {
  return <DashboardLayout title="Pet Owner Console" roleLabel="Pet Owner" roleColor="gold" links={ownerLinks} />;
}

export function DashboardLayout({ title, roleLabel, roleColor = "gold", links, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeStyle = (color) => {
    switch (color) {
      case 'teal': 
      case 'metallic': return 'bg-[#8EA3B7]/20 text-[#8EA3B7] border-[#8EA3B7]/40';
      case 'amber': return 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]/40';
      default: return 'bg-[#C8A96B]/20 text-[#C8A96B] border-[#C8A96B]/40';
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5] flex flex-col font-sans carbon-pattern">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#111318]/90 border-b border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] text-[#C8A96B] border border-[#C8A96B]/40 shadow-md">
                <Shield size={18} className="text-[#C8A96B]" />
              </span>
              <span className="font-display text-xl font-black text-[#F5F5F5]">
                FUR<span className="text-[#C8A96B]">SHIELD</span>
              </span>
            </Link>
            <ChevronRight size={16} className="text-[#6F7682]" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#F5F5F5] uppercase tracking-wider hidden sm:inline">{title}</span>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${getRoleBadgeStyle(roleColor)}`}>
                {roleLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#A7ADB7] hover:text-[#F5F5F5] bg-[#181B21] hover:bg-[#252A32] py-1.5 px-3 rounded-xl border border-white/10 transition-colors"
            >
              <ExternalLink size={14} />
              Visit Website
            </Link>

            <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#8C7445] to-[#C8A96B] text-[#08090B] grid place-items-center text-xs font-black shadow-sm">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <span className="text-xs font-bold text-[#F5F5F5] hidden md:inline max-w-[120px] truncate">
                {user?.name || user?.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-xl text-[#A7ADB7] hover:text-[#C94B4B] hover:bg-[#C94B4B]/15 transition-colors cursor-pointer"
              >
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto flex-1 w-full max-w-7xl grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
        {/* Sidebar Nav */}
        <aside className="overflow-x-auto rounded-2xl bg-[#111318] p-3 border border-white/10 shadow-2xl lg:h-fit sticky top-22">
          <nav className="flex lg:flex-col gap-1.5">
            {links.map(([Icon, label, path]) => {
              const isExact = path === '/owner' || path === '/vet' || path === '/shelter' || path === '/admin';
              return (
                <NavLink
                  end={isExact}
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-extrabold tracking-wider transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-[#08090B] shadow-lg shadow-[#C8A96B]/20'
                        : 'text-[#A7ADB7] hover:bg-[#181B21] hover:text-[#F5F5F5]'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Page Content */}
        <main className="min-w-0 flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
