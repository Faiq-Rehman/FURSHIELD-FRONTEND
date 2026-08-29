import { 
  ArrowRight, 
  CalendarCheck, 
  HeartHandshake, 
  ShieldCheck, 
  ShoppingBasket, 
  Sparkles, 
  Stethoscope, 
  Home as ShelterIcon, 
  PawPrint, 
  Shield,
  Star,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { careArticles } from '../../data';

export default function Home() {
  const portalRoles = [
    { title: 'Pet Owners', desc: 'Track vaccinations, manage health records & buy supplies', link: '/register', icon: PawPrint, role: 'OWNER PORTAL' },
    { title: 'Veterinarians', desc: 'Manage patient consultations, digital prescriptions & schedules', link: '/register', icon: Stethoscope, role: 'CLINICAL CONSOLE' },
    { title: 'Shelters', desc: 'Publish rescue pets & manage online adoption inquiries', link: '/register', icon: ShelterIcon, role: 'RESCUE NETWORK' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#08090B] text-[#F5F5F5] pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-white/10">
        {/* Subtle radial metallic lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_top,rgba(200,169,107,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#181B21] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30 shadow-md">
              <Sparkles size={14} className="text-[#C8A96B]" />
              PREMIUM PET CARE PLATFORM
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Your Pet. <br />
              <span className="text-[#A7ADB7]">Your Responsibility.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8C7445] via-[#C8A96B] to-[#F5F5F5]">Our Precision Care.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A7ADB7] leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Manage medical records, schedule vet consultations, adopt rescue pets, and order high-performance pet supplies—all powered by FURSHIELD.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-7 py-4 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl shadow-black/60 hover:shadow-[#C8A96B]/20 transition-all duration-300 flex items-center gap-2"
              >
                Explore Care <ArrowRight size={18} />
              </Link>
              <Link
                to="/vets"
                className="rounded-xl border border-white/10 bg-[#111318] hover:bg-[#181B21] hover:border-[#C8A96B]/40 px-7 py-4 text-xs font-black uppercase tracking-wider text-[#F5F5F5] transition-all duration-300"
              >
                Find a Veterinarian
              </Link>
            </div>

            {/* Platform Stats */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-black text-[#C8A96B]">10K+</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#A7ADB7]">REGISTERED PETS</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#8EA3B7]">250+</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#A7ADB7]">VERIFIED VETS</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#3FA66B]">98%</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#A7ADB7]">ADOPTION SUCCESS</p>
              </div>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="relative mx-auto lg:ml-auto w-full max-w-lg">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] opacity-20 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#111318]">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=85"
                alt="Luxury Pet Protection"
                className="w-full h-[420px] object-cover filter brightness-90 contrast-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#08090B]/90 backdrop-blur-xl p-4 rounded-xl flex items-center justify-between text-[#F5F5F5] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#8C7445] to-[#C8A96B] text-[#08090B] grid place-items-center font-bold">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-[#F5F5F5]">24/7 Digital Health Vault</p>
                    <p className="text-[10px] text-[#A7ADB7]">Encrypted clinical records</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#C8A96B]/20 text-[#C8A96B] border border-[#C8A96B]/40">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Workspace Portals */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#C8A96B] bg-[#181B21] px-4 py-1.5 rounded-lg border border-[#C8A96B]/30">
            TAILORED ECOSYSTEM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#F5F5F5]">
            Specialized Portals for Pet Care Partners
          </h2>
          <p className="text-xs text-[#A7ADB7] max-w-xl mx-auto uppercase tracking-wider">
            Consoles engineered for pet owners, veterinary surgeons, and animal shelters.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {portalRoles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="rounded-2xl bg-[#111318] p-8 border border-white/10 hover:border-[#C8A96B]/40 transition-all duration-300 glass-metal-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#181B21] to-[#08090B] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-[9px] font-black tracking-widest text-[#8EA3B7] uppercase">{role.role}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#F5F5F5] mb-2">{role.title}</h3>
                  <p className="text-xs text-[#A7ADB7] leading-relaxed mb-6">{role.desc}</p>
                </div>
                <Link
                  to={role.link}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C8A96B] group-hover:text-[#F5F5F5] transition-colors"
                >
                  Access {role.title} Console <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Platform Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#111318] via-[#181B21] to-[#08090B] p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#C8A96B]/20 text-[#C8A96B] border border-[#C8A96B]/40 grid place-items-center">
                <CalendarCheck size={22} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-[#F5F5F5]">Appointment Scheduling</h3>
              <p className="text-xs text-[#A7ADB7] leading-relaxed">
                Book clinic consultations, manage vaccination timelines, and sync health history directly with certified veterinary surgeons.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#8EA3B7]/20 text-[#8EA3B7] border border-[#8EA3B7]/40 grid place-items-center">
                <ShoppingBasket size={22} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-[#F5F5F5]">Curated Supplies & Food</h3>
              <p className="text-xs text-[#A7ADB7] leading-relaxed">
                Shop premium nutrition, medical supplements, and clinical grooming supplies delivered to your door.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#3FA66B]/20 text-[#3FA66B] border border-[#3FA66B]/40 grid place-items-center">
                <HeartHandshake size={22} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-[#F5F5F5]">Ethical Adoption Network</h3>
              <p className="text-xs text-[#A7ADB7] leading-relaxed">
                Connect directly with verified animal shelters to find adoptable companions and track adoption application status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Care Articles Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#C8A96B]">EXPERT KNOWLEDGE</span>
            <h2 className="font-display text-3xl font-black text-[#F5F5F5] mt-1">Pet Health & Care Guides</h2>
          </div>
          <Link to="/care" className="hidden sm:flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
            View All Guides <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {careArticles.map((article) => (
            <article key={article.title} className="rounded-2xl bg-[#111318] overflow-hidden border border-white/10 hover:border-[#C8A96B]/40 transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 filter brightness-90 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-[#08090B]/90 backdrop-blur-md px-3 py-1 rounded text-[9px] font-black text-[#C8A96B] border border-[#C8A96B]/30 uppercase tracking-widest">
                  {article.type}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-base text-[#F5F5F5] group-hover:text-[#C8A96B] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <Link to="/care" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#A7ADB7] hover:text-[#C8A96B] transition-colors">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#111318] via-[#181B21] to-[#111318] p-8 sm:p-12 text-center text-[#F5F5F5] border border-[#C8A96B]/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <Shield className="mx-auto text-[#C8A96B]" size={44} />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#F5F5F5]">
              Give Your Pet Precision Protection.
            </h2>
            <p className="text-xs text-[#A7ADB7] leading-relaxed uppercase tracking-wider">
              Create your FURSHIELD account today to manage health records, schedule vet consultations, and access premium pet care resources.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] text-[#08090B] px-8 py-4 text-xs font-black uppercase tracking-widest shadow-xl transition-all"
            >
              Get Started Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
