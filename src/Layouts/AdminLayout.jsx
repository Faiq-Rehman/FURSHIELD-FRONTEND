import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  LayoutDashboard, 
  Package, 
  PawPrint, 
  ShieldCheck, 
  Users, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Store
} from 'lucide-react';

const adminLinks = [
  [LayoutDashboard, 'System Overview', '/admin'],
  [Users, 'User Moderation', '/admin/users'],
  [Store, 'Shelter Management', '/admin/shelters'],
  [PawPrint, 'Pets & Adoptions', '/admin/pets'],
  [Package, 'Product Management', '/admin/products'],
  [ClipboardList, 'Appointments', '/admin/appointments'],
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const storedAdminUser = JSON.parse(localStorage.getItem('furshield-admin-user') || '{}');
  const adminUsername = storedAdminUser.username || 'System Admin';

  const handleAdminLogout = () => {
    localStorage.removeItem('furshield-admin-token');
    localStorage.removeItem('furshield-admin-user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5] flex flex-col font-sans carbon-pattern">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-[#111318]/90 border-b border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-2.5 group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] text-[#C8A96B] border border-[#C8A96B]/40 shadow-md">
                <ShieldCheck size={20} className="text-[#C8A96B]" />
              </span>
              <span className="font-display text-xl font-black text-[#F5F5F5] tracking-tight">
                FUR<span className="text-[#C8A96B]">SHIELD</span>
              </span>
            </Link>
            <ChevronRight size={16} className="text-[#6F7682]" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#F5F5F5] hidden sm:inline uppercase tracking-wider">Admin Control Center</span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30">
                ENGINEERING CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#A7ADB7] hover:text-[#F5F5F5] bg-[#181B21] hover:bg-[#252A32] py-1.5 px-3 rounded-xl border border-white/10 transition-colors"
            >
              <ExternalLink size={14} />
              Main Site
            </Link>

            <div className="flex items-center gap-3 border-l border-white/10 pl-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#8C7445] to-[#C8A96B] text-[#08090B] grid place-items-center text-xs font-black shadow-sm">
                {adminUsername[0]?.toUpperCase() || 'A'}
              </div>
              <span className="text-xs font-bold text-[#F5F5F5] hidden md:inline">
                {adminUsername}
              </span>
              <button
                type="button"
                onClick={handleAdminLogout}
                title="Sign Out Admin"
                className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C94B4B] hover:text-white hover:bg-[#C94B4B]/20 px-3 py-1.5 rounded-xl border border-[#C94B4B]/30 transition-colors cursor-pointer"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#A7ADB7] hover:text-white lg:hidden cursor-pointer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Admin Dashboard Grid */}
      <div className="mx-auto flex-1 w-full max-w-7xl grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
        {/* Sidebar */}
        <aside className="hidden lg:block overflow-x-auto rounded-2xl bg-[#111318] p-3 border border-white/10 h-fit sticky top-22 shadow-2xl">
          <div className="p-3 border-b border-white/10 mb-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#C8A96B]">Console Navigation</p>
          </div>
          <nav className="flex flex-col gap-1.5">
            {adminLinks.map(([Icon, label, path]) => {
              const isExact = path === '/admin';
              return (
                <NavLink
                  end={isExact}
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-extrabold tracking-wider transition-all ${
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

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <nav className="bg-[#111318] border border-white/10 rounded-2xl p-4 lg:hidden space-y-2 mb-4 shadow-2xl">
            {adminLinks.map(([Icon, label, path]) => (
              <NavLink
                onClick={() => setMobileOpen(false)}
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-extrabold tracking-wider ${
                    isActive ? 'bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-[#08090B]' : 'text-[#A7ADB7] hover:bg-[#181B21]'
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
