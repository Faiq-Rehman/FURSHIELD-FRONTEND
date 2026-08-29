import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { getAdoptionListingById } from '../../Services/adoptionApi';

const defaultPetImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80';

export default function AdoptionDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    getAdoptionListingById(id)
      .then(({ data }) => setListing(data.listing))
      .catch((err) => setError(err.response?.data?.message || 'Adoption details unavailable.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading adoption details...</div>;
  }

  if (error || !listing) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Adoption listing not found.'}</p>
        <Link to="/adoptions" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to adoptions
        </Link>
      </div>
    );
  }

  const petName = listing.petName || listing.name || 'Adoptable Pet';
  const shelter = listing.shelter || {};
  const shelterName = shelter.fullName || shelter.name || 'Verified Shelter Partner';
  const img = listing.image || defaultPetImg;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-6">
      <Link to="/adoptions" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to adoptions
      </Link>

      <div className="grid gap-8 md:grid-cols-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 items-center">
        <img className="h-96 w-full rounded-2xl object-cover" src={img} alt={petName} />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {shelterName}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 capitalize">
              {listing.status || 'Available'}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold text-slate-900">Meet {petName}</h1>
          <p className="text-sm font-semibold text-slate-600">
            {listing.species || 'Pet'} · {listing.breed || 'Breed N/A'} · {listing.age !== undefined ? `${listing.age} years old` : ''} ({listing.gender || 'N/A'})
          </p>

          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
            {listing.healthStatus && (
              <p className="flex items-center gap-2">
                <Shield size={15} className="text-emerald-700 shrink-0" />
                <span>Health Status: <strong>{listing.healthStatus}</strong></span>
              </p>
            )}
            {shelter.phone && (
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-slate-400 shrink-0" />
                <span>Shelter Contact: <strong>{shelter.phone}</strong></span>
              </p>
            )}
            {shelter.address && (
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-slate-400 shrink-0" />
                <span>Location: <strong>{shelter.address}</strong></span>
              </p>
            )}
          </div>

          <p className="leading-relaxed text-slate-600 text-sm">
            {listing.description || `${petName} is looking for a patient, caring home and a family ready to share the small joys of everyday life.`}
          </p>

          <div className="pt-4">
            {applied ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-800">
                Adoption interest submitted! The shelter will reach out.
              </div>
            ) : (
              <button
                onClick={() => setApplied(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-900"
              >
                <Heart size={18} /> Express Adoption Interest
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
