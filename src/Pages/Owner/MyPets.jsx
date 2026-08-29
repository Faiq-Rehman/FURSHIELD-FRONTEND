import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, PawPrint } from 'lucide-react';
import PetCard from '../../Component/Owner/PetCard';
import { getMyPets, deletePet } from '../../Services/petApi';

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const loadPets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getMyPets();
      setPets(data.pets || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load pets right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this pet profile?')) return;
    try {
      await deletePet(id);
      setPets(pets.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete pet.');
    }
  };

  const filteredPets = pets.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.species?.toLowerCase().includes(search.toLowerCase()) ||
      p.breed?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">My Pets</h1>
          <p className="mt-1 text-sm text-slate-500">Manage and care for your pets in one place.</p>
        </div>
        <Link
          to="/owner/pets/add"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-900"
        >
          <Plus size={18} /> Add Pet
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, species or breed..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading pets...</div>
      ) : filteredPets.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-100">
          <PawPrint className="mx-auto text-slate-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No pets found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {search ? 'No pets match your search criteria.' : 'You have not added any pets yet.'}
          </p>
          {!search && (
            <Link
              to="/owner/pets/add"
              className="mt-5 inline-block rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white"
            >
              Add your first pet
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.map((pet) => (
            <PetCard key={pet._id || pet.id} pet={pet} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
