import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, HeartPulse, Plus, Calendar, Scale, Palette, Shield } from 'lucide-react';
import { getPetById, deletePet } from '../../Services/petApi';
import { getPetHealthRecords } from '../../Services/healthRecordApi';
import HealthRecordCard from '../../Component/Owner/HealthRecordCard';

const defaultPetImage = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    Promise.all([
      getPetById(id),
      getPetHealthRecords(id).catch(() => ({ data: { records: [] } }))
    ])
      .then(([petRes, recordsRes]) => {
        setPet(petRes.data.pet);
        setRecords(recordsRes.data?.records || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Unable to load pet profile.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${pet?.name}?`)) return;
    try {
      await deletePet(id);
      navigate('/owner/pets');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete pet.');
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading pet profile...</div>;
  }

  if (error || !pet) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Pet not found.'}</p>
        <Link to="/owner/pets" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to pets
        </Link>
      </div>
    );
  }

  const image = pet.profilePicture || pet.image || defaultPetImage;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/owner/pets" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
          <ArrowLeft size={16} /> Back to pets
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to={`/owner/pets/${id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 hover:border-emerald-500"
          >
            <Edit size={16} /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-bold text-red-700 hover:bg-red-100"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 grid gap-6 md:grid-cols-[260px_1fr]">
        <img src={image} alt={pet.name} className="h-64 w-full rounded-2xl object-cover" />
        <div className="space-y-4">
          <div>
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
              {pet.species}
            </span>
            <h1 className="font-display text-4xl font-bold text-slate-900">{pet.name}</h1>
            <p className="text-sm text-slate-500">{pet.breed || 'Breed not specified'}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold mb-1">
                <Calendar size={13} /> Age
              </span>
              <p className="font-bold text-slate-800 text-sm">{pet.age !== undefined ? `${pet.age} yrs` : 'N/A'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold mb-1">
                <Shield size={13} /> Gender
              </span>
              <p className="font-bold text-slate-800 text-sm">{pet.gender || 'N/A'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold mb-1">
                <Scale size={13} /> Weight
              </span>
              <p className="font-bold text-slate-800 text-sm">{pet.weight ? `${pet.weight} kg` : 'N/A'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold mb-1">
                <Palette size={13} /> Color
              </span>
              <p className="font-bold text-slate-800 text-sm">{pet.color || 'N/A'}</p>
            </div>
          </div>

          {pet.medicalHistory && (
            <div className="rounded-xl bg-amber-50 p-3.5 text-xs text-amber-900">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <HeartPulse size={15} /> Medical History / Notes
              </p>
              <p className="leading-relaxed">{pet.medicalHistory}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Health Records & Medical Timeline</h2>
          <Link
            to={`/owner/health-records?petId=${id}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-900"
          >
            <Plus size={15} /> Add Record
          </Link>
        </div>

        {records.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center border border-slate-100 text-slate-500">
            <p className="text-sm font-semibold">No health records logged for {pet.name} yet.</p>
            <Link
              to={`/owner/health-records?petId=${id}`}
              className="mt-3 inline-block text-xs font-bold text-emerald-700 hover:underline"
            >
              + Log a health event or checkup
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((rec) => (
              <HealthRecordCard key={rec._id || rec.id} record={rec} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
