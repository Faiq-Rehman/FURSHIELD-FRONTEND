import { useEffect, useState } from 'react';
import { PawPrint, Heart, Plus, Home as ShelterIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShelterPetCard from '../../Component/Shelter/ShelterPetCard';
import { useAuth } from '../../Context/AuthContext';
import { getAdoptionListings } from '../../Services/adoptionApi';

export default function ShelterDashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const shelterId = user?._id || user?.id;

  useEffect(() => {
    setLoading(true);
    setError('');
    getAdoptionListings()
      .then(({ data }) => {
        const shelterItems = (data.listings || []).filter(
          (l) => (l.shelter?._id || l.shelter?.id || l.shelter) === shelterId
        );
        setListings(shelterItems);
      })
      .catch((err) => setError(err.response?.data?.message || 'Unable to load adoption listings.'))
      .finally(() => setLoading(false));
  }, [shelterId]);

  const shelterName = user?.fullName || user?.name || 'Shelter Partner';
  const availableCount = listings.filter((l) => (l.status || 'available') === 'available').length;
  const pendingCount = listings.filter((l) => l.status === 'pending').length;
  const adoptedCount = listings.filter((l) => l.status === 'adopted').length;

  return (
    <div className="space-y-8">
      {/* Practice Header */}
      <div className="bg-[#111318] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#D6A84F] border border-[#D6A84F]/30">
            <ShelterIcon size={14} className="text-[#D6A84F]" />
            RESCUE PARTNER CONSOLE
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#F5F5F5] pt-1">
            {shelterName}
          </h1>
          <p className="text-xs text-[#A7ADB7] font-medium">
            Publish rescue animals, manage adoption requests, and help pets find forever homes.
          </p>
        </div>

        <Link
          to="/shelter/add-pet"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-5 py-3.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add Adoption Listing
        </Link>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B]">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">AVAILABLE RESCUE PETS</p>
            <p className="mt-2 text-3xl font-black text-[#3FA66B]">{loading ? '...' : availableCount}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#3FA66B] border border-[#3FA66B]/30 grid place-items-center">
            <PawPrint size={24} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">PENDING APPLICATIONS</p>
            <p className="mt-2 text-3xl font-black text-[#D6A84F]">{loading ? '...' : pendingCount}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#D6A84F] border border-[#D6A84F]/30 grid place-items-center">
            <Heart size={24} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">SUCCESSFULLY REHOMED</p>
            <p className="mt-2 text-3xl font-black text-[#C8A96B]">{loading ? '...' : adoptedCount}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center">
            <ShelterIcon size={24} />
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-black uppercase tracking-wider text-[#F5F5F5] flex items-center gap-2">
            <PawPrint size={18} className="text-[#D6A84F]" />
            Shelter Listings ({listings.length})
          </h2>
          <Link to="/shelter/pets" className="text-xs font-black uppercase tracking-wider text-[#D6A84F] hover:text-[#F5F5F5] transition-colors">
            View All
          </Link>
        </div>

        {loading ? (
          <p className="text-xs text-[#A7ADB7] py-6">Loading adoption listings...</p>
        ) : listings.length === 0 ? (
          <div className="rounded-2xl bg-[#111318] p-10 text-center shadow-2xl border border-white/10 space-y-3">
            <PawPrint className="mx-auto text-[#6F7682]" size={40} />
            <h3 className="font-bold text-sm text-[#F5F5F5]">No active adoption listings</h3>
            <p className="text-xs text-[#A7ADB7] max-w-sm mx-auto">
              Add rescued animals to your shelter profile to begin receiving adoption applications.
            </p>
            <Link to="/shelter/add-pet" className="inline-block rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-md">
              Create First Listing
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.slice(0, 6).map((item) => (
              <ShelterPetCard key={item._id || item.id} listing={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
