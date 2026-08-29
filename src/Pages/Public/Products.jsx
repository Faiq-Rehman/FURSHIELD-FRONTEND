import { useEffect, useState } from 'react';
import { Star, ShoppingBag, Search, Sparkles, Filter, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { getProducts } from '../../Services/productApi';

const categories = ['All', 'food', 'grooming', 'toys', 'health', 'training', 'accessories'];

export default function Products() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedId, setAddedId] = useState(null);
  const { add } = useCart();

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const { data } = await getProducts(params);
      setList(data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category, search]);

  const handleAddToCart = (product) => {
    const id = product._id || product.id;
    const price = Number(product.price || 0);
    add({ ...product, id, price });
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="bg-[#111318] rounded-2xl p-8 sm:p-10 text-[#F5F5F5] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(200,169,107,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
            <Sparkles size={14} className="text-[#C8A96B]" />
            LUXURY PET MARKETPLACE
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            Pet Essentials, Crafting Care
          </h1>
          <p className="text-xs sm:text-sm text-[#A7ADB7]">
            Explore nutritionist-approved food, grooming kits, active toys, and vet-recommended healthcare supplies.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#111318] p-4 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <Filter size={18} className="text-[#6F7682] shrink-0 hidden sm:block ml-1" />
          {categories.map((cat) => {
            const label = cat === 'All' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1);
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-xl px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-[#08090B] shadow-md'
                    : 'bg-[#181B21] text-[#A7ADB7] hover:text-[#F5F5F5] border border-white/5'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-3 text-[#6F7682]" size={17} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all"
          />
        </div>
      </div>

      {error && (
        <div role="status" className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-10 w-10 border-4 border-[#C8A96B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase tracking-widest text-[#A7ADB7]">Fetching curated pet products...</p>
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-2xl bg-[#111318] p-12 text-center shadow-2xl border border-white/10">
          <ShoppingBag className="mx-auto text-[#6F7682] mb-3" size={48} />
          <h3 className="text-base font-black text-[#F5F5F5] uppercase tracking-wider">No products matching search</h3>
          <p className="text-xs text-[#A7ADB7] mt-1">Try selecting a different category or clearing search keywords.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product) => {
            const id = product._id || product.id;
            const price = Number(product.price || 0);
            const catLabel = product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'Essential';
            const img = product.image || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=80';
            const isAdded = addedId === id;

            return (
              <article
                key={id}
                className="group rounded-2xl bg-[#111318] shadow-2xl border border-white/10 glass-metal-hover flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <Link to={`/products/${id}`} className="block relative overflow-hidden aspect-4/3 bg-[#181B21]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95"
                      src={img}
                      alt={product.name}
                    />
                    <span className="absolute top-3 left-3 bg-[#08090B]/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
                      {catLabel}
                    </span>
                  </Link>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1 text-[#C8A96B]">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold text-[#F5F5F5]">4.9</span>
                      <span className="text-[10px] text-[#6F7682]">(48 reviews)</span>
                    </div>

                    <Link to={`/products/${id}`} className="block">
                      <h2 className="font-black text-sm text-[#F5F5F5] uppercase tracking-wider group-hover:text-[#C8A96B] transition-colors line-clamp-1">
                        {product.name}
                      </h2>
                    </Link>

                    {product.description && (
                      <p className="text-xs text-[#A7ADB7] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-white/10 mt-2">
                  <div>
                    <span className="text-[9px] text-[#6F7682] font-black uppercase tracking-widest block">PRICE</span>
                    <span className="font-black text-[#C8A96B] text-base">Rs. {price.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      isAdded
                        ? 'bg-[#3FA66B]/20 text-[#3FA66B] border border-[#3FA66B]/40'
                        : 'bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] text-[#08090B] shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} /> Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} /> Add
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
