import { useEffect, useState } from 'react';
import { Search, Home as ShelterIcon, MapPin, Phone, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getShelters, searchShelters } from '../../Services/shelterApi';

export default function Shelters() {
  const [query, setQuery] = useState('');
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadShelters = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = query ? await searchShelters(query) : await getShelters();
      setShelters(data.shelters || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load shelter directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      loadShelters();
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Banner */}
      <div className="bg-[#111318] rounded-2xl p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(214,168,79,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#D6A84F] border border-[#D6A84F]/30">
            <Sparkles size={14} className="text-[#D6A84F]" />
            RESCUE PARTNER DIRECTORY
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            Shelters Making a Difference
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB7]">
            Discover verified animal shelter partners rescuing, caring for, and rehoming pets across the country.
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
            placeholder="Search shelter by name or city..."
            className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] transition-all"
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#D6A84F] hidden sm:inline">
          Showing {shelters.length} Partner Shelters
        </span>
      </div>

      {error && (
        <div role="status" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-10 w-10 border-4 border-[#D6A84F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase tracking-widest text-[#A7ADB7]">Connecting to rescue shelter network...</p>
        </div>
      ) : shelters.length === 0 ? (
        <div className="rounded-2xl bg-[#111318] p-12 text-center shadow-2xl border border-white/10">
          <ShelterIcon className="mx-auto text-[#6F7682] mb-3" size={48} />
          <h3 className="text-base font-black text-[#F5F5F5] uppercase tracking-wider">No shelters found</h3>
          <p className="text-xs text-[#A7ADB7] mt-1">Try searching with a different shelter name or city.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {shelters.map((shelter) => {
            const id = shelter._id || shelter.id;
            const name = shelter.fullName || shelter.name || 'Shelter Partner';
            const location = shelter.address || 'Karachi, Pakistan';

            return (
              <article
                key={id}
                className="group rounded-2xl bg-[#111318] p-6 sm:p-8 shadow-2xl border border-white/10 glass-metal-hover flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-[#181B21] border border-[#D6A84F]/30 text-[#D6A84F] grid place-items-center shrink-0">
                        <ShelterIcon size={24} />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-[#F5F5F5] uppercase tracking-wider group-hover:text-[#D6A84F] transition-colors">
                          {name}
                        </h2>
                        <p className="text-xs font-semibold text-[#A7ADB7] flex items-center gap-1.5 mt-0.5">
                          <MapPin size={14} className="text-[#6F7682] shrink-0" />
                          <span>{location}</span>
                        </p>
                      </div>
                    </div>

                    <span className="rounded px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#3FA66B] bg-[#3FA66B]/20 border border-[#3FA66B]/40 flex items-center gap-1 shrink-0">
                      <ShieldCheck size={14} /> Verified Partner
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-[#A7ADB7] leading-relaxed">
                    Dedicated animal shelter providing rescue services, medical rehabilitation, and rehoming programs for homeless pets.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-[#A7ADB7] font-bold">
                    {shelter.phone && <p className="flex items-center gap-1.5"><Phone size={14} className="text-[#6F7682]" /> {shelter.phone}</p>}
                  </div>
                  <Link
                    to={`/shelters/${id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] text-[#08090B] px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-xl transition-all cursor-pointer"
                  >
                    View Shelter <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
