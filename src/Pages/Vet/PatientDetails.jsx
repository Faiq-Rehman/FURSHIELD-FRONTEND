import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Plus, HeartPulse, User, Calendar, Shield } from 'lucide-react';
import { getPetById } from '../../Services/petApi';
import { getPetHealthRecords, createHealthRecord } from '../../Services/healthRecordApi';
import HealthRecordCard from '../../Component/Owner/HealthRecordCard';

const defaultPetImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function VetPatientDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddRecord, setShowAddRecord] = useState(false);

  const [form, setForm] = useState({
    recordType: 'Checkup',
    title: '',
    description: '',
    diagnosis: '',
    treatment: '',
    medication: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);

  const loadPatientData = async () => {
    setLoading(true);
    setError('');
    try {
      const [petRes, recordsRes] = await Promise.all([
        getPetById(id),
        getPetHealthRecords(id).catch(() => ({ data: { records: [] } }))
      ]);
      setPet(petRes.data.pet);
      setRecords(recordsRes.data?.records || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load patient records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatientData();
  }, [id]);

  const handleAddTreatmentRecord = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSubmitting(true);
    try {
      const { data } = await createHealthRecord({
        ...form,
        pet: id
      });
      if (data.record) {
        setRecords([data.record, ...records]);
      }
      setShowAddRecord(false);
      setForm({
        recordType: 'Checkup',
        title: '',
        description: '',
        diagnosis: '',
        treatment: '',
        medication: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save treatment record.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading patient chart...</div>;
  }

  if (error || !pet) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Patient record not found.'}</p>
        <Link to="/vet/patients" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to patients
        </Link>
      </div>
    );
  }

  const img = pet.profilePicture || pet.image || defaultPetImg;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/vet/patients" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to patient directory
      </Link>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 grid gap-6 md:grid-cols-[240px_1fr]">
        <img src={img} alt={pet.name} className="h-56 w-full rounded-2xl object-cover bg-slate-50" />
        <div className="space-y-4">
          <div>
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
              Patient Record
            </span>
            <h1 className="font-display text-3xl font-bold text-slate-900">{pet.name}</h1>
            <p className="text-sm text-slate-500">{pet.species} · {pet.breed || 'Breed N/A'}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-semibold">Age:</span> <strong className="text-slate-800">{pet.age ? `${pet.age} yrs` : 'N/A'}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-semibold">Gender:</span> <strong className="text-slate-800">{pet.gender || 'N/A'}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-semibold">Weight:</span> <strong className="text-slate-800">{pet.weight ? `${pet.weight} kg` : 'N/A'}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-400 font-semibold">Color:</span> <strong className="text-slate-800">{pet.color || 'N/A'}</strong>
            </div>
          </div>

          {pet.medicalHistory && (
            <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
              <strong>Medical History:</strong> {pet.medicalHistory}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Patient Medical & Treatment History</h2>
          <button
            onClick={() => setShowAddRecord(!showAddRecord)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-900"
          >
            <Plus size={15} /> Add Clinical Record
          </button>
        </div>

        {showAddRecord && (
          <form onSubmit={handleAddTreatmentRecord} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">New Treatment & Observation Record</h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Examination & Diagnosis"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Record Type</label>
                <select
                  value={form.recordType}
                  onChange={(e) => setForm({ ...form, recordType: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs bg-white"
                >
                  <option value="Checkup">Checkup</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Diagnosis</label>
                <input
                  type="text"
                  placeholder="e.g. Ear Infection"
                  value={form.diagnosis}
                  onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medication / Prescription</label>
                <input
                  type="text"
                  placeholder="e.g. Antibiotic drops 2x daily"
                  value={form.medication}
                  onChange={(e) => setForm({ ...form, medication: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Observations / Treatment Details</label>
              <textarea
                rows="2"
                placeholder="Clinical observations..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Save Record'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddRecord(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {records.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center border border-slate-100 text-slate-500">
            <p className="text-sm font-semibold">No medical records logged for {pet.name} yet.</p>
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
