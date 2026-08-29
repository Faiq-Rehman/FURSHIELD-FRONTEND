import { HeartPulse, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultPetImage = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function PetCard({ pet, onDelete }) {
  const id = pet._id || pet.id;
  const image = pet.profilePicture || pet.image || defaultPetImage;
  const ageDisplay = pet.age ? `${pet.age} yrs` : 'Age not specified';

  return (
    <article className="overflow-hidden rounded-2xl bg-[#111318] shadow-2xl border border-white/10 flex flex-col justify-between glass-metal-hover">
      <div>
        <div className="relative h-44 w-full overflow-hidden">
          <img src={image} alt={pet.name} className="h-full w-full object-cover filter brightness-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent opacity-60" />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-black text-[#F5F5F5] uppercase tracking-wider">{pet.name}</h3>
              <p className="text-xs text-[#A7ADB7] font-medium">{pet.species} {pet.breed ? `· ${pet.breed}` : ''}</p>
            </div>
            <span className="rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#C8A96B]/20 text-[#C8A96B] border border-[#C8A96B]/40">
              {ageDisplay}
            </span>
          </div>
          {pet.medicalHistory && (
            <p className="flex items-center gap-2 rounded-xl bg-[#181B21] p-2.5 text-xs font-semibold text-[#8EA3B7] border border-white/5">
              <HeartPulse size={15} className="shrink-0 text-[#C8A96B]" />
              <span className="truncate">{pet.medicalHistory}</span>
            </p>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-black uppercase tracking-wider">
        <Link to={`/owner/pets/${id}`} className="text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
          View Profile →
        </Link>
        <div className="flex items-center gap-2">
          <Link to={`/owner/pets/${id}/edit`} className="p-1.5 text-[#A7ADB7] hover:text-[#C8A96B] transition-colors" title="Edit Pet">
            <Edit size={16} />
          </Link>
          {onDelete && (
            <button onClick={() => onDelete(id)} className="p-1.5 text-[#6F7682] hover:text-[#C94B4B] transition-colors" title="Delete Pet">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
