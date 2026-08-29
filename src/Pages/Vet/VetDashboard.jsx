import { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle, Clock, PawPrint, User, Stethoscope, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PatientCard from '../../Component/Vet/PatientCard';
import { useAuth } from '../../Context/AuthContext';
import { getMyAppointments, updateAppointmentStatus } from '../../Services/appointmentApi';

export default function VetDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getMyAppointments();
      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointment schedule.');
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
      setAppointments(appointments.map(a => (a._id === id || a.id === id ? { ...a, status } : a)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const vetName = user?.fullName || user?.name || 'Doctor';
  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  const patientsMap = new Map();
  appointments.forEach(a => {
    if (a.pet && (a.pet._id || a.pet.id)) {
      const pId = a.pet._id || a.pet.id;
      if (!patientsMap.has(pId)) {
        patientsMap.set(pId, { ...a.pet, owner: a.user });
      }
    }
  });
  const patientsList = Array.from(patientsMap.values());

  return (
    <div className="space-y-8">
      {/* Practice Header */}
      <div className="bg-[#111318] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#8EA3B7] border border-[#8EA3B7]/30">
            <Stethoscope size={14} className="text-[#8EA3B7]" />
            CLINICAL MEDICAL CONSOLE
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#F5F5F5] pt-1">
            Dr. {vetName}'s Practice
          </h1>
          <p className="text-xs text-[#A7ADB7] font-medium">
            Manage patient consultations, digital prescriptions, and checkup schedules with clinical precision.
          </p>
        </div>

        <Link
          to="/vet/availability"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3E4A57] to-[#8EA3B7] hover:from-[#4F5D6D] hover:to-[#A1B6CB] px-5 py-3.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all shrink-0 cursor-pointer"
        >
          Manage Availability
        </Link>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B]">
          {error}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">TOTAL VISITS</p>
            <p className="mt-2 text-3xl font-black text-[#8EA3B7]">{loading ? '...' : appointments.length}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#8EA3B7] border border-[#8EA3B7]/30 grid place-items-center">
            <CalendarDays size={24} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">PENDING REQUESTS</p>
            <p className="mt-2 text-3xl font-black text-[#D6A84F]">{loading ? '...' : pendingCount}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#D6A84F] border border-[#D6A84F]/30 grid place-items-center">
            <Clock size={24} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">UNIQUE PATIENTS</p>
            <p className="mt-2 text-3xl font-black text-[#C8A96B]">{loading ? '...' : patientsList.length}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center">
            <PawPrint size={24} />
          </div>
        </div>
      </div>

      {/* Appointment Queue */}
      <div className="grid gap-8 xl:grid-cols-[1.3fr_.7fr]">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-black uppercase tracking-wider text-[#F5F5F5] flex items-center gap-2">
              <CalendarDays size={18} className="text-[#8EA3B7]" />
              Clinical Consultation Queue
            </h2>
            <Link to="/vet/appointments" className="text-xs font-black uppercase tracking-wider text-[#8EA3B7] hover:text-[#F5F5F5] transition-colors">
              Manage Queue
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-[#A7ADB7]">Loading clinical schedule...</p>
          ) : appointments.length === 0 ? (
            <div className="rounded-2xl bg-[#111318] p-8 text-center border border-white/10 shadow-2xl space-y-2">
              <CalendarDays className="mx-auto text-[#6F7682]" size={40} />
              <h3 className="font-bold text-sm text-[#F5F5F5]">No appointments scheduled</h3>
              <p className="text-xs text-[#A7ADB7]">New client booking requests will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 5).map((appt) => {
                const apptId = appt._id || appt.id;
                return (
                  <div key={apptId} className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="font-extrabold text-[#F5F5F5] text-base">
                          Patient: {appt.pet?.name || 'Pet'} ({appt.pet?.species || 'Animal'})
                        </h3>
                        <p className="text-xs text-[#A7ADB7] mt-0.5">
                          Owner: <strong>{appt.user?.fullName || appt.user?.name || 'Client'}</strong> · Phone: {appt.user?.phone || 'N/A'}
                        </p>
                      </div>
                      <span className="uppercase tracking-widest rounded px-2.5 py-0.5 text-[9px] font-black bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/40">
                        {appt.status || 'Pending'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-[#A7ADB7] bg-[#181B21] p-3 rounded-xl border border-white/5">
                      <span>Date: <strong className="text-[#F5F5F5]">{appt.date ? new Date(appt.date).toLocaleDateString() : 'N/A'}</strong></span>
                      <span>Time: <strong className="text-[#F5F5F5]">{appt.time || 'N/A'}</strong></span>
                      {appt.reason && <span>Reason: <em className="text-[#8EA3B7]">"{appt.reason}"</em></span>}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleStatusChange(apptId, 'confirmed')}
                        className="rounded-xl bg-gradient-to-r from-[#3E4A57] to-[#8EA3B7] hover:from-[#4F5D6D] hover:to-[#A1B6CB] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-sm cursor-pointer"
                      >
                        Confirm Visit
                      </button>
                      <button
                        onClick={() => handleStatusChange(apptId, 'completed')}
                        className="rounded-xl bg-[#3FA66B]/20 hover:bg-[#3FA66B]/30 border border-[#3FA66B]/40 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#3FA66B] cursor-pointer"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => handleStatusChange(apptId, 'cancelled')}
                        className="rounded-xl bg-[#C94B4B]/20 hover:bg-[#C94B4B]/30 border border-[#C94B4B]/40 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#C94B4B] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Patients Sidebar */}
        <div className="space-y-4">
          <h2 className="text-base font-black uppercase tracking-wider text-[#F5F5F5] flex items-center gap-2">
            <PawPrint size={18} className="text-[#C8A96B]" />
            Recent Patients
          </h2>
          {patientsList.length === 0 ? (
            <div className="rounded-2xl bg-[#111318] p-6 text-center border border-white/10 shadow-2xl text-xs text-[#A7ADB7]">
              No patient records found.
            </div>
          ) : (
            <div className="space-y-3">
              {patientsList.slice(0, 4).map((patient) => (
                <PatientCard key={patient._id || patient.id} pet={patient} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
