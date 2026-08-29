import { useEffect, useState } from 'react';
import { Search, Stethoscope, Sparkles } from 'lucide-react';
import VetCard from '../../Component/Vet/VetCard';
import { getVets, searchVets } from '../../Services/vetApi';

export default function Vets() {
  const [query, setQuery] = useState('');
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadVets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = query ? await searchVets(query) : await getVets();
      setVets(data.vets || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load veterinarian directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      loadVets();
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#111318] rounded-2xl p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(142,163,183,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#8EA3B7] border border-[#8EA3B7]/30">
            <Sparkles size={14} className="text-[#8EA3B7]" />
            VERIFIED CLINICAL DIRECTORY
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            Find Certified Veterinarians
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB7]">
            Connect with licensed veterinary surgeons, specialists, and clinics for routine checkups or urgent medical care.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-[#111318] p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-3 text-[#6F7682]" size={17} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by doctor name or clinic city..."
            className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#8EA3B7] focus:ring-1 focus:ring-[#8EA3B7] transition-all"
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#8EA3B7] hidden sm:inline">
          Showing {vets.length} Verified Specialists
        </span>
      </div>

      {error && (
        <div role="status" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-10 w-10 border-4 border-[#8EA3B7] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase tracking-widest text-[#A7ADB7]">Searching veterinarian database...</p>
        </div>
      ) : vets.length === 0 ? (
        <div className="rounded-2xl bg-[#111318] p-12 text-center shadow-2xl border border-white/10">
          <Stethoscope className="mx-auto text-[#6F7682] mb-3" size={48} />
          <h3 className="text-base font-black text-[#F5F5F5] uppercase tracking-wider">No veterinarians found</h3>
          <p className="text-xs text-[#A7ADB7] mt-1">Try searching with a different doctor name or location.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vets.map((vet) => (
            <VetCard key={vet._id || vet.id} vet={vet} />
          ))}
        </div>
      )}
    </div>
  );
}
