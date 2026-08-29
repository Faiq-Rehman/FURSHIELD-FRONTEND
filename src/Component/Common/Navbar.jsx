import { Shield, Menu, ShoppingBag, X, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';

const links = [
  ['Explore', '/'],
  ['Adopt', '/adoptions'],
  ['Find a Vet', '/vets'],
  ['Shelters', '/shelters'],
  ['Shop Care', '/products'],
  ['Care Guides', '/care'],
  ['About Us', '/about'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = (role) => {
    if (role === 'admin') return '/admin';
    if (role === 'vet') return '/vet';
    if (role === 'shelter') return '/shelter';
    return '/owner';
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return { label: 'Admin Console', bg: 'bg-[#C8A96B]/20 text-[#C8A96B] border-[#C8A96B]/40' };
      case 'vet':
        return { label: 'Veterinarian', bg: 'bg-[#8EA3B7]/20 text-[#8EA3B7] border-[#8EA3B7]/40' };
      case 'shelter':
        return { label: 'Shelter', bg: 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]/40' };
      default:
        return { label: 'Pet Owner', bg: 'bg-[#3FA66B]/20 text-[#3FA66B] border-[#3FA66B]/40' };
    }
  };

  const dashboardPath = getDashboardPath(user?.role);
  const roleBadge = getRoleBadge(user?.role);
  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#08090B]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] text-[#C8A96B] border border-[#C8A96B]/40 shadow-lg shadow-black/60 group-hover:border-[#C8A96B] group-hover:scale-105 transition-all duration-300">
            <Shield size={22} className="text-[#C8A96B]" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black tracking-tight text-[#F5F5F5] group-hover:text-[#C8A96B] transition-colors">
              FUR<span className="text-[#C8A96B]">SHIELD</span>
            </span>
            <span className="text-[9px] font-extrabold text-[#A7ADB7] tracking-widest uppercase -mt-1">
              LUXURY PET CARE TECH
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-xs font-extrabold uppercase tracking-wider transition-all duration-200 py-1 border-b-2 ${
                  isActive
                    ? 'border-[#C8A96B] text-[#C8A96B] drop-shadow-[0_0_8px_rgba(200,169,107,0.4)]'
                    : 'border-transparent text-[#A7ADB7] hover:text-[#F5F5F5] hover:border-[#C8A96B]/50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Shopping Cart Pill */}
          <Link
            to="/cart"
            aria-label={`Shopping cart${items.length ? `, ${items.length} items` : ''}`}
            className="relative grid place-items-center h-10 w-10 rounded-xl bg-[#111318] text-[#F5F5F5] border border-white/10 hover:border-[#C8A96B]/50 hover:text-[#C8A96B] transition-all"
          >
            <ShoppingBag size={18} />
            {items.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#C8A96B] text-[10px] font-black text-[#08090B] shadow-md shadow-black/50 animate-pulse-subtle">
                {items.length}
              </span>
            )}
          </Link>

          {/* User Auth Buttons / Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-[#111318] hover:bg-[#181B21] border border-white/10 hover:border-[#C8A96B]/40 transition-all cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#8C7445] to-[#C8A96B] text-[#08090B] grid place-items-center text-xs font-black shadow-sm">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-extrabold text-[#F5F5F5] max-w-[120px] truncate leading-tight">
                    {user.name || user.username}
                  </span>
                  <span className={`text-[9px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded border inline-block ${roleBadge.bg}`}>
                    {roleBadge.label}
                  </span>
                </div>
              </button>

              {/* Profile Menu Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#181B21] p-2 shadow-2xl border border-white/10 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-white/10 mb-1">
                    <p className="text-xs font-extrabold text-[#F5F5F5] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#A7ADB7] truncate">{user.email}</p>
                    <span className={`mt-2 inline-block text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded border ${roleBadge.bg}`}>
                      Role: {roleBadge.label}
                    </span>
                  </div>

                  <Link
                    to={dashboardPath}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-[#F5F5F5] hover:bg-[#C8A96B]/15 hover:text-[#C8A96B] transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    My Dashboard Console
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-[#C94B4B] hover:bg-[#C94B4B]/15 transition-colors cursor-pointer mt-1"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#A7ADB7] hover:text-[#F5F5F5] hover:bg-[#111318] border border-transparent hover:border-white/10 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-4 py-2 text-xs font-black tracking-wider uppercase text-[#08090B] shadow-lg shadow-black/40 hover:shadow-[#C8A96B]/20 transition-all flex items-center gap-1.5"
              >
                <Sparkles size={14} /> Join Now
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-[#A7ADB7] hover:text-[#F5F5F5] hover:bg-[#111318] lg:hidden cursor-pointer"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <nav className="border-t border-white/10 bg-[#08090B]/95 backdrop-blur-2xl px-6 py-6 lg:hidden space-y-3 shadow-2xl">
          {links.map(([label, path]) => (
            <NavLink
              onClick={closeMenu}
              key={path}
              to={path}
              className={({ isActive }) =>
                `block border-b border-white/5 py-3 font-extrabold text-xs uppercase tracking-wider ${
                  isActive ? 'text-[#C8A96B] pl-2 border-[#C8A96B]' : 'text-[#A7ADB7] hover:text-[#F5F5F5]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user ? (
            <div className="pt-3 space-y-2">
              <Link
                onClick={closeMenu}
                to={dashboardPath}
                className="flex items-center justify-between rounded-xl bg-[#181B21] px-4 py-3 text-xs font-black uppercase tracking-wider text-[#C8A96B] border border-[#C8A96B]/30"
              >
                <span>Dashboard ({roleBadge.label})</span>
                <LayoutDashboard size={18} />
              </Link>
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="w-full text-left rounded-xl bg-[#C94B4B]/20 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-[#C94B4B] border border-[#C94B4B]/30"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 grid grid-cols-2 gap-3">
              <Link
                onClick={closeMenu}
                to="/login"
                className="text-center rounded-xl bg-[#111318] py-3 text-xs font-extrabold uppercase tracking-wider text-[#F5F5F5] border border-white/10"
              >
                Sign In
              </Link>
              <Link
                onClick={closeMenu}
                to="/register"
                className="text-center rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] py-3 text-xs font-black uppercase tracking-wider text-[#08090B]"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
