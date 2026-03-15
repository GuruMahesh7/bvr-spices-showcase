import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/products'; // Keeping categories static for now or fetch from backend if available
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high

  const { data: products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Page Header */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] flex items-center overflow-hidden bg-stone-950">
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
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-t from-stone-950 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pt-16 sm:pt-20 px-4 sm:px-6">
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
              className="inline-flex items-center gap-2 mb-4 sm:mb-6"
            >
              <div className="w-6 sm:w-8 h-[1px] bg-secondary" />
              <span className="text-secondary font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">The Collection</span>
              <div className="w-6 sm:w-8 h-[1px] bg-secondary" />
            </motion.div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              BVR <span className="text-secondary italic">Spice</span> Boutique
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Carefully sourced and packed for purity. Discover the authentic flavors
              that have been trusted by Indian kitchens for generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-5 md:py-6 border-b border-stone-800 sticky top-[64px] md:top-[80px] bg-stone-950/95 backdrop-blur-xl z-40">
        <div className="container-custom px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 md:items-center md:justify-between">
            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0"
            >
              <Filter className="w-4 h-4 text-stone-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 text-sm sm:text-base min-h-[44px] px-3 sm:px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category 
                      ? 'text-white bg-white/10' 
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full sm:w-56 md:w-64"
              >
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-2.5 sm:py-3 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-secondary transition-all w-full font-medium min-h-[44px]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full sm:w-auto"
              >
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all w-full sm:w-auto font-medium appearance-none cursor-pointer min-h-[44px]"
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-stone-50 min-h-[60vh]">
        <div className="container-custom px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 px-4">
              Error loading products. Please try again later.
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 sm:py-32 px-4"
            >
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-stone-200 mx-auto mb-4 sm:mb-6" />
              <p className="text-stone-500 text-lg sm:text-xl font-heading mb-4 sm:mb-6">
                Shadows found, but no spices match your request.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn-premium !px-8 sm:!px-10 min-h-[44px] text-sm sm:text-base"
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
