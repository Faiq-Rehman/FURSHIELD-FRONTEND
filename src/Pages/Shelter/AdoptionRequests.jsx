import { useEffect, useState } from 'react';
import { Heart, PawPrint } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { getAdoptionListings, updateAdoptionListing } from '../../Services/adoptionApi';

export default function AdoptionRequests() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateAdoptionListing(id, { status });
      setListings(listings.map(l => (l._id === id || l.id === id ? { ...l, status } : l)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update listing status.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900">Adoption Inquiries & Status</h1>
        <p className="mt-1 text-sm text-slate-500">Manage rehoming inquiries and availability for shelter animals.</p>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 py-12 text-center">Loading adoption inquiries...</p>
      ) : listings.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100 space-y-2">
          <Heart className="mx-auto text-slate-300 mb-2" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No active adoption listings</h3>
          <p className="text-sm text-slate-500">Create pet listings to receive adoption inquiries.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((item) => {
            const id = item._id || item.id;
            const petName = item.petName || item.name || 'Adoptable Pet';
            const status = item.status || 'available';

            return (
              <div key={id} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900">{petName}</h3>
                    <span className="text-xs text-slate-500">({item.species} · {item.breed || 'Breed N/A'})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Health: {item.healthStatus || 'Healthy'}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="block font-semibold text-slate-400">Status</span>
                    <span className="font-bold capitalize text-slate-800">{status}</span>
                  </div>

                  <select
                    value={status}
                    onChange={(e) => handleUpdateStatus(id, e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending Adoption</option>
                    <option value="adopted">Adopted</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
