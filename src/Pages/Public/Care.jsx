import { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Apple, 
  Scissors, 
  Activity, 
  Syringe, 
  Smile, 
  Bug, 
  Brain, 
  PhoneCall, 
  Baby
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Care() {
  const [selectedCat, setSelectedCat] = useState('all');

  const categories = [
    { id: 'nutrition', title: 'Nutrition & Diet', icon: Apple, desc: 'Balanced commercial or cooked diets, hydration, and avoiding toxic human foods.' },
    { id: 'grooming', title: 'Hygiene & Grooming', icon: Scissors, desc: 'Bathing routines, coat brushing, ear cleaning, and stress-free nail clipping.' },
    { id: 'exercise', title: 'Physical Exercise', icon: Activity, desc: 'Daily physical activity tailored for puppy, adult, and senior energy levels.' },
    { id: 'vaccination', title: 'Vaccinations & Vets', icon: Syringe, desc: 'Core rabies, DHPP/FVRCP vaccines, and annual clinical wellness checkups.' },
    { id: 'dental', title: 'Dental Hygiene', icon: Smile, desc: 'Daily tooth brushing with pet toothpaste, dental chews, and scaling visits.' },
    { id: 'parasite', title: 'Parasite Control', icon: Bug, desc: 'Monthly flea, tick, and heartworm preventative treatments.' },
    { id: 'mental', title: 'Mental Wellbeing', icon: Brain, desc: 'Puzzle toys, social interaction, positive reinforcement, and anxiety reduction.' },
    { id: 'senior', title: 'Puppy & Senior Care', icon: Baby, desc: 'Specialized care for developing puppies/kittens and aging pets.' },
    { id: 'emergency', title: 'Emergency First Aid', icon: PhoneCall, desc: 'Recognizing critical symptoms and taking immediate action.' }
  ];

  const guidelines = [
    {
      category: 'nutrition',
      title: 'Healthy Feeding Habits & Hydration',
      tips: [
        'Provide fresh, clean drinking water in a stainless steel or ceramic bowl at all times.',
        'Avoid feeding chocolate, onions, garlic, grapes, raisins, xylitol, or caffeine.',
        'Measure portions accurately according to your pet\'s weight and activity level.',
        'Transition to new pet food gradually over 7–10 days to prevent digestive upset.'
      ]
    },
    {
      category: 'grooming',
      title: 'Coat & Ear Care Fundamentals',
      tips: [
        'Brush short coats weekly and long coats daily to remove dead hair and matting.',
        'Use hypoallergenic, pH-balanced pet shampoos; human shampoo dries pet skin.',
        'Inspect ears weekly for foul odor, redness, or dark discharge indicating ear mites or infections.',
        'Trim nails carefully above the pink quick line using specialized pet nail trimmers.'
      ]
    },
    {
      category: 'exercise',
      title: 'Daily Activity & Conditioning',
      tips: [
        'Dogs require at least 30–60 minutes of daily brisk walking or outdoor play.',
        'Cats benefit from 15-minute interactive play sessions using feather wands and laser pointers.',
        'Avoid strenuous outdoor running in extreme summer heat to prevent heatstroke.',
        'Provide rubber chew toys and scratching posts to maintain muscle tone and mental focus.'
      ]
    },
    {
      category: 'vaccination',
      title: 'Routine Vaccinations & Preventative Care',
      tips: [
        'Puppies and kittens require booster shots every 3–4 weeks until 16 weeks of age.',
        'Adult dogs and cats need annual or triennial rabies and core booster vaccinations.',
        'Schedule a veterinary wellness visit at least once a year for early disease detection.',
        'Maintain a digital health record of all clinical visits and diagnostic blood tests.'
      ]
    },
    {
      category: 'emergency',
      title: 'Emergency Symptoms & Immediate Steps',
      tips: [
        'Seek immediate vet care if your pet shows pale gums, persistent vomiting, or difficulty breathing.',
        'In case of accidental toxin ingestion, do not induce vomiting without veterinary instructions.',
        'Keep emergency veterinary contact numbers saved on your phone and near your front door.'
      ]
    }
  ];

  const faqs = [
    {
      q: 'How often should I schedule a veterinary wellness checkup?',
      a: 'Adult pets in good health should visit the vet once a year. Senior pets (aged 7+) and young puppies/kittens should be examined every 6 months.'
    },
    {
      q: 'What core vaccines does my pet need in Pakistan?',
      a: 'Dogs require Rabies, Distemper, Hepatitis, Parvovirus, and Parainfluenza (DHPP). Cats require Rabies, Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia (FVRCP).'
    },
    {
      q: 'How do I know if my pet is in pain?',
      a: 'Signs of pain include lethargy, loss of appetite, whimpering/groaning, limping, heavy panting, hiding, or aggression when touched.'
    }
  ];

  const filteredGuidelines = selectedCat === 'all' 
    ? guidelines 
    : guidelines.filter(g => g.category === selectedCat);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-14">
      {/* Header Banner */}
      <div className="bg-[#111318] rounded-2xl p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(200,169,107,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
            <Sparkles size={14} className="text-[#C8A96B]" />
            PET HEALTH & PREVENTIVE MEDICAL KNOWLEDGE
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            How to Give Your Pet Precision Care
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB7] leading-relaxed">
            Comprehensive expert guidelines on nutrition, hygiene, daily conditioning, vaccination schedules, and emergency first aid.
          </p>
        </div>
      </div>

      {/* Emergency Veterinary Disclaimer Warning */}
      <div className="rounded-2xl bg-[#111318] border border-[#D6A84F]/40 p-6 flex items-start gap-4 shadow-xl">
        <AlertTriangle size={24} className="text-[#D6A84F] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#A7ADB7]">
          <p className="font-black uppercase tracking-widest text-[#D6A84F]">VETERINARY MEDICAL DISCLAIMER</p>
          <p className="leading-relaxed font-medium">
            This care guide provides general educational information for pet parents. It is not a substitute for professional clinical diagnosis or emergency veterinary treatment. If your pet shows severe symptoms, contact a certified veterinarian immediately.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-black text-[#F5F5F5] uppercase tracking-wider">Pet Health Categories</h2>
          {selectedCat !== 'all' && (
            <button
              onClick={() => setSelectedCat('all')}
              className="text-xs font-black uppercase tracking-wider text-[#C8A96B] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Show All Categories
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(isSelected ? 'all' : cat.id)}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 glass-metal-hover ${
                  isSelected
                    ? 'border-[#C8A96B] bg-[#C8A96B]/15 shadow-xl'
                    : 'border-white/10 bg-[#111318] hover:border-[#C8A96B]/40'
                }`}
              >
                <div className={`h-10 w-10 rounded-xl grid place-items-center ${isSelected ? 'bg-gradient-to-br from-[#8C7445] to-[#C8A96B] text-[#08090B] font-bold' : 'bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#F5F5F5] uppercase tracking-wider">{cat.title}</h3>
                  <p className="text-xs text-[#A7ADB7] leading-relaxed mt-1">{cat.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guidelines Checklist Sections */}
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-black text-[#F5F5F5] uppercase tracking-wider">Practical Care Checklists</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredGuidelines.map((g) => (
            <div key={g.title} className="rounded-2xl bg-[#111318] p-8 shadow-2xl border border-white/10 space-y-4">
              <h3 className="font-black text-base text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={20} className="text-[#C8A96B] shrink-0" />
                {g.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A7ADB7] font-medium">
                {g.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96B] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="rounded-2xl bg-[#111318] p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#C8A96B]/20 text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center">
            <HelpCircle size={22} />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider">Frequently Asked Questions</h2>
            <p className="text-xs text-[#A7ADB7]">Common pet parenting & medical routine queries.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl bg-[#181B21] p-6 border border-white/10 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#C8A96B] leading-snug">
                {faq.q}
              </h3>
              <p className="text-xs text-[#A7ADB7] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Vet Banner Callout */}
      <div className="rounded-2xl bg-[#111318] p-8 text-[#F5F5F5] flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-[10px] font-black text-[#C8A96B] uppercase tracking-widest">URGENT MEDICAL ASSISTANCE</p>
          <h3 className="font-display text-xl font-black">Need to consult a certified veterinarian?</h3>
          <p className="text-xs text-[#A7ADB7]">Browse verified clinics in your area and book an appointment online.</p>
        </div>
        <Link
          to="/vets"
          className="rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] text-[#08090B] px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-xl transition-all shrink-0 flex items-center gap-2"
        >
          Find Nearby Vets <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
