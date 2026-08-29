import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultPetImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function ShelterPetCard({ listing, onDelete }) {
  if (!listing) return null;

  const id = listing._id || listing.id;
  const petName = listing.petName || listing.name || 'Adoptable Pet';
  const img = listing.image || defaultPetImg;

  return (
    <article className="overflow-hidden rounded-2xl bg-[#111318] shadow-2xl border border-white/10 flex flex-col justify-between glass-metal-hover">
      <div>
        <div className="relative h-48 w-full overflow-hidden">
          <img src={img} alt={petName} className="h-full w-full object-cover filter brightness-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent opacity-60" />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-black text-[#F5F5F5] text-base uppercase tracking-wider">{petName}</h3>
              <p className="text-xs text-[#A7ADB7]">{listing.species} · {listing.breed || 'Breed N/A'}</p>
            </div>
            <span className="rounded px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/40">
              {listing.status || 'Available'}
            </span>
          </div>
          {listing.healthStatus && (
            <p className="text-xs font-semibold text-[#A7ADB7] bg-[#181B21] p-2.5 rounded-xl border border-white/5 truncate">
              Health: <span className="text-[#F5F5F5]">{listing.healthStatus}</span>
            </p>
          )}
        </div>
      </div>

      <div className="p-4 pt-2 border-t border-white/10 flex items-center justify-between">
        <Link to={`/adoptions/${id}`} className="text-xs font-black uppercase tracking-wider text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
          Public View →
        </Link>
        <div className="flex items-center gap-2">
          <Link to={`/shelter/pets/${id}/edit`} className="p-1.5 text-[#A7ADB7] hover:text-[#C8A96B] transition-colors" title="Edit Listing">
            <Edit size={16} />
          </Link>
          {onDelete && (
            <button onClick={() => onDelete(id)} className="p-1.5 text-[#6F7682] hover:text-[#C94B4B] transition-colors" title="Delete Listing">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
