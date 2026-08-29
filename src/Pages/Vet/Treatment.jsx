import { useEffect, useState } from 'react';
import { ClipboardPlus, CheckCircle } from 'lucide-react';
import { getMyAppointments } from '../../Services/appointmentApi';
import { createHealthRecord } from '../../Services/healthRecordApi';

export default function Treatment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    pet: '',
    recordType: 'Treatment',
    title: '',
    diagnosis: '',
    treatment: '',
    medication: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMyAppointments()
      .then(({ data }) => {
        const list = data.appointments || [];
        setAppointments(list);
        if (list.length > 0 && list[0].pet) {
          setForm((f) => ({ ...f, pet: list[0].pet._id || list[0].pet.id }));
        }
      })
      .catch((err) => setError(err.response?.data?.message || 'Unable to load patient list.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.pet || !form.title.trim()) {
      setError('Please select a patient pet and provide a title.');
      return;
    }

    setSubmitting(true);
    try {
      await createHealthRecord(form);
      setSuccess('Treatment note recorded successfully in patient chart!');
      setForm((f) => ({
        ...f,
        title: '',
        diagnosis: '',
        treatment: '',
        medication: '',
        description: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save treatment note.');
    } finally {
      setSubmitting(false);
    }
  };

  // Unique pets
  const petsMap = new Map();
  appointments.forEach((a) => {
    if (a.pet && (a.pet._id || a.pet.id)) {
      const pId = a.pet._id || a.pet.id;
      if (!petsMap.has(pId)) {
        petsMap.set(pId, { ...a.pet, ownerName: a.user?.fullName || a.user?.name || 'Client' });
      }
    }
  });
  const patients = Array.from(petsMap.values());

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900">Clinical Treatment & Notes</h1>
        <p className="mt-1 text-sm text-slate-500">Record prescriptions, diagnoses, and medical observations.</p>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle size={18} /> {success}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 py-12 text-center">Loading patient records...</p>
      ) : patients.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm border border-slate-100 text-slate-500">
          <ClipboardPlus className="mx-auto text-slate-300 mb-2" size={36} />
          <p className="font-bold text-slate-900">No active patients</p>
          <p className="text-xs mt-1">Book or confirm an appointment to create treatment notes for patient pets.</p>
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Select Patient *</label>
              <select
                value={form.pet}
                onChange={(e) => setForm({ ...form, pet: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm bg-white"
                required
              >
                {patients.map((p) => (
                  <option key={p._id || p.id} value={p._id || p.id}>
                    {p.name} ({p.species}) — Owner: {p.ownerName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Title / Procedure *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dental cleaning & Antibiotic care"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Visit Date *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Diagnosis</label>
                <input
                  type="text"
                  placeholder="e.g. Mild dermatitis"
                  value={form.diagnosis}
                  onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Prescription / Medication</label>
                <input
                  type="text"
                  placeholder="e.g. Antiseptic spray 2x daily for 5 days"
                  value={form.medication}
                  onChange={(e) => setForm({ ...form, medication: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Detailed Observations & Recommendations</label>
              <textarea
                rows="4"
                placeholder="Enter clinical observations, lab notes, and home-care advice..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-emerald-800 py-3 font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
            >
              {submitting ? 'Saving Treatment Note...' : 'Save Treatment Note'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
