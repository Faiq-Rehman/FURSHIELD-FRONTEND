import { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderCard from '../../Component/Owner/OrderCard';
import { getMyOrders } from '../../Services/OrderApi';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getMyOrders();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load your orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Your Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Track and view your product purchase history.</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-900"
        >
          Browse Marketplace <ArrowRight size={16} />
        </Link>
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100 space-y-3">
          <ShoppingBag className="mx-auto text-slate-300" size={40} />
          <h3 className="text-lg font-bold text-slate-900">No orders placed yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You haven't ordered any pet food or grooming products yet.
          </p>
          <Link
            to="/products"
            className="mt-2 inline-block rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order._id || order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
