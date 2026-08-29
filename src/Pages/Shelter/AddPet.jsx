import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PawPrint } from 'lucide-react';
import { createAdoptionListing } from '../../Services/adoptionApi';

export default function ShelterAddPet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    petName: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    healthStatus: 'Vaccinated & Healthy',
    description: '',
    image: '',
    status: 'available'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setForm({ ...form, [field]: value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.petName.trim() || !form.species.trim()) {
      setError('Pet name and species are required.');
      return;
    }

    setSubmitting(true);
    try {
      await createAdoptionListing({
        ...form,
        age: form.age ? Number(form.age) : undefined
      });
      navigate('/shelter/pets');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create adoption listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/shelter/pets" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to listings
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <PawPrint size={20} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Add Adoption Pet Listing</h1>
            <p className="text-xs text-slate-500">List a rescue animal looking for a loving home.</p>
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
                value={form.petName}
                onChange={(e) => update('petName', e.target.value)}
                placeholder="e.g. Buddy"
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
                placeholder="e.g. Labrador Mix"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Age (years)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="e.g. 2"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Adoption Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 bg-white"
              >
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Health Status / Vaccinations
            </label>
            <input
              type="text"
              value={form.healthStatus}
              onChange={(e) => update('healthStatus', e.target.value)}
              placeholder="e.g. Vaccinated, Neutered, Healthy"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Photo URL
            </label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Temperament & Bio Description
            </label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Describe personality, energy level, house training..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-xl bg-emerald-800 py-3 font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
            >
              {submitting ? 'Creating Listing...' : 'Publish Adoption Listing'}
            </button>
            <Link
              to="/shelter/pets"
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
