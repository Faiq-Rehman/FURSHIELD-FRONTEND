import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, User, PawPrint } from 'lucide-react';
import { getAppointmentById, updateAppointmentStatus } from '../../Services/appointmentApi';

export default function VetAppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleStatusChange = async (status) => {
    try {
      const { data } = await updateAppointmentStatus(id, status);
      if (data.appointment) setAppointment(data.appointment);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading appointment...</div>;
  }

  if (error || !appointment) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Appointment not found.'}</p>
        <Link to="/vet/appointments" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to appointments
        </Link>
      </div>
    );
  }

  const petName = appointment.pet?.name || 'Pet';
  const ownerName = appointment.user?.fullName || appointment.user?.name || 'Client';
  const status = appointment.status?.toLowerCase() || 'pending';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/vet/appointments" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to appointments
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Visit Details</span>
            <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">Patient: {petName}</h1>
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
            <User size={18} className="text-emerald-700" />
            <div>
              <p className="text-xs font-semibold text-slate-400">Client / Owner</p>
              <p className="font-bold text-slate-800 text-sm">{ownerName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <PawPrint size={18} className="text-emerald-700" />
            <div>
              <p className="text-xs font-semibold text-slate-400">Pet Species</p>
              <p className="font-bold text-slate-800 text-sm">{appointment.pet?.species || 'Pet'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <CalendarDays size={18} className="text-emerald-700" />
            <div>
              <p className="text-xs font-semibold text-slate-400">Scheduled Date</p>
              <p className="font-bold text-slate-800 text-sm">
                {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
            <Clock size={18} className="text-emerald-700" />
            <div>
              <p className="text-xs font-semibold text-slate-400">Scheduled Time</p>
              <p className="font-bold text-slate-800 text-sm">{appointment.time || 'N/A'}</p>
            </div>
          </div>
        </div>

        {appointment.reason && (
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Reason / Symptoms</p>
            <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl">{appointment.reason}</p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end">
          <button
            onClick={() => handleStatusChange('confirmed')}
            className="rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900"
          >
            Confirm Appointment
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
          >
            Complete Appointment
          </button>
          <button
            onClick={() => handleStatusChange('cancelled')}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
          >
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
