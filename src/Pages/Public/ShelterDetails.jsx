import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Store, MapPin, Phone, Mail, PawPrint } from 'lucide-react';
import { getShelterById } from '../../Services/shelterApi';
import { getAdoptionListings } from '../../Services/adoptionApi';

const defaultPetImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function ShelterDetails() {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    Promise.all([
      getShelterById(id),
      getAdoptionListings().catch(() => ({ data: { listings: [] } }))
    ])
      .then(([shelterRes, listingsRes]) => {
        setShelter(shelterRes.data.shelter);
        const shelterListings = (listingsRes.data?.listings || []).filter(
          (l) => (l.shelter?._id || l.shelter?.id || l.shelter) === id
        );
        setListings(shelterListings);
      })
      .catch((err) => setError(err.response?.data?.message || 'Shelter details unavailable.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading shelter profile...</div>;
  }

  if (error || !shelter) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Shelter not found.'}</p>
        <Link to="/shelters" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to shelters
        </Link>
      </div>
    );
  }

  const name = shelter.fullName || shelter.name || 'Shelter Partner';

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-8">
      <Link to="/shelters" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to shelter directory
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5 w-fit">
              <Store size={14} /> Verified Shelter Partner
            </span>
            <h1 className="font-display text-4xl font-bold text-slate-900">{name}</h1>
          </div>
          {shelter.phone && (
            <a
              href={`tel:${shelter.phone}`}
              className="rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-900"
            >
              Contact Shelter
            </a>
          )}
        </div>

        <p className="leading-relaxed text-slate-600 text-sm max-w-3xl">
          We provide temporary homes, health support, rehabilitation, and careful family matching for rescue animals in the community.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400 shrink-0" />
            <span>Address: <strong className="text-slate-800">{shelter.address || 'Karachi, Pakistan'}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-slate-400 shrink-0" />
            <span>Phone: <strong className="text-slate-800">{shelter.phone || 'N/A'}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-slate-400 shrink-0" />
            <span>Email: <strong className="text-slate-800">{shelter.email || 'N/A'}</strong></span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Pets Available for Adoption at {name}</h2>

        {listings.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center border border-slate-100 text-slate-500">
            <PawPrint className="mx-auto text-slate-300 mb-2" size={32} />
            <p className="text-sm font-semibold">No active adoption listings from this shelter right now.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => {
              const lId = item._id || item.id;
              const petName = item.petName || item.name || 'Adoptable Pet';
              const img = item.image || defaultPetImg;

              return (
                <article key={lId} className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <img className="h-48 w-full object-cover" src={img} alt={petName} />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-slate-900">{petName}</h3>
                      <p className="text-xs text-slate-500">{item.species} · {item.breed || 'Breed N/A'}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <Link
                      to={`/adoptions/${lId}`}
                      className="block text-center rounded-xl bg-emerald-800 py-2 text-xs font-bold text-white hover:bg-emerald-900"
                    >
                      View Pet Profile →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
