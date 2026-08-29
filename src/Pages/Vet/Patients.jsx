import { useEffect, useState } from 'react';
import { Search, PawPrint } from 'lucide-react';
import PatientCard from '../../Component/Vet/PatientCard';
import { getMyAppointments } from '../../Services/appointmentApi';

export default function Patients() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getMyAppointments()
      .then(({ data }) => setAppointments(data.appointments || []))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load patients.'))
      .finally(() => setLoading(false));
  }, []);

  const patientsMap = new Map();
  appointments.forEach(a => {
    if (a.pet && (a.pet._id || a.pet.id)) {
      const pId = a.pet._id || a.pet.id;
      if (!patientsMap.has(pId)) {
        patientsMap.set(pId, { ...a.pet, owner: a.user });
      }
    }
  });

  const patientsList = Array.from(patientsMap.values()).filter(p => {
    const text = `${p.name} ${p.species} ${p.breed} ${p.owner?.fullName || p.owner?.name}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-4xl font-bold text-slate-900">Assigned Patients</h1>
        <p className="mt-1 text-sm text-slate-500">Pets seen during clinical appointments and consultations.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by pet name, breed, or owner..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 py-12 text-center">Loading patient directory...</p>
      ) : patientsList.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100">
          <PawPrint className="mx-auto text-slate-300 mb-3" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No patients found</h3>
          <p className="text-sm text-slate-500 mt-1">Patients will appear here once visits are scheduled.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {patientsList.map((patient) => (
            <PatientCard key={patient._id || patient.id} pet={patient} />
          ))}
        </div>
      )}
    </div>
  );
}
