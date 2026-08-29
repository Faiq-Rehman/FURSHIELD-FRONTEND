import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { getPetById, updatePet } from '../../Services/petApi';

export default function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    weight: '',
    color: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPetById(id)
      .then(({ data }) => {
        const pet = data.pet;
        if (pet) {
          setForm({
            name: pet.name || '',
            species: pet.species || 'Dog',
            breed: pet.breed || '',
            age: pet.age !== undefined ? String(pet.age) : '',
            gender: pet.gender || 'Male',
            weight: pet.weight !== undefined ? String(pet.weight) : '',
            color: pet.color || '',
            profilePicture: pet.profilePicture || pet.image || ''
          });
        }
      })
      .catch((err) => setError(err.response?.data?.message || 'Unable to load pet details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (field, value) => setForm({ ...form, [field]: value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Pet name is required.');
      return;
    }

    setSubmitting(true);
    try {
      await updatePet(id, {
        ...form,
        age: form.age ? Number(form.age) : undefined,
        weight: form.weight ? Number(form.weight) : undefined
      });
      navigate(`/owner/pets/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update pet profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading pet profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={`/owner/pets/${id}`} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to profile
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <Edit size={20} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Edit Pet Profile</h1>
            <p className="text-xs text-slate-500">Update information for {form.name || 'your pet'}.</p>
          </div>
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Pet Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Species *
              </label>
              <select
                value={form.species}
                onChange={(e) => update('species', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Breed
              </label>
              <input
                type="text"
                value={form.breed}
                onChange={(e) => update('breed', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => update('gender', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Age (years)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Weight (kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.weight}
                onChange={(e) => update('weight', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Color
              </label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => update('color', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              value={form.profilePicture}
              onChange={(e) => update('profilePicture', e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-xl bg-emerald-800 py-3 font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
            >
              {submitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
            <Link
              to={`/owner/pets/${id}`}
              className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
