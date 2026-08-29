import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Plus, Calendar, HeartPulse } from 'lucide-react';
import HealthRecordCard from '../../Component/Owner/HealthRecordCard';
import { getMyPets } from '../../Services/petApi';
import { getPetHealthRecords, createHealthRecord } from '../../Services/healthRecordApi';

export default function HealthRecords() {
  const [searchParams] = useSearchParams();
  const initialPetId = searchParams.get('petId') || '';

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(initialPetId);
  const [records, setRecords] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(Boolean(initialPetId));

  const [form, setForm] = useState({
    pet: initialPetId,
    recordType: 'Vaccination',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    veterinarian: '',
    diagnosis: '',
    treatment: '',
    medication: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMyPets()
      .then(({ data }) => {
        const petList = data.pets || [];
        setPets(petList);
        if (!selectedPetId && petList.length > 0) {
          const firstId = petList[0]._id || petList[0].id;
          setSelectedPetId(firstId);
          setForm((f) => ({ ...f, pet: firstId }));
        }
      })
      .catch((err) => setError(err.response?.data?.message || 'Unable to load pets.'))
      .finally(() => setLoadingPets(false));
  }, []);

  useEffect(() => {
    if (!selectedPetId) return;
    setLoadingRecords(true);
    getPetHealthRecords(selectedPetId)
      .then(({ data }) => {
        setRecords(data.records || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Unable to load health records.');
      })
      .finally(() => setLoadingRecords(false));
  }, [selectedPetId]);

  const handlePetChange = (petId) => {
    setSelectedPetId(petId);
    setForm((f) => ({ ...f, pet: petId }));
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.pet || !form.title.trim()) {
      setError('Please select a pet and provide a title.');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await createHealthRecord(form);
      if (data.record) {
        setRecords([data.record, ...records]);
      }
      setShowAddModal(false);
      setForm({
        pet: selectedPetId,
        recordType: 'Vaccination',
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        veterinarian: '',
        diagnosis: '',
        treatment: '',
        medication: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create health record.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPet = pets.find((p) => (p._id || p.id) === selectedPetId);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Health Records</h1>
          <p className="mt-1 text-sm text-slate-500">Track vaccinations, checkups, and medical history.</p>
        </div>
        {pets.length > 0 && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-900"
          >
            <Plus size={18} /> Add Record
          </button>
        )}
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loadingPets ? (
        <p className="text-slate-500">Loading pets...</p>
      ) : pets.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center border border-slate-100 text-slate-500">
          <HeartPulse className="mx-auto text-slate-300 mb-2" size={36} />
          <p className="font-bold text-slate-900">No pets registered</p>
          <p className="text-xs text-slate-500 mt-1">Please register a pet first to view or add health records.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {pets.map((p) => {
              const pId = p._id || p.id;
              const isSelected = pId === selectedPetId;
              return (
                <button
                  key={pId}
                  onClick={() => handlePetChange(pId)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    isSelected
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p.name} ({p.species})
                </button>
              );
            })}
          </div>

          {loadingRecords ? (
            <p className="text-slate-500">Loading records...</p>
          ) : records.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center border border-slate-100 text-slate-500">
              <FileText className="mx-auto text-slate-300 mb-2" size={32} />
              <p className="font-semibold text-slate-800">No health records for {selectedPet?.name || 'this pet'}.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 text-xs font-bold text-emerald-700 hover:underline"
              >
                + Create first health record
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((rec) => (
                <HealthRecordCard key={rec._id || rec.id} record={rec} />
              ))}
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900">Log Health Record</h2>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Select Pet *</label>
                <select
                  value={form.pet}
                  onChange={(e) => setForm({ ...form, pet: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white"
                  required
                >
                  {pets.map((p) => (
                    <option key={p._id || p.id} value={p._id || p.id}>
                      {p.name} ({p.species})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Record Type *</label>
                  <select
                    value={form.recordType}
                    onChange={(e) => setForm({ ...form, recordType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white"
                  >
                    <option value="Vaccination">Vaccination</option>
                    <option value="Checkup">Checkup</option>
                    <option value="Treatment">Treatment</option>
                    <option value="Surgerical">Surgery</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Record Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Rabies Vaccine"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Description / Note</label>
                <textarea
                  rows="2"
                  placeholder="Details about the procedure or notes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Veterinarian Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Ayesha Khan"
                    value={form.veterinarian}
                    onChange={(e) => setForm({ ...form, veterinarian: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    placeholder="e.g. Healthy checkup"
                    value={form.diagnosis}
                    onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-emerald-800 py-2.5 text-sm font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : 'Save Record'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
