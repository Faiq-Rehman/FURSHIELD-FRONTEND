import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, User, PawPrint, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { getAppointmentById, cancelAppointment } from '../../Services/appointmentApi';

export default function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const loadAppointment = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getAppointmentById(id);
      setAppointment(data.appointment);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointment details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointment();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    setCancelling(true);
    try {
      const { data } = await cancelAppointment(id);
      if (data.appointment) {
        setAppointment(data.appointment);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel appointment.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading appointment details...</div>;
  }

  if (error || !appointment) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Appointment not found.'}</p>
        <Link to="/owner/appointments" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to appointments
        </Link>
      </div>
    );
  }

  const vetName = appointment.vet?.fullName || appointment.vet?.name || 'Veterinarian';
  const petName = appointment.pet?.name || 'Pet';
  const status = appointment.status?.toLowerCase() || 'pending';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/owner/appointments" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to appointments
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Appointment Details</span>
            <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">Visit for {petName}</h1>
          </div>
          <span
            className={`capitalize rounded-full px-3.5 py-1 text-xs font-bold border ${
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

        <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-xs">
              <User size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">Veterinarian</p>
              <p className="font-bold text-slate-800 text-sm">{vetName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-xs">
              <PawPrint size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">Patient Pet</p>
              <p className="font-bold text-slate-800 text-sm">{petName} ({appointment.pet?.species || 'Pet'})</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-xs">
              <CalendarDays size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">Date</p>
              <p className="font-bold text-slate-800 text-sm">
                {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'TBD'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-xs">
              <Clock size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-400">Time</p>
              <p className="font-bold text-slate-800 text-sm">{appointment.time || 'TBD'}</p>
            </div>
          </div>
        </div>

        {appointment.reason && (
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reason for Visit</p>
            <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl">{appointment.reason}</p>
          </div>
        )}

        {appointment.notes && (
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Veterinary Notes</p>
            <p className="text-sm text-slate-700 bg-emerald-50/50 p-3.5 rounded-xl">{appointment.notes}</p>
          </div>
        )}

        {status !== 'cancelled' && status !== 'completed' && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-60"
            >
              {cancelling ? 'Cancelling...' : 'Cancel Appointment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
