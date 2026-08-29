import { CalendarDays, Clock, User, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
    case 'approved':
      return 'bg-[#3FA66B]/20 text-[#3FA66B] border-[#3FA66B]/40';
    case 'completed':
      return 'bg-[#8EA3B7]/20 text-[#8EA3B7] border-[#8EA3B7]/40';
    case 'cancelled':
      return 'bg-[#C94B4B]/20 text-[#C94B4B] border-[#C94B4B]/40';
    default:
      return 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]/40';
  }
};

export default function AppointmentCard({ appointment, linkPrefix = '/owner/appointments' }) {
  if (!appointment) return null;

  const id = appointment._id || appointment.id;
  const vetName = appointment.vet?.fullName || appointment.vet?.name || appointment.vetName || 'Veterinarian';
  const petName = appointment.pet?.name || appointment.petName || 'Pet';
  const ownerName = appointment.owner?.fullName || appointment.owner?.name || appointment.user?.fullName || appointment.user?.name || 'Owner';
  const dateVal = appointment.appointmentDate || appointment.date;
  const formattedDate = dateVal ? new Date(dateVal).toLocaleDateString() : 'Date pending';

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111318] p-5 shadow-2xl glass-metal-hover flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="font-black text-[#F5F5F5] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <User size={16} className="text-[#C8A96B] shrink-0" />
              Dr. {vetName}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#A7ADB7] flex items-center gap-1">
              <PawPrint size={14} className="text-[#6F7682] shrink-0" />
              Pet: <strong className="text-[#F5F5F5]">{petName}</strong>
            </p>
          </div>
          <span className={`uppercase tracking-widest rounded px-2.5 py-0.5 text-[9px] font-black border ${getStatusColor(appointment.status)}`}>
            {appointment.status || 'Pending'}
          </span>
        </div>

        <div className="grid gap-1.5 text-xs text-[#A7ADB7] bg-[#181B21] p-3 rounded-xl border border-white/5">
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="text-[#8EA3B7] shrink-0" />
            <span>Date: <strong className="text-[#F5F5F5]">{formattedDate}</strong></span>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} className="text-[#8EA3B7] shrink-0" />
            <span>Time: <strong className="text-[#F5F5F5]">{appointment.time || '10:00 AM'}</strong></span>
          </span>
          {appointment.reason && (
            <p className="mt-1 text-[11px] text-[#A7ADB7] italic">
              "{appointment.reason}"
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
        <Link to={`${linkPrefix}/${id}`} className="font-black uppercase tracking-wider text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
          View Details →
        </Link>
      </div>
    </div>
  );
}
