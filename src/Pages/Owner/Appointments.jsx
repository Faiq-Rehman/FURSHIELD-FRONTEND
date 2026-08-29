import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CalendarDays, Plus, Clock, User, PawPrint } from 'lucide-react';
import AppointmentCard from '../../Component/Owner/AppointmentCard';
import { getMyAppointments, createAppointment } from '../../Services/appointmentApi';
import { getVets } from '../../Services/vetApi';
import { getMyPets } from '../../Services/petApi';

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const preselectedVetId = searchParams.get('vet') || '';

  const [appointments, setAppointments] = useState([]);
  const [vets, setVets] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(Boolean(preselectedVetId));

  const [form, setForm] = useState({
    vet: preselectedVetId,
    pet: '',
    date: '',
    time: '10:00 AM',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [apptsRes, vetsRes, petsRes] = await Promise.all([
        getMyAppointments().catch(() => ({ data: { appointments: [] } })),
        getVets().catch(() => ({ data: { vets: [] } })),
        getMyPets().catch(() => ({ data: { pets: [] } }))
      ]);

      setAppointments(apptsRes.data?.appointments || []);
      setVets(vetsRes.data?.vets || []);
      const petList = petsRes.data?.pets || [];
      setPets(petList);

      if (petList.length > 0 && !form.pet) {
        setForm((f) => ({ ...f, pet: petList[0]._id || petList[0].id }));
      }
      if (vetsRes.data?.vets?.length > 0 && !form.vet) {
        setForm((f) => ({ ...f, vet: vetsRes.data.vets[0]._id || vetsRes.data.vets[0].id }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointment schedule.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.vet || !form.pet || !form.date || !form.time) {
      setError('Please select a vet, pet, date, and time.');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await createAppointment(form);
      if (data.appointment) {
        setAppointments([...appointments, data.appointment]);
      }
      setShowModal(false);
      setForm((f) => ({ ...f, reason: '', date: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate-500">Book and manage veterinary appointments.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-900"
        >
          <Plus size={18} /> Request Visit
        </button>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center border border-slate-100 shadow-sm">
          <CalendarDays className="mx-auto text-slate-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No appointments scheduled</h3>
          <p className="mt-1 text-sm text-slate-500">Book a visit with a veterinarian for checkups or treatments.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 inline-block rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white"
          >
            Request your first visit
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {appointments.map((appt) => (
            <AppointmentCard key={appt._id || appt.id} appointment={appt} />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900">Request Veterinary Visit</h2>

            {pets.length === 0 ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-sm font-semibold text-slate-700">You must register a pet before requesting an appointment.</p>
                <Link to="/owner/pets/add" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white">
                  Add Pet Profile
                </Link>
              </div>
            ) : vets.length === 0 ? (
              <div className="text-center py-4 text-slate-500 text-sm">
                No veterinarians are currently available in the directory.
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Select Veterinarian *</label>
                  <select
                    value={form.vet}
                    onChange={(e) => setForm({ ...form, vet: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white"
                    required
                  >
                    {vets.map((v) => (
                      <option key={v._id || v.id} value={v._id || v.id}>
                        {v.fullName || v.name} ({v.phone || v.email})
                      </option>
                    ))}
                  </select>
                </div>

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
                    <label className="block text-sm font-bold text-slate-700 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Preferred Time *</label>
                    <select
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Reason for Visit</label>
                  <textarea
                    rows="3"
                    placeholder="Describe symptoms, routine checkup, vaccination needs..."
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-emerald-800 py-2.5 text-sm font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
                  >
                    {submitting ? 'Booking Visit...' : 'Confirm Appointment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
