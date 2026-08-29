import { CalendarPlus, MapPin, Stethoscope, Phone, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultVetImg = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80';

export default function VetCard({ vet }) {
  if (!vet) return null;

  const id = vet._id || vet.id;
  const name = vet.fullName || vet.name || 'Veterinarian';
  const location = vet.address || vet.location || 'Karachi, Pakistan';
  const img = vet.profilePicture || vet.image || defaultVetImg;

  return (
    <article className="group rounded-2xl bg-[#111318] shadow-2xl border border-white/10 glass-metal-hover flex flex-col justify-between overflow-hidden">
      <div>
        <div className="relative overflow-hidden aspect-4/3 bg-[#181B21]">
          <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95" />
          <span className="absolute top-3 left-3 bg-[#08090B]/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest text-[#8EA3B7] border border-[#8EA3B7]/30 flex items-center gap-1">
            <Stethoscope size={12} /> Specialist
          </span>
          <span className="absolute bottom-3 right-3 bg-[#181B21]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30 flex items-center gap-1">
            <Star size={11} fill="currentColor" /> 4.9 Verified
          </span>
        </div>

        <div className="p-6 space-y-3">
          <div>
            <h3 className="font-black text-lg text-[#F5F5F5] uppercase tracking-wider group-hover:text-[#8EA3B7] transition-colors">
              {name}
            </h3>
            <p className="text-xs font-bold text-[#8EA3B7] flex items-center gap-1.5 mt-1">
              <ShieldCheck size={15} /> Licensed Clinical Vet Surgeon
            </p>
          </div>

          <div className="space-y-1.5 pt-1 text-xs text-[#A7ADB7]">
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-[#6F7682] shrink-0" />
              <span className="truncate">{location}</span>
            </p>
            {vet.phone && (
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-[#6F7682] shrink-0" />
                <span>{vet.phone}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10 mt-2">
        <Link to={`/vets/${id}`} className="text-xs font-black uppercase tracking-wider text-[#A7ADB7] hover:text-[#F5F5F5] flex items-center gap-1 transition-colors">
          View Clinic <ArrowRight size={14} />
        </Link>
        <Link
          to={`/owner/appointments?vet=${id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all cursor-pointer"
        >
          <CalendarPlus size={15} /> Book Consult
        </Link>
      </div>
    </article>
  );
}
