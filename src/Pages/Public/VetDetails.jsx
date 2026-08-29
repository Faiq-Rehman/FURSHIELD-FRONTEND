import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarPlus, MapPin, Phone, Mail, Stethoscope } from 'lucide-react';
import { getVetById } from '../../Services/vetApi';

const defaultVetImg = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80';

export default function VetDetails() {
  const { id } = useParams();
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getVetById(id)
      .then(({ data }) => setVet(data.vet))
      .catch((err) => setError(err.response?.data?.message || 'Veterinarian details unavailable.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading veterinarian details...</div>;
  }

  if (error || !vet) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Veterinarian not found.'}</p>
        <Link to="/vets" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to vet directory
        </Link>
      </div>
    );
  }

  const vetId = vet._id || vet.id;
  const name = vet.fullName || vet.name || 'Veterinarian';
  const img = vet.profilePicture || vet.image || defaultVetImg;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-6">
      <Link to="/vets" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to vet directory
      </Link>

      <div className="grid gap-8 md:grid-cols-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 items-center">
        <img className="h-96 w-full rounded-2xl object-cover" src={img} alt={name} />

        <div className="space-y-4">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5 w-fit">
            <Stethoscope size={14} /> Registered Veterinarian
          </span>

          <h1 className="font-display text-4xl font-bold text-slate-900">{name}</h1>

          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
            {vet.address && (
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-slate-400 shrink-0" />
                <span>Clinic / Location: <strong>{vet.address}</strong></span>
              </p>
            )}
            {vet.phone && (
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-slate-400 shrink-0" />
                <span>Contact Phone: <strong>{vet.phone}</strong></span>
              </p>
            )}
            {vet.email && (
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-slate-400 shrink-0" />
                <span>Contact Email: <strong>{vet.email}</strong></span>
              </p>
            )}
          </div>

          <p className="leading-relaxed text-slate-600 text-sm">
            Offering compassionate, professional veterinary care, routine wellness checkups, and diagnostic support for pet families.
          </p>

          <div className="pt-4">
            <Link
              to={`/owner/appointments?vet=${vetId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-900"
            >
              <CalendarPlus size={18} /> Request Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
