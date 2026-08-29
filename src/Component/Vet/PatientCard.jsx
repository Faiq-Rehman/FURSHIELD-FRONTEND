import { PawPrint, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultPetImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function PatientCard({ pet }) {
  if (!pet) return null;

  const id = pet._id || pet.id;
  const name = pet.name || 'Patient Pet';
  const species = pet.species || 'Pet';
  const breed = pet.breed || 'Breed N/A';
  const ownerName = pet.owner?.fullName || pet.owner?.name || 'Owner';
  const img = pet.profilePicture || pet.image || defaultPetImg;

  return (
    <div className="rounded-2xl bg-[#111318] p-4 shadow-2xl border border-white/10 flex items-center gap-4 glass-metal-hover">
      <img src={img} alt={name} className="h-14 w-14 rounded-xl object-cover bg-[#181B21] shrink-0 border border-white/10" />
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-[#F5F5F5] text-sm uppercase tracking-wider truncate">{name}</h3>
        <p className="text-xs text-[#A7ADB7]">{species} · {breed}</p>
        <p className="text-[11px] text-[#C8A96B] font-bold flex items-center gap-1 mt-1">
          <User size={12} /> Owner: {ownerName}
        </p>
      </div>
      <Link
        to={`/vet/patients/${id}`}
        className="p-2.5 rounded-xl border border-white/10 bg-[#181B21] text-[#A7ADB7] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-colors"
        title="View Patient Record"
      >
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
