import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Award, 
  HeartHandshake, 
  Stethoscope, 
  ShoppingBag, 
  CalendarCheck, 
  PawPrint,
  Home as ShelterIcon,
  ArrowRight,
  CheckCircle2,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const whatWeDo = [
    { title: 'Pet Management', desc: 'Centralized pet profiles with species, breed, age, and owner contact detail tracking.', icon: PawPrint },
    { title: 'Veterinary Care', desc: 'Direct consultation booking with verified licensed veterinary surgeons and clinics.', icon: Stethoscope },
    { title: 'Health Records', desc: 'Digital medical passport for vaccination timelines, prescriptions, and diagnosis notes.', icon: ShieldCheck },
    { title: 'Appointments', desc: 'Real-time checkup schedule management and visit confirmations.', icon: CalendarCheck },
    { title: 'Pet Products & Store', desc: 'Curated nutritionist-approved pet food, grooming supplies, and health supplements.', icon: ShoppingBag },
    { title: 'Ethical Adoption', desc: 'Rescue animal listings connecting adoption applicants directly with partner shelters.', icon: HeartHandshake },
    { title: 'Shelter Operations', desc: 'Dedicated portal for animal shelters to manage rescued animals and rehoming applications.', icon: ShelterIcon },
  ];

  const workflowSteps = [
    { step: '1', title: 'Create Account', desc: 'Sign up as a Pet Owner, Vet, or Shelter Partner.', icon: UserPlus },
    { step: '2', title: 'Add Your Pet', desc: 'Input pet age, breed, weight & medical history.', icon: PawPrint },
    { step: '3', title: 'Manage Health', desc: 'Store vaccination dates & prescription notes.', icon: ShieldCheck },
    { step: '4', title: 'Book & Care', desc: 'Schedule appointments with certified vets.', icon: CalendarCheck },
    { step: '5', title: 'Shop & Adopt', desc: 'Order essential supplies or adopt rescue pets.', icon: ShoppingBag },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Section */}
      <div className="bg-[#111318] rounded-2xl p-8 sm:p-14 text-[#F5F5F5] border border-white/10 shadow-2xl relative overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(200,169,107,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
            <Sparkles size={14} className="text-[#C8A96B]" />
            PRECISION PET CARE ECOSYSTEM
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight">
            About FURSHIELD
          </h1>
          <p className="text-sm sm:text-base text-[#A7ADB7] leading-relaxed font-medium">
            FURSHIELD is a unified digital ecosystem bringing Pet Owners, Certified Veterinarians, and Animal Rescue Shelters into one compassionate, high-performance platform.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-[#111318] p-8 sm:p-10 shadow-2xl border border-white/10 space-y-4 glass-metal-hover">
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center">
            <Heart size={24} />
          </div>
          <h2 className="font-display text-2xl font-black text-[#F5F5F5] uppercase tracking-wider">Our Mission</h2>
          <p className="text-xs sm:text-sm text-[#A7ADB7] leading-relaxed">
            Our mission is to eliminate fragmented pet care by connecting pet owners, clinical veterinarians, rescue shelters, and pet supply services through one accessible, transparent digital platform.
          </p>
        </div>

        <div className="rounded-2xl bg-[#111318] p-8 sm:p-10 shadow-2xl border border-white/10 space-y-4 glass-metal-hover">
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#8EA3B7] border border-[#8EA3B7]/30 grid place-items-center">
            <Award size={24} />
          </div>
          <h2 className="font-display text-2xl font-black text-[#F5F5F5] uppercase tracking-wider">Our Vision</h2>
          <p className="text-xs sm:text-sm text-[#A7ADB7] leading-relaxed">
            We envision a world where every companion animal has a lifelong digital health passport, instant access to emergency veterinary care, and an ethical pathway to loving forever homes.
          </p>
        </div>
      </div>

      {/* What We Do */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#C8A96B] bg-[#181B21] px-3.5 py-1 rounded border border-[#C8A96B]/30">
            CORE CAPABILITIES
          </span>
          <h2 className="font-display text-3xl font-black text-[#F5F5F5]">What We Do</h2>
          <p className="text-xs text-[#A7ADB7]">Essential services integrated into the FURSHIELD ecosystem.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-black text-sm text-[#F5F5F5] uppercase tracking-wider">{item.title}</h3>
                <p className="text-xs text-[#A7ADB7] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How FURSHIELD Works */}
      <div className="rounded-2xl bg-[#111318] p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display text-3xl font-black uppercase tracking-wider">How FURSHIELD Works</h2>
          <p className="text-xs text-[#A7ADB7]">A seamless 5-step journey for proactive pet parenting.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {workflowSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="bg-[#181B21] p-5 rounded-xl border border-white/10 space-y-2 text-center flex flex-col items-center">
                <span className="h-7 w-7 rounded-full bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-[#08090B] text-xs font-black grid place-items-center mb-1">
                  {s.step}
                </span>
                <Icon size={20} className="text-[#C8A96B]" />
                <h3 className="font-bold text-xs text-[#F5F5F5] uppercase tracking-wider">{s.title}</h3>
                <p className="text-[11px] text-[#A7ADB7] leading-snug">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits for Each Role */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-[#111318] p-8 shadow-2xl border border-white/10 space-y-3">
          <h3 className="font-black text-sm uppercase tracking-wider text-[#C8A96B] flex items-center gap-2">
            <PawPrint size={20} className="text-[#C8A96B]" />
            For Pet Owners
          </h3>
          <ul className="space-y-2 text-xs text-[#A7ADB7] font-medium">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#3FA66B] shrink-0" /> Unified health records & vaccination tracking</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#3FA66B] shrink-0" /> Instant vet appointment booking</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#3FA66B] shrink-0" /> Food & healthcare supply delivery</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-[#111318] p-8 shadow-2xl border border-white/10 space-y-3">
          <h3 className="font-black text-sm uppercase tracking-wider text-[#8EA3B7] flex items-center gap-2">
            <Stethoscope size={20} className="text-[#8EA3B7]" />
            For Veterinarians
          </h3>
          <ul className="space-y-2 text-xs text-[#A7ADB7] font-medium">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#8EA3B7] shrink-0" /> Streamlined patient consultation queue</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#8EA3B7] shrink-0" /> Digital medical diagnosis & prescription records</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#8EA3B7] shrink-0" /> Flexible clinical schedule management</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-[#111318] p-8 shadow-2xl border border-white/10 space-y-3">
          <h3 className="font-black text-sm uppercase tracking-wider text-[#D6A84F] flex items-center gap-2">
            <ShelterIcon size={20} className="text-[#D6A84F]" />
            For Shelters
          </h3>
          <ul className="space-y-2 text-xs text-[#A7ADB7] font-medium">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D6A84F] shrink-0" /> Publish adoptable rescue animals online</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D6A84F] shrink-0" /> Manage adoption inquiries & applicant screening</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D6A84F] shrink-0" /> Increase successful rehoming rates</li>
          </ul>
        </div>
      </div>

      {/* Responsible Pet Care Section */}
      <div className="rounded-2xl bg-[#111318] border border-[#D6A84F]/40 p-8 sm:p-10 space-y-4">
        <h2 className="font-display text-2xl font-black text-[#D6A84F] uppercase tracking-wider">Promoting Responsible Pet Ownership</h2>
        <p className="text-xs sm:text-sm text-[#A7ADB7] leading-relaxed font-medium">
          Adopting or owning a pet is a lifelong commitment. FURSHIELD advocates for regular veterinary wellness checkups, routine vaccinations, proper nutrition, positive reinforcement training, and spaying/neutering to control animal overpopulation.
        </p>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl bg-[#111318] p-8 sm:p-12 text-center text-[#F5F5F5] border border-white/10 shadow-2xl space-y-5">
        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-wider">Ready to Join FURSHIELD?</h2>
        <p className="text-xs sm:text-sm text-[#A7ADB7] max-w-xl mx-auto">
          Start managing pet health, booking clinic consultations, or finding a rescue companion today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/register" className="rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all">
            Create Free Account
          </Link>
          <Link to="/vets" className="rounded-xl bg-[#181B21] hover:bg-[#252A32] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#F5F5F5] border border-white/10 transition-all">
            Find Veterinarians
          </Link>
          <Link to="/adoptions" className="rounded-xl bg-[#181B21] hover:bg-[#252A32] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#F5F5F5] border border-white/10 transition-all">
            Explore Adoptions
          </Link>
        </div>
      </div>
    </div>
  );
}
