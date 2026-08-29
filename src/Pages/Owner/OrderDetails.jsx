import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, MapPin, XCircle } from 'lucide-react';
import { getOrderById, cancelOrder } from '../../Services/OrderApi';

export default function OrderDetails() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const loadOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getOrderById(id);
      setOrderData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load order details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      const { data } = await cancelOrder(id);
      if (data.order) {
        setOrderData((prev) => ({ ...prev, order: data.order }));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading order details...</div>;
  }

  if (error || !orderData?.order) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Order not found.'}</p>
        <Link to="/owner/orders" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to orders
        </Link>
      </div>
    );
  }

  const { order, items = [] } = orderData;
  const shortId = order._id ? order._id.substring(order._id.length - 6).toUpperCase() : 'N/A';
  const status = order.status?.toLowerCase() || 'pending';
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/owner/orders" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to orders
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order #{shortId}</span>
            <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">Order Details</h1>
          </div>
          <span
            className={`capitalize rounded-full px-3.5 py-1 text-xs font-bold border ${
              status === 'completed'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : status === 'confirmed'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : status === 'cancelled'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {status}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span>Placed on: <strong className="text-slate-800">{orderDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={16} className="text-slate-400" />
            <span>Total Amount: <strong className="text-slate-800">Rs. {Number(order.totalAmount || 0).toLocaleString()}</strong></span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 text-sm">Ordered Items</h2>
          {items.length === 0 ? (
            <p className="text-xs text-slate-500">Item details unavailable.</p>
          ) : (
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {items.map((item) => {
                const prod = item.product || {};
                const name = prod.name || 'Product Item';
                const image = prod.image || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=80';
                const qty = item.quantity || 1;
                const unitPrice = item.priceEach || prod.price || 0;
                const subtotal = qty * unitPrice;

                return (
                  <div key={item._id || item.id} className="py-3 flex items-center gap-4">
                    <img src={image} alt={name} className="h-14 w-14 rounded-xl object-cover bg-slate-50" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 truncate">{name}</p>
                      <p className="text-xs text-slate-500">Qty: {qty} × Rs. {Number(unitPrice).toLocaleString()}</p>
                    </div>
                    <p className="font-bold text-sm text-slate-900">Rs. {subtotal.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-slate-900">Grand Total</span>
          <span className="font-display text-2xl font-bold text-emerald-800">
            Rs. {Number(order.totalAmount || 0).toLocaleString()}
          </span>
        </div>

        {status === 'pending' && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-60"
            >
              {cancelling ? 'Cancelling Order...' : 'Cancel Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
