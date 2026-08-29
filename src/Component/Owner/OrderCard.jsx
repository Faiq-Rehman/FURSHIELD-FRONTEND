import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'confirmed':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'cancelled':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200';
  }
};

export default function OrderCard({ order }) {
  if (!order) return null;

  const id = order._id || order.id;
  const shortId = id ? id.substring(id.length - 6).toUpperCase() : 'N/A';
  const orderDate = order.createdAt || order.orderDate ? new Date(order.createdAt || order.orderDate).toLocaleDateString() : 'Recent';
  const total = Number(order.totalAmount || order.total || 0).toLocaleString();

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <ShoppingBag size={18} />
        </span>
        <div>
          <p className="font-bold text-slate-900">Order #{shortId}</p>
          <p className="text-xs text-slate-500">{orderDate} · Rs. {total}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize border ${getStatusStyle(order.status)}`}>
          {order.status || 'Pending'}
        </span>
        <Link to={`/owner/orders/${id}`} className="p-2 text-slate-400 hover:text-emerald-700">
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
