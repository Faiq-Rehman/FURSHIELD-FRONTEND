import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import { createOrder } from '../../Services/OrderApi';

export default function Cart() {
  const { items, changeQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        items: items.map((item) => ({
          product: item.id || item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: shippingAddress || 'Standard Delivery Address',
        paymentMethod: 'Cash on Delivery'
      };

      const { data } = await createOrder(orderPayload);
      clearCart();
      if (data.order?._id) {
        navigate(`/owner/orders/${data.order._id}`);
      } else {
        navigate('/owner/orders');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <h1 className="font-display text-4xl font-bold text-slate-900">Your Shopping Cart</h1>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-slate-100 space-y-4">
          <ShoppingBag className="mx-auto text-slate-300" size={48} />
          <h2 className="text-xl font-bold text-slate-900">Your cart is waiting</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Explore pet products, wholesome food, and essentials to care for your companion.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-900"
          >
            Browse Marketplace <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            {items.map((i) => {
              const id = i.id || i._id;
              return (
                <div key={id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-xl object-cover bg-slate-50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{i.name}</p>
                    <p className="text-sm font-semibold text-emerald-700">Rs. {Number(i.price).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(id, i.quantity - 1)}
                      className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{i.quantity}</span>
                    <button
                      onClick={() => changeQuantity(id, i.quantity + 1)}
                      className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(id)}
                    className="p-2 text-slate-400 hover:text-red-600 ml-1"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 space-y-5 h-fit">
            <h2 className="font-display text-xl font-bold text-slate-900">Order Summary</h2>

            <div className="space-y-2 text-sm text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-700">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span className="text-emerald-800">Rs. {total.toLocaleString()}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Shipping Address</label>
              <input
                type="text"
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter delivery address..."
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleCheckout}
              disabled={submitting}
              className="w-full rounded-xl bg-emerald-800 py-3 text-sm font-bold text-white hover:bg-emerald-900 disabled:opacity-60"
            >
              {submitting ? 'Placing Order...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
