import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Package,
    AlertCircle,
    CheckCircle2,
    Star,
    X,
    Upload,
    ChevronDown,
    ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ProductManager = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        category: 'Powders',
        price: '',
        countInStock: '',
        description: '',
        image: '',
        images: [] as string[],
        brand: 'BVR Spices',
        weight: '',
        ingredients: '',
        usageTips: '',
        isBestSeller: false,
        variants: [] as { weight: string, price: string, countInStock: string }[]
    });

    const fetchProducts = async () => {
        try {
            const data = await adminService.getProducts();
            setProducts(data);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await adminService.deleteProduct(id);
                toast.success('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            countInStock: product.countInStock,
            description: product.description,
            image: product.image,
            images: product.images || [product.image],
            brand: product.brand || 'BVR Spices',
            weight: product.weight || '',
            ingredients: product.ingredients || '',
            usageTips: product.usageTips || '',
            isBestSeller: product.isBestSeller || false,
            variants: product.variants || []
        });
        setShowModal(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            category: 'Powders',
            price: '',
            countInStock: '',
            description: '',
            image: '',
            images: [],
            brand: 'BVR Spices',
            weight: '',
            ingredients: '',
            usageTips: '',
            isBestSeller: false,
            variants: []
        });
        setShowModal(true);
    };

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>, isMultiple = false) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        try {
            const uploadedUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', files[i]);
                const data = await adminService.uploadImage(uploadFormData);
                const imagePath = data.image.startsWith('http')
                    ? data.image
                    : `${import.meta.env.VITE_API_URL || 'https://bvr-backend.onrender.com'}${data.image}`;
                uploadedUrls.push(imagePath);
            }

            if (isMultiple) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...uploadedUrls],
                    // If primary image is empty, set it to the first uploaded one
                    image: prev.image || uploadedUrls[0]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    image: uploadedUrls[0],
                    images: prev.images.length === 0 ? [uploadedUrls[0]] : prev.images
                }));
            }
            toast.success(`Image${files.length > 1 ? 's' : ''} uploaded successfully`);
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { weight: '', price: '', countInStock: '' }]
        });
    };

    const removeVariant = (index: number) => {
        const newVariants = [...formData.variants];
        newVariants.splice(index, 1);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleVariantChange = (index: number, field: string, value: string) => {
        const newVariants = [...formData.variants];
        (newVariants[index] as any)[field] = value;
        setFormData({ ...formData, variants: newVariants });
    };

    const removeImage = (index: number) => {
        const newImages = [...formData.images];
        const removedImage = newImages.splice(index, 1)[0];
        setFormData(prev => {
            const update: any = { ...prev, images: newImages };
            if (prev.image === removedImage) {
                update.image = newImages[0] || '';
            }
            return update;
        });
    };

    const setPrimaryImage = (url: string) => {
        setFormData({ ...formData, image: url });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);

        const formattedData = {
            ...formData,
            price: Number(formData.price),
            countInStock: Number(formData.countInStock),
            variants: formData.variants.map(v => ({
                ...v,
                price: Number(v.price),
                countInStock: Number(v.countInStock)
            }))
        };

        try {
            if (editingProduct) {
                await adminService.updateProduct(editingProduct._id, formattedData);
                toast.success('Product updated successfully');
            } else {
                const newProduct = await adminService.createProduct();
                await adminService.updateProduct(newProduct._id, formattedData);
                toast.success('Product created successfully');
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            toast.error('Failed to save product');
        } finally {
            setFormLoading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = ['Powders', 'Masalas', 'Blends', 'Whole Spices'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm">
                        <Filter size={18} />
                        Filters
                    </button>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-bold shadow-lg shadow-red-900/20"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-100 italic">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Best Seller</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 italic">
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-500 font-mono tracking-tighter uppercase">{product._id.substring(0, 10)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold border border-gray-200 uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            ₹{product.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {product.countInStock < 10 && product.countInStock > 0 ? (
                                                    <span className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                                                        <AlertCircle size={14} /> Low: {product.countInStock}
                                                    </span>
                                                ) : product.countInStock === 0 ? (
                                                    <span className="flex items-center gap-1 text-rose-600 text-xs font-bold">
                                                        <X size={14} /> Out of Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-emerald-600 text-sm font-bold">
                                                        {product.countInStock}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.isBestSeller ? (
                                                <div className="p-2 bg-amber-50 text-amber-500 rounded-lg inline-flex shadow-sm border border-amber-100">
                                                    <Star size={18} fill="currentColor" />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-gray-50 text-gray-300 rounded-lg inline-flex border border-gray-100">
                                                    <Star size={18} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-60"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium italic mt-1">Configure your product details below</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                                                <select
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium appearance-none bg-white"
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                >
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Brand</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                                                    value={formData.brand}
                                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Price (₹)</label>
                                                <input
                                                    type="number"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Stock Quantity</label>
                                                <input
                                                    type="number"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                                                    value={formData.countInStock}
                                                    onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Weight (e.g. 100g)</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
                                                value={formData.weight}
                                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                            <input
                                                type="checkbox"
                                                id="isBestSeller"
                                                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                                                checked={formData.isBestSeller}
                                                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                                            />
                                            <label htmlFor="isBestSeller" className="text-sm font-bold text-amber-900 cursor-pointer flex items-center gap-2">
                                                <Star size={16} fill="currentColor" /> Set as Best Seller
                                            </label>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Main Product Image</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    required
                                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-sm"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                    placeholder="Main image URL..."
                                                />
                                                <input
                                                    type="file"
                                                    id="image-file"
                                                    className="hidden"
                                                    onChange={(e) => uploadFileHandler(e, false)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('image-file')?.click()}
                                                    className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors border border-gray-200"
                                                >
                                                    <Upload size={20} />
                                                </button>
                                            </div>

                                            <div className="mt-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Additional Images</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => document.getElementById('multi-image-file')?.click()}
                                                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                                                    >
                                                        <Plus size={14} /> Add Images
                                                    </button>
                                                    <input
                                                        type="file"
                                                        id="multi-image-file"
                                                        multiple
                                                        className="hidden"
                                                        onChange={(e) => uploadFileHandler(e, true)}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-4 gap-2">
                                                    {formData.images.map((img, idx) => (
                                                        <div key={idx} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${formData.image === img ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-100 hover:border-gray-200'}`}>
                                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setPrimaryImage(img)}
                                                                    className="p-1 bg-white text-emerald-600 rounded-md hover:bg-emerald-50"
                                                                    title="Set as main"
                                                                >
                                                                    <CheckCircle2 size={14} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(idx)}
                                                                    className="p-1 bg-white text-rose-600 rounded-md hover:bg-rose-50"
                                                                    title="Remove"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() => document.getElementById('multi-image-file')?.click()}
                                                        className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-300 transition-all bg-gray-50/50"
                                                    >
                                                        <Plus size={20} />
                                                        <span className="text-[10px] font-bold mt-1 uppercase">Add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Product Variants (Weights/Prices)</label>
                                                <button
                                                    type="button"
                                                    onClick={addVariant}
                                                    className="px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-xs font-bold flex items-center gap-1"
                                                >
                                                    <Plus size={14} /> Add Variant
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {formData.variants.length === 0 ? (
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                                                        <p className="text-xs text-gray-500 italic">No variants added. The base price and stock will be used.</p>
                                                    </div>
                                                ) : (
                                                    formData.variants.map((variant, idx) => (
                                                        <div key={idx} className="flex gap-2 items-end bg-gray-50 p-3 rounded-xl border border-gray-100 relative group">
                                                            <div className="flex-1">
                                                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Weight</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="100g"
                                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                                                    value={variant.weight}
                                                                    onChange={(e) => handleVariantChange(idx, 'weight', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="w-24">
                                                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                                                    value={variant.price}
                                                                    onChange={(e) => handleVariantChange(idx, 'price', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="w-24">
                                                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Stock</label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                                                    value={variant.countInStock}
                                                                    onChange={(e) => handleVariantChange(idx, 'countInStock', e.target.value)}
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeVariant(idx)}
                                                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                                            <textarea
                                                rows={3}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium custom-scrollbar"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Ingredients</label>
                                            <textarea
                                                rows={2}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium custom-scrollbar"
                                                value={formData.ingredients}
                                                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Usage Tips</label>
                                            <textarea
                                                rows={2}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium custom-scrollbar"
                                                value={formData.usageTips}
                                                onChange={(e) => setFormData({ ...formData, usageTips: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center justify-end gap-4 pb-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold uppercase tracking-widest text-xs"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={formLoading}
                                        className="px-10 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-900/20 uppercase tracking-widest text-xs flex items-center gap-2 group disabled:opacity-50"
                                    >
                                        {formLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                                        {!formLoading && <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductManager;
