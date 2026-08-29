import { CalendarDays, HeartPulse, PawPrint, ShoppingBag, Plus, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../../Component/Owner/PetCard';
import AppointmentCard from '../../Component/Owner/AppointmentCard';
import { useAuth } from '../../Context/AuthContext';
import { getMyPets } from '../../Services/petApi';
import { getMyAppointments } from '../../Services/appointmentApi';
import { getMyOrders } from '../../Services/OrderApi';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getMyPets().catch(() => ({ data: { pets: [] } })),
      getMyAppointments().catch(() => ({ data: { appointments: [] } })),
      getMyOrders().catch(() => ({ data: { orders: [] } }))
    ]).then(([petsRes, apptsRes, ordersRes]) => {
      if (isMounted) {
        setPets(petsRes.data?.pets || []);
        setAppointments(apptsRes.data?.appointments || []);
        setOrders(ordersRes.data?.orders || []);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, []);

  const todayStr = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const ownerName = user?.fullName || user?.name || 'Pet Caregiver';
  const upcomingAppt = appointments.find(a => a.status !== 'cancelled') || appointments[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111318] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#C8A96B] bg-[#181B21] px-3.5 py-1 rounded border border-[#C8A96B]/30 inline-block">
            {todayStr}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#F5F5F5] pt-1">
            Welcome Back, {ownerName}
          </h1>
          <p className="text-xs text-[#A7ADB7] font-medium">
            Manage your registered pets, medical reminders, and clinic appointments.
          </p>
        </div>

        <Link
          to="/owner/pets/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-5 py-3.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add New Pet
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">REGISTERED PETS</p>
            <p className="mt-2 text-3xl font-black text-[#C8A96B]">{loading ? '...' : pets.length}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center">
            <PawPrint size={24} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">UPCOMING VISITS</p>
            <p className="mt-2 text-3xl font-black text-[#8EA3B7]">
              {loading ? '...' : appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length}
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#8EA3B7] border border-[#8EA3B7]/30 grid place-items-center">
            <CalendarDays size={24} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 glass-metal-hover flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">CARE ORDERS</p>
            <p className="mt-2 text-3xl font-black text-[#3FA66B]">{loading ? '...' : orders.length}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#3FA66B] border border-[#3FA66B]/30 grid place-items-center">
            <ShoppingBag size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 xl:grid-cols-[1.3fr_.7fr]">
        {/* Pets Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-black uppercase tracking-wider text-[#F5F5F5] flex items-center gap-2">
              <PawPrint size={18} className="text-[#C8A96B]" />
              Your Family Pets
            </h2>
            <Link to="/owner/pets" className="text-xs font-black uppercase tracking-wider text-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
              View All ({pets.length})
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-[#A7ADB7]">Loading pet profiles...</p>
          ) : pets.length === 0 ? (
            <div className="rounded-2xl bg-[#111318] p-8 text-center border border-white/10 shadow-2xl space-y-3">
              <PawPrint className="mx-auto text-[#6F7682]" size={40} />
              <h3 className="font-bold text-sm text-[#F5F5F5]">No pets added yet</h3>
              <p className="text-xs text-[#A7ADB7] max-w-sm mx-auto">
                Register your dog, cat, or other pet to start tracking vaccinations and clinic appointments.
              </p>
              <Link to="/owner/pets/add" className="inline-block rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-md">
                Add Pet Profile
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {pets.slice(0, 4).map(p => (
                <PetCard key={p._id || p.id} pet={p} />
              ))}
            </div>
          )}
        </div>

        {/* Schedule Sidebar */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-black uppercase tracking-wider text-[#F5F5F5] flex items-center gap-2">
              <CalendarDays size={18} className="text-[#8EA3B7]" />
              Next Scheduled Visit
            </h2>
            <Link to="/owner/appointments" className="text-xs font-black uppercase tracking-wider text-[#8EA3B7] hover:text-[#F5F5F5] transition-colors">
              Schedule
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-[#A7ADB7]">Loading visit details...</p>
          ) : upcomingAppt ? (
            <AppointmentCard appointment={upcomingAppt} />
          ) : (
            <div className="rounded-2xl bg-[#111318] p-6 text-center border border-white/10 shadow-2xl space-y-3">
              <CalendarDays className="mx-auto text-[#6F7682]" size={36} />
              <h3 className="font-bold text-sm text-[#F5F5F5]">No upcoming clinic visits</h3>
              <p className="text-xs text-[#A7ADB7]">Book a check-up with certified veterinarians anytime.</p>
              <Link to="/vets" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-md">
                Find Vets <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
