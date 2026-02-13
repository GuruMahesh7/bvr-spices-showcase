import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Page Header */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            src="/brand-assets/premium-spice-bg-ultra.png"
            alt="Products Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/60" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-8 h-[1px] bg-secondary" />
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em]">The Collection</span>
              <div className="w-8 h-[1px] bg-secondary" />
            </motion.div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">
              BVR <span className="text-secondary italic">Spice</span> Boutique
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Explore our curated selection of single-origin Indian spices, 
              hand-selected for the discerning gourmet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-stone-800 sticky top-[64px] md:top-[80px] bg-stone-950/90 backdrop-blur-xl z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar"
            >
              <Filter className="w-4 h-4 text-stone-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex-shrink-0
                    ${selectedCategory === category 
                      ? 'bg-secondary text-stone-950' 
                      : 'bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full md:w-64"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search the boutique..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-secondary transition-all w-full font-medium"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full md:w-auto"
              >
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all w-full font-medium appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                >
                  <option value="featured" className="bg-stone-900">Featured</option>
                  <option value="price-low" className="bg-stone-900">Price: Low to High</option>
                  <option value="price-high" className="bg-stone-900">Price: High to Low</option>
                </select>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-stone-50 min-h-[60vh]">
        <div className="container-custom">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <Search className="w-16 h-16 text-stone-200 mx-auto mb-6" />
              <p className="text-stone-500 text-xl font-heading">
                Shadows found, but no spices match your request.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-8 btn-premium !px-10"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
