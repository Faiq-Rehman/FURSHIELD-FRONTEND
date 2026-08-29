import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, PawPrint } from 'lucide-react';
import ShelterPetCard from '../../Component/Shelter/ShelterPetCard';
import { useAuth } from '../../Context/AuthContext';
import { getAdoptionListings, deleteAdoptionListing } from '../../Services/adoptionApi';

export default function ShelterPets() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const shelterId = user?._id || user?.id;

  const loadListings = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getAdoptionListings();
      const shelterItems = (data.listings || []).filter(
        (l) => (l.shelter?._id || l.shelter?.id || l.shelter) === shelterId
      );
      setListings(shelterItems);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load adoption listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [shelterId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this adoption listing?')) return;
    try {
      await deleteAdoptionListing(id);
      setListings(listings.filter((l) => (l._id || l.id) !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete listing.');
    }
  };

  const filtered = listings.filter((l) => {
    const text = `${l.petName || l.name || ''} ${l.species || ''} ${l.breed || ''}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Shelter Pet Listings</h1>
          <p className="mt-1 text-sm text-slate-500">Manage rescue animals available for adoption.</p>
        </div>
        <Link
          to="/shelter/add-pet"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-900"
        >
          <Plus size={18} /> Add Pet Listing
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by pet name, species or breed..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 py-12 text-center">Loading adoption listings...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100">
          <PawPrint className="mx-auto text-slate-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No pet listings found</h3>
          <p className="text-sm text-slate-500 mt-1">
            {search ? 'No listings match your search criteria.' : 'Your shelter has not created any adoption listings yet.'}
          </p>
          {!search && (
            <Link
              to="/shelter/add-pet"
              className="mt-5 inline-block rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white"
            >
              Add your first pet listing
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ShelterPetCard key={item._id || item.id} listing={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
