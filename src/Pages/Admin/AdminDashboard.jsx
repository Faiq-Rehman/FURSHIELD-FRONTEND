import { 
  BarChart3, 
  CalendarDays, 
  Package, 
  PawPrint, 
  RefreshCw, 
  ShoppingBag, 
  Store, 
  Users, 
  ShieldCheck, 
  Sparkles,
  UserCheck,
  Stethoscope,
  Clock
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getAdminOverview } from '../../Services/adminApi';

const resources = [
  ['users', 'Total Users', Users],
  ['pets', 'Registered Pets', PawPrint],
  ['products', 'Store Products', Package],
  ['adoptions', 'Adoption Listings', PawPrint],
  ['appointments', 'Clinic Appointments', CalendarDays],
  ['orders', 'Product Orders', ShoppingBag],
  ['shelters', 'Partner Shelters', Store],
];

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'Not set';
}

function ResourceTable({ title, rows, columns, isAppointment = false }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#111318] shadow-2xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#181B21]">
        <h2 className="font-black text-xs uppercase tracking-wider text-[#F5F5F5]">{title}</h2>
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30">
          {rows.length} Records
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="px-6 py-8 text-xs font-semibold text-[#A7ADB7]">No records found in database.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#08090B] text-[10px] uppercase tracking-widest text-[#A7ADB7] border-b border-white/10">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-6 py-3.5 font-extrabold">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.slice(0, 10).map((row) => {
                const petName = isAppointment 
                  ? (row.pet?.name || row.petName || 'Pet') 
                  : (row.name || row.title || row.petName || (row._id ? `ID: ${row._id.slice(-6)}` : 'Item'));

                const vetOrDetail = isAppointment
                  ? (row.vet?.fullName || row.vet?.name ? `Dr. ${row.vet.fullName || row.vet.name}` : (row.status || 'Pending'))
                  : (row.email || row.category || row.status || row.species || (row.role ? `Role: ${row.role}` : '—'));

                const dateVal = row.createdAt || row.appointmentDate || row.orderDate || row.date;

                return (
                  <tr key={row._id} className="hover:bg-[#181B21] transition-colors">
                    <td className="px-6 py-4 font-bold text-[#F5F5F5] flex items-center gap-2">
                      {isAppointment && <PawPrint size={14} className="text-[#C8A96B] shrink-0" />}
                      {petName}
                    </td>
                    <td className="px-6 py-4 text-[#A7ADB7] font-medium">
                      {vetOrDetail}
                    </td>
                    <td className="px-6 py-4 text-[#6F7682] font-bold">
                      {isAppointment && row.status && (
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/40 mr-2">
                          {row.status}
                        </span>
                      )}
                      {formatDate(dateVal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const loadOverview = () => {
    setLoading(true);
    setError('');
    getAdminOverview()
      .then(({ data }) => setOverview(data))
      .catch((response) => setError(response.response?.data?.message || 'Unable to load admin data.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOverview(); }, []);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-[#C8A96B]">
        <div className="text-center space-y-3">
          <div className="h-10 w-10 border-4 border-[#C8A96B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase tracking-widest text-[#A7ADB7]">Loading Telemetry Console...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-[#111318] p-8 text-center shadow-2xl border border-[#C94B4B]/40 max-w-md mx-auto space-y-4">
        <p className="font-bold text-xs text-[#C94B4B]">{error}</p>
        <button
          onClick={loadOverview}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-md cursor-pointer"
        >
          <RefreshCw size={14} /> Retry Telemetry Load
        </button>
      </div>
    );
  }

  const { counts, data } = overview;
  const path = location.pathname;

  const isUsersRoute = path.includes('/admin/users');
  const isPetsRoute = path.includes('/admin/pets');
  const isProductsRoute = path.includes('/admin/products');
  const isAppointmentsRoute = path.includes('/admin/appointments');
  const isOverview = !isUsersRoute && !isPetsRoute && !isProductsRoute && !isAppointmentsRoute;

  return (
    <div className="space-y-8">
      {/* Dynamic Section Banner */}
      <div className="bg-[#111318] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
            <ShieldCheck size={14} className="text-[#C8A96B]" />
            {isUsersRoute && 'User & Partner Telemetry'}
            {isPetsRoute && 'Pets & Adoption Network'}
            {isProductsRoute && 'Marketplace & Orders Telemetry'}
            {isAppointmentsRoute && 'Clinical Appointment Registry'}
            {isOverview && 'Global Engineering Console'}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#F5F5F5] pt-1">
            {isUsersRoute && 'User Moderation & Partners'}
            {isPetsRoute && 'Pet Directory & Rehoming'}
            {isProductsRoute && 'Inventory & Purchase Orders'}
            {isAppointmentsRoute && 'Clinical Appointments Queue'}
            {isOverview && 'System Overview & Analytics'}
          </h1>
          <p className="text-xs text-[#A7ADB7] font-medium">
            {isOverview 
              ? 'Real-time telemetry monitoring registrations, appointments, orders, and rescue listings.' 
              : 'Managing active backend records across the FURSHIELD platform.'}
          </p>
        </div>

        <button
          onClick={loadOverview}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#181B21] hover:bg-[#252A32] px-4 py-3 text-xs font-black uppercase tracking-wider text-[#F5F5F5] transition-all cursor-pointer shrink-0"
        >
          <RefreshCw size={15} className="text-[#C8A96B]" /> Refresh Telemetry
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(isOverview || isUsersRoute) && (
          <>
            <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">REGISTERED USERS</p>
                <p className="mt-2 text-3xl font-black text-[#C8A96B]">{counts.users ?? 0}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center"><Users size={22} /></div>
            </div>
            <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">PARTNER SHELTERS</p>
                <p className="mt-2 text-3xl font-black text-[#C8A96B]">{counts.shelters ?? 0}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#D6A84F] border border-[#D6A84F]/30 grid place-items-center"><Store size={22} /></div>
            </div>
          </>
        )}

        {(isOverview || isPetsRoute) && (
          <>
            <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">REGISTERED PETS</p>
                <p className="mt-2 text-3xl font-black text-[#3FA66B]">{counts.pets ?? 0}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#3FA66B] border border-[#3FA66B]/30 grid place-items-center"><PawPrint size={22} /></div>
            </div>
            <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">ADOPTION LISTINGS</p>
                <p className="mt-2 text-3xl font-black text-[#8EA3B7]">{counts.adoptions ?? 0}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#8EA3B7] border border-[#8EA3B7]/30 grid place-items-center"><PawPrint size={22} /></div>
            </div>
          </>
        )}

        {(isOverview || isProductsRoute) && (
          <>
            <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">STORE PRODUCTS</p>
                <p className="mt-2 text-3xl font-black text-[#C8A96B]">{counts.products ?? 0}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center"><Package size={22} /></div>
            </div>
            <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">PRODUCT ORDERS</p>
                <p className="mt-2 text-3xl font-black text-[#3FA66B]">{counts.orders ?? 0}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#3FA66B] border border-[#3FA66B]/30 grid place-items-center"><ShoppingBag size={22} /></div>
            </div>
          </>
        )}

        {(isOverview || isAppointmentsRoute) && (
          <div className="rounded-2xl bg-[#111318] p-6 shadow-2xl border border-white/10 flex items-center justify-between glass-metal-hover">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">CLINIC APPOINTMENTS</p>
              <p className="mt-2 text-3xl font-black text-[#8EA3B7]">{counts.appointments ?? 0}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#181B21] text-[#8EA3B7] border border-[#8EA3B7]/30 grid place-items-center"><CalendarDays size={22} /></div>
          </div>
        )}
      </div>

      {/* Tables Grid corresponding to Navigation */}
      {(isOverview || isUsersRoute) && (
        <div className="grid gap-6 xl:grid-cols-2">
          <ResourceTable title="Recent Registered Users" rows={data.users} columns={['User Name', 'Email / Role', 'Joined Date']} />
          <ResourceTable title="Shelter Partners" rows={data.shelters} columns={['Shelter Name', 'Email', 'Joined Date']} />
        </div>
      )}

      {(isOverview || isAppointmentsRoute) && (
        <ResourceTable 
          title="Recent Clinic Appointments" 
          rows={data.appointments} 
          columns={['Pet Name', 'Assigned Veterinarian', 'Status & Date']} 
          isAppointment={true} 
        />
      )}

      {(isOverview || isProductsRoute) && (
        <div className="grid gap-6 xl:grid-cols-2">
          <ResourceTable title="Marketplace Products" rows={data.products} columns={['Product Title', 'Category', 'Created Date']} />
          <ResourceTable title="Product Orders" rows={data.orders} columns={['Order Reference', 'Status', 'Date']} />
        </div>
      )}

      {(isOverview || isPetsRoute) && (
        <div className="grid gap-6 xl:grid-cols-2">
          <ResourceTable title="Registered Pets" rows={data.pets} columns={['Pet Name', 'Species', 'Added Date']} />
          <ResourceTable title="Rescue Adoption Listings" rows={data.adoptions} columns={['Listing Title', 'Status', 'Listed Date']} />
        </div>
      )}
    </div>
  );
}
