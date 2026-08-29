import { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle, Clock, PawPrint } from 'lucide-react';
import { getMyAppointments, updateAppointmentStatus } from '../../Services/appointmentApi';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const loadAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getMyAppointments();
      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(appointments.map(a => ((a._id === id || a.id === id) ? { ...a, status } : a)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const filtered = filterStatus === 'All'
    ? appointments
    : appointments.filter(a => a.status?.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900">Practice Appointments</h1>
        <p className="mt-1 text-sm text-slate-500">Manage patient schedules, visit status, and consultation requests.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition capitalize ${
              filterStatus === st
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 py-12 text-center">Loading practice schedule...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100">
          <CalendarDays className="mx-auto text-slate-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No appointments found</h3>
          <p className="text-sm text-slate-500 mt-1">No appointments match the selected filter status.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((appt) => {
            const apptId = appt._id || appt.id;
            const status = appt.status?.toLowerCase() || 'pending';
            const petName = appt.pet?.name || 'Patient Pet';
            const ownerName = appt.user?.fullName || appt.user?.name || 'Client';

            return (
              <div key={apptId} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-3">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {petName} <span className="text-xs font-normal text-slate-500">({appt.pet?.species || 'Pet'})</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Client: <strong>{ownerName}</strong> · Phone: {appt.user?.phone || 'N/A'} · Email: {appt.user?.email || 'N/A'}
                    </p>
                  </div>
                  <span
                    className={`capitalize rounded-full px-3 py-1 text-xs font-bold border ${
                      status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : status === 'completed'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : status === 'cancelled'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <span>Date: <strong>{appt.date ? new Date(appt.date).toLocaleDateString() : 'N/A'}</strong></span>
                  <span>Time: <strong>{appt.time || 'N/A'}</strong></span>
                  {appt.reason && <span>Reason: <em>"{appt.reason}"</em></span>}
                </div>

                <div className="flex flex-wrap gap-2 pt-1 justify-end">
                  {status !== 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(apptId, 'confirmed')}
                      className="rounded-lg bg-emerald-800 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-900"
                    >
                      Confirm
                    </button>
                  )}
                  {status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(apptId, 'completed')}
                      className="rounded-lg bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-800"
                    >
                      Mark Completed
                    </button>
                  )}
                  {status !== 'cancelled' && (
                    <button
                      onClick={() => handleStatusChange(apptId, 'cancelled')}
                      className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
