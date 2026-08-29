import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle, Package } from 'lucide-react';
import { useCart } from '../../Context/CartContext';
import { getProductById } from '../../Services/productApi';

export default function ProductDetails() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    getProductById(id)
      .then(({ data }) => setProduct(data.product))
      .catch((err) => setError(err.response?.data?.message || 'Product details unavailable.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-red-700 font-semibold">{error || 'Product not found.'}</p>
        <Link to="/products" className="inline-block rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
          Back to marketplace
        </Link>
      </div>
    );
  }

  const prodId = product._id || product.id;
  const price = Number(product.price || 0);
  const img = product.image || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=80';
  const categoryLabel = product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'Essential';

  const handleAddToCart = () => {
    add({ ...product, id: prodId, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-6">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline">
        <ArrowLeft size={16} /> Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 items-center">
        <img className="h-96 w-full rounded-2xl object-cover bg-slate-50" src={img} alt={product.name} />

        <div className="space-y-4">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            {categoryLabel}
          </span>
          <h1 className="font-display text-4xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-2xl font-bold text-emerald-800">Rs. {price.toLocaleString()}</p>
          
          <p className="leading-relaxed text-slate-600 text-sm">
            {product.description || 'A thoughtfully selected daily essential made to support happy, comfortable pet care routines.'}
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2">
            <Package size={16} className="text-emerald-700" />
            <span>In Stock: {product.stockQuantity !== undefined ? product.stockQuantity : 'Available'}</span>
          </div>

          <div className="pt-4">
            <button
              onClick={handleAddToCart}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition ${
                added ? 'bg-emerald-600' : 'bg-emerald-800 hover:bg-emerald-900'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle size={18} /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
