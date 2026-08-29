import { useEffect, useState } from 'react';
import { Heart, Search, PawPrint, Sparkles, MapPin, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAdoptionListings } from '../../Services/adoptionApi';

const defaultPetImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function Adoptions() {
  const [query, setQuery] = useState('');
  const [species, setSpecies] = useState('All');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadListings = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (species !== 'All') params.species = species;
      const { data } = await getAdoptionListings(params);
      setListings(data.listings || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load adoption listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [species]);

  const filtered = listings.filter((item) => {
    const petName = item.petName || item.name || '';
    const breed = item.breed || '';
    const shelterName = item.shelter?.fullName || item.shelter?.name || '';
    const text = `${petName} ${breed} ${shelterName}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Banner */}
      <div className="bg-[#111318] rounded-2xl p-8 sm:p-12 text-[#F5F5F5] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(200,169,107,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
            <Sparkles size={14} className="text-[#C8A96B]" />
            VERIFIED ADOPTION NETWORK
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            Open Your Home to a New Story
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB7]">
            Meet loving rescue pets looking for forever families. Connect directly with partner animal shelters.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#111318] p-4 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['All', 'Dog', 'Cat', 'Rabbit', 'Bird'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSpecies(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                species === cat
                  ? 'bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-[#08090B] shadow-md'
                  : 'bg-[#181B21] text-[#A7ADB7] hover:text-[#F5F5F5] border border-white/5'
              }`}
            >
              {cat === 'All' ? 'All Rescue Pets' : `${cat}s`}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-3 text-[#6F7682]" size={17} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pet name, breed..."
            className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all"
          />
        </div>
      </div>

      {error && (
        <div role="status" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-10 w-10 border-4 border-[#C8A96B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase tracking-widest text-[#A7ADB7]">Loading rescue pet listings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-[#111318] p-12 text-center shadow-2xl border border-white/10">
          <PawPrint className="mx-auto text-[#6F7682] mb-3" size={48} />
          <h3 className="text-base font-black text-[#F5F5F5] uppercase tracking-wider">No adoption listings match search</h3>
          <p className="text-xs text-[#A7ADB7] mt-1">Try selecting a different species or clearing your search input.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const id = item._id || item.id;
            const petName = item.petName || item.name || 'Adoptable Pet';
            const shelterName = item.shelter?.fullName || item.shelter?.name || 'Shelter Partner';
            const img = item.image || defaultPetImg;

            return (
              <article
                key={id}
                className="group rounded-2xl bg-[#111318] shadow-2xl border border-white/10 glass-metal-hover flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative overflow-hidden aspect-4/3 bg-[#181B21]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95"
                      src={img}
                      alt={petName}
                    />
                    <span className="absolute top-3 right-3 bg-[#08090B]/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest text-[#3FA66B] border border-[#3FA66B]/40">
                      {item.status || 'Available'}
                    </span>
                    {item.gender && (
                      <span className="absolute bottom-3 left-3 bg-[#181B21]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest text-[#F5F5F5] border border-white/10">
                        {item.gender}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="font-black text-lg text-[#F5F5F5] uppercase tracking-wider group-hover:text-[#C8A96B] transition-colors">
                        {petName}
                      </h2>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C8A96B] bg-[#181B21] px-2.5 py-1 rounded border border-[#C8A96B]/30">
                        {item.age ? `${item.age} yrs` : 'Age N/A'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#A7ADB7]">
                      {item.breed || 'Mixed Breed'} · {item.species || 'Pet'}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-[#8EA3B7] font-bold bg-[#181B21] p-2.5 rounded-xl border border-white/5">
                      <Building2 size={14} className="shrink-0 text-[#C8A96B]" />
                      <span className="truncate">{shelterName}</span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-[#A7ADB7] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/adoptions/${id}`}
                    className="w-full rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] py-3 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Meet {petName} <ArrowRight size={16} />
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
