import { Shield, Mail, MapPin, Phone, ArrowRight, Globe, Share2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#08090B] text-[#F5F5F5] border-t border-white/10 relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C8A96B]/50 to-transparent"></div>

      {/* Emergency Vet Banner */}
      <div className="bg-[#111318] border-b border-white/10 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#C8A96B] grid place-items-center shrink-0">
              <Phone size={20} className="animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#C8A96B]">24/7 Emergency Vet Hotline</p>
              <p className="text-sm font-bold text-[#F5F5F5]">Call +92 800-FURSHIELD (387744) for Urgent Pet Consultation</p>
            </div>
          </div>
          <Link
            to="/vets"
            className="rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] text-[#08090B] px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-black/50 transition-all shrink-0"
          >
            Find Nearby Vet Clinic
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] text-[#C8A96B] border border-[#C8A96B]/40 shadow-md">
              <Shield size={20} className="text-[#C8A96B]" />
            </span>
            <span className="font-display text-2xl font-black tracking-tight text-[#F5F5F5]">
              FUR<span className="text-[#C8A96B]">SHIELD</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-[#A7ADB7]">
            Comprehensive pet care ecosystem bridging Pet Owners, Veterinary Surgeons, and Rescue Shelters into one unified luxury platform.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="h-9 w-9 rounded-xl bg-[#111318] border border-white/10 hover:border-[#C8A96B]/50 grid place-items-center text-[#A7ADB7] hover:text-[#C8A96B] transition-colors" aria-label="Website">
              <Globe size={16} />
            </a>
            <a href="#" className="h-9 w-9 rounded-xl bg-[#111318] border border-white/10 hover:border-[#C8A96B]/50 grid place-items-center text-[#A7ADB7] hover:text-[#C8A96B] transition-colors" aria-label="Share">
              <Share2 size={16} />
            </a>
            <a href="#" className="h-9 w-9 rounded-xl bg-[#111318] border border-white/10 hover:border-[#C8A96B]/50 grid place-items-center text-[#A7ADB7] hover:text-[#C8A96B] transition-colors" aria-label="Community">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#C8A96B] mb-4">Ecosystem</p>
          <ul className="space-y-2.5 text-xs font-semibold text-[#A7ADB7]">
            <li><Link to="/adoptions" className="hover:text-[#F5F5F5] transition-colors">Pet Adoption Portal</Link></li>
            <li><Link to="/vets" className="hover:text-[#F5F5F5] transition-colors">Book Vet Consultation</Link></li>
            <li><Link to="/products" className="hover:text-[#F5F5F5] transition-colors">Pet Store & Supplies</Link></li>
            <li><Link to="/shelters" className="hover:text-[#F5F5F5] transition-colors">Rescue Shelters</Link></li>
            <li><Link to="/care" className="hover:text-[#F5F5F5] transition-colors">Health & Preventive Care</Link></li>
          </ul>
        </div>

        {/* Portals & Roles */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#C8A96B] mb-4">Workspace Portals</p>
          <ul className="space-y-2.5 text-xs font-semibold text-[#A7ADB7]">
            <li><Link to="/register" className="hover:text-[#F5F5F5] transition-colors">Pet Owner Account</Link></li>
            <li><Link to="/register" className="hover:text-[#F5F5F5] transition-colors">Veterinarian Registration</Link></li>
            <li><Link to="/register" className="hover:text-[#F5F5F5] transition-colors">Shelter Partner Portal</Link></li>
            <li><Link to="/login" className="hover:text-[#F5F5F5] transition-colors">Member Sign In</Link></li>
            <li><Link to="/about" className="hover:text-[#F5F5F5] transition-colors">About FurShield</Link></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-[#C8A96B]">Stay Updated</p>
          <p className="text-xs text-[#A7ADB7]">Get vaccination reminders & pet health tips directly in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-xl bg-[#181B21] border border-white/10 px-3.5 py-2.5 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60"
            />
            <button type="submit" className="rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] p-2.5 text-[#08090B] shrink-0 font-bold">
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="pt-2 space-y-1.5 text-xs text-[#A7ADB7]">
            <p className="flex items-center gap-2"><Mail size={14} className="text-[#C8A96B]" /> support@furshield.org</p>
            <p className="flex items-center gap-2"><MapPin size={14} className="text-[#C8A96B]" /> Clifton Block 5, Karachi, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-[#6F7682] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <p>© 2026 FurShield Platform. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0 text-[11px]">
          <a href="#" className="hover:text-[#A7ADB7] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#A7ADB7] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#A7ADB7] transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
