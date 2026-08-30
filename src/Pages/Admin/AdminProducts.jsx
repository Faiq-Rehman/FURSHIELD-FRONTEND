import { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ExternalLink,
  DollarSign,
  Layers,
  Archive,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../Services/productApi';

const CATEGORIES = [
  { value: 'food', label: 'Food & Nutrition' },
  { value: 'grooming', label: 'Grooming & Hygiene' },
  { value: 'toys', label: 'Toys & Enrichment' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'training', label: 'Training & Behavior' },
  { value: 'accessories', label: 'Apparel & Accessories' }
];

const INITIAL_FORM = {
  name: '',
  category: 'food',
  price: '',
  description: '',
  image: '',
  stockQuantity: '10',
  isAvailable: true
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // View modal state
  const [viewProduct, setViewProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedProductId(null);
    setFormData(INITIAL_FORM);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setIsEditing(true);
    setSelectedProductId(product._id);
    setFormData({
      name: product.name || '',
      category: product.category?.toLowerCase() || 'food',
      price: product.price !== undefined ? String(product.price) : '',
      description: product.description || '',
      image: product.image || '',
      stockQuantity: product.stockQuantity !== undefined ? String(product.stockQuantity) : '0',
      isAvailable: product.isAvailable !== false
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      errors.price = 'Valid price is required (>= 0)';
    }
    if (formData.stockQuantity !== '' && (isNaN(formData.stockQuantity) || Number(formData.stockQuantity) < 0)) {
      errors.stockQuantity = 'Stock quantity must be a non-negative number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setError('');

    const payload = {
      name: formData.name.trim(),
      category: formData.category.toLowerCase(),
      price: Number(formData.price),
      description: formData.description.trim(),
      image: formData.image.trim(),
      stockQuantity: Number(formData.stockQuantity) || 0,
      isAvailable: Boolean(formData.isAvailable)
    };

    try {
      if (isEditing) {
        const { data } = await updateProduct(selectedProductId, payload);
        showSuccess(`Product "${payload.name}" updated successfully.`);
        setProducts(products.map((p) => (p._id === selectedProductId ? data.product || { ...p, ...payload } : p)));
      } else {
        const { data } = await createProduct(payload);
        showSuccess(`Product "${payload.name}" created successfully.`);
        if (data.product) {
          setProducts([data.product, ...products]);
        } else {
          fetchProducts();
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(productToDelete._id);
      showSuccess(`Product "${productToDelete.name}" deleted successfully.`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product.');
    } finally {
      setDeleting(false);
    }
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#111318] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
            <Package size={14} className="text-[#C8A96B]" />
            STORE INVENTORY &amp; CATALOG
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#F5F5F5] pt-1">
            Product Management
          </h1>
          <p className="text-xs text-[#A7ADB7] font-medium">
            Create, update, manage inventory and catalog listings across the FurShield marketplace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#181B21] hover:bg-[#252A32] px-4 py-3 text-xs font-black uppercase tracking-wider text-[#F5F5F5] transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={15} className={`text-[#C8A96B] ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="rounded-xl bg-[#3FA66B]/20 border border-[#3FA66B]/40 p-4 text-xs font-bold text-[#3FA66B] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')} className="cursor-pointer text-[#3FA66B] hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/40 p-4 text-xs font-bold text-[#C94B4B] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="cursor-pointer text-[#C94B4B] hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-[#111318] p-4 rounded-2xl border border-white/10 shadow-xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 text-[#6F7682]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, description, or category..."
            className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-10 pr-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B]/60 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#A7ADB7]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">Category:</span>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#181B21] px-3.5 py-2.5 text-xs font-bold text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="overflow-hidden rounded-2xl bg-[#111318] shadow-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#181B21]">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#C8A96B]" />
            <h2 className="font-black text-xs uppercase tracking-wider text-[#F5F5F5]">Catalog Inventory</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30">
            {filteredProducts.length} of {products.length} Products
          </span>
        </div>

        {loading ? (
          <div className="grid min-h-[300px] place-items-center text-[#C8A96B]">
            <div className="text-center space-y-3">
              <div className="h-8 w-8 border-3 border-[#C8A96B] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-black uppercase tracking-widest text-[#A7ADB7]">Loading Products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <Archive className="mx-auto text-[#6F7682]" size={40} />
            <div>
              <p className="font-bold text-sm text-[#F5F5F5]">No products found</p>
              <p className="text-xs text-[#A7ADB7] mt-1">
                {search || categoryFilter !== 'all' 
                  ? 'No products matched your search or category filter.' 
                  : 'Start by adding your first product to the catalog.'}
              </p>
            </div>
            {!search && categoryFilter === 'all' && (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#08090B] cursor-pointer"
              >
                <Plus size={14} /> Add Product
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#08090B] text-[10px] uppercase tracking-widest text-[#A7ADB7] border-b border-white/10">
                <tr>
                  <th className="px-6 py-3.5 font-extrabold">Product</th>
                  <th className="px-6 py-3.5 font-extrabold">Category</th>
                  <th className="px-6 py-3.5 font-extrabold">Price</th>
                  <th className="px-6 py-3.5 font-extrabold">Stock</th>
                  <th className="px-6 py-3.5 font-extrabold">Status</th>
                  <th className="px-6 py-3.5 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((p) => {
                  const categoryObj = CATEGORIES.find((c) => c.value === p.category?.toLowerCase());
                  const categoryName = categoryObj?.label || p.category;

                  return (
                    <tr key={p._id} className="hover:bg-[#181B21] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-[#181B21] border border-white/10 overflow-hidden shrink-0 grid place-items-center">
                            {p.image ? (
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                className="h-full w-full object-cover"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            ) : (
                              <Package size={20} className="text-[#6F7682]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#F5F5F5] truncate max-w-xs">{p.name}</p>
                            <p className="text-[11px] text-[#A7ADB7] truncate max-w-xs">
                              {p.description || 'No description provided'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#A7ADB7] font-semibold">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-[#181B21] border border-white/10 text-[11px]">
                          {categoryName}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-[#C8A96B]">
                        ${Number(p.price || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-[#F5F5F5] font-semibold">
                        <span className={`inline-flex items-center gap-1.5 ${p.stockQuantity > 0 ? 'text-[#3FA66B]' : 'text-[#C94B4B]'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${p.stockQuantity > 0 ? 'bg-[#3FA66B]' : 'bg-[#C94B4B]'}`} />
                          {p.stockQuantity ?? 0} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {p.isAvailable !== false ? (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#3FA66B]/20 text-[#3FA66B] border border-[#3FA66B]/40">
                            Available
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#C94B4B]/20 text-[#C94B4B] border border-[#C94B4B]/40">
                            Hidden
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setViewProduct(p)}
                            title="View Product"
                            className="p-2 rounded-lg bg-[#181B21] text-[#A7ADB7] hover:text-[#C8A96B] hover:bg-[#252A32] transition-colors cursor-pointer"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            title="Edit Product"
                            className="p-2 rounded-lg bg-[#181B21] text-[#A7ADB7] hover:text-[#3FA66B] hover:bg-[#252A32] transition-colors cursor-pointer"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(p)}
                            title="Delete Product"
                            className="p-2 rounded-lg bg-[#181B21] text-[#A7ADB7] hover:text-[#C94B4B] hover:bg-[#252A32] transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#181B21]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#C8A96B]/15 border border-[#C8A96B]/30 grid place-items-center text-[#C8A96B]">
                  <Package size={16} />
                </div>
                <h3 className="font-display font-black text-base text-[#F5F5F5]">
                  {isEditing ? 'Edit Store Product' : 'Add New Product'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#6F7682] hover:text-[#F5F5F5] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Premium Salmon & Rice Dry Kibble"
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B]/60 transition-all font-medium"
                />
                {formErrors.name && <p className="text-[10px] text-[#C94B4B] mt-1 font-bold">{formErrors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#181B21] px-3.5 py-2.5 text-xs text-[#F5F5F5] outline-none focus:border-[#C8A96B]/60 transition-all font-bold cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                    Price ($ USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-2.5 text-[#6F7682]" size={15} />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="29.99"
                      className="w-full rounded-xl border border-white/10 bg-[#181B21] pl-9 pr-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B]/60 transition-all font-medium"
                    />
                  </div>
                  {formErrors.price && <p className="text-[10px] text-[#C94B4B] mt-1 font-bold">{formErrors.price}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="10"
                    className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B]/60 transition-all font-medium"
                  />
                  {formErrors.stockQuantity && (
                    <p className="text-[10px] text-[#C94B4B] mt-1 font-bold">{formErrors.stockQuantity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                    Catalog Visibility
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        className="rounded border-white/20 bg-[#181B21] text-[#C8A96B] focus:ring-0 h-4 w-4"
                      />
                      <span className="text-xs font-bold text-[#F5F5F5]">Visible in Marketplace</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B]/60 transition-all font-medium"
                />
                {formData.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-[#181B21] border border-white/5">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="h-10 w-10 rounded-lg object-cover" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-[11px] text-[#A7ADB7] truncate">Image Preview Loaded</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#A7ADB7] mb-1.5 uppercase tracking-widest">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed specifications, ingredients, or usage guidelines..."
                  className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B]/60 transition-all font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#181B21] text-xs font-bold text-[#A7ADB7] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] text-xs font-black uppercase tracking-wider text-[#08090B] shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111318] border border-[#C94B4B]/40 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-[#C94B4B]">
              <div className="h-10 w-10 rounded-xl bg-[#C94B4B]/20 border border-[#C94B4B]/30 grid place-items-center">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-display font-black text-base text-[#F5F5F5]">Confirm Product Deletion</h3>
                <p className="text-[11px] text-[#A7ADB7]">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Are you sure you want to permanently remove{' '}
              <strong className="text-[#F5F5F5]">"{productToDelete.name}"</strong> from the store catalog?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
                disabled={deleting}
                className="px-4 py-2 rounded-xl border border-white/10 bg-[#181B21] text-xs font-bold text-[#A7ADB7] hover:text-white cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-[#C94B4B] hover:bg-[#D95353] text-xs font-black uppercase tracking-wider text-white shadow-lg cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Details Modal */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111318] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#181B21]">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-[#C8A96B]" />
                <h3 className="font-display font-black text-sm text-[#F5F5F5]">Product Specification</h3>
              </div>
              <button onClick={() => setViewProduct(null)} className="text-[#6F7682] hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {viewProduct.image && (
                <div className="h-48 w-full rounded-xl overflow-hidden bg-[#181B21] border border-white/10">
                  <img 
                    src={viewProduct.image} 
                    alt={viewProduct.name} 
                    className="h-full w-full object-cover" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C8A96B]">
                  {viewProduct.category}
                </span>
                <h2 className="font-display text-xl font-black text-[#F5F5F5]">{viewProduct.name}</h2>
                <p className="text-2xl font-black text-[#C8A96B] mt-1">${Number(viewProduct.price || 0).toFixed(2)}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#181B21] border border-white/5 text-xs">
                <div>
                  <span className="text-[10px] text-[#A7ADB7] font-bold uppercase block">Stock Quantity</span>
                  <span className="font-bold text-[#F5F5F5]">{viewProduct.stockQuantity ?? 0} units</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A7ADB7] font-bold uppercase block">Marketplace Status</span>
                  <span className={`font-bold ${viewProduct.isAvailable !== false ? 'text-[#3FA66B]' : 'text-[#C94B4B]'}`}>
                    {viewProduct.isAvailable !== false ? 'Available' : 'Hidden'}
                  </span>
                </div>
              </div>

              {viewProduct.description && (
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#A7ADB7]">Description</span>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">{viewProduct.description}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <a
                  href={`/products/${viewProduct._id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8A96B] hover:underline"
                >
                  <ExternalLink size={14} /> Open in Public Store
                </a>
                <button
                  type="button"
                  onClick={() => setViewProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#181B21] text-xs font-bold text-[#F5F5F5] hover:bg-[#252A32] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
