import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const { data: products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Apply sorting
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

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

      {/* Search & Filters - Mobile First Design */}
      <section className="sticky top-[64px] md:top-[80px] bg-stone-950 border-b border-stone-800 z-40">
        <div className="px-3 py-3 md:px-6 md:py-4">
          {/* Search Input */}
          <div className="relative mb-3 md:mb-4">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900/50 border border-stone-700 rounded-lg md:rounded-xl pl-10 md:pl-12 pr-10 md:pr-12 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-stone-500 focus:outline-none focus:border-primary transition-all min-h-[44px] md:min-h-[48px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Category Chips - Horizontal Scroll */}
            <div className="flex-1 flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all min-h-[36px] md:min-h-[40px] whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-800 border border-stone-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer min-h-[36px] md:min-h-[40px] pr-8 md:pr-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
              >
                <option value="featured" className="bg-stone-900">Featured</option>
                <option value="price-low" className="bg-stone-900">Price: Low to High</option>
                <option value="price-high" className="bg-stone-900">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== 'All' || searchQuery) && (
            <div className="mt-2 md:mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs md:text-sm text-stone-400">Active filters:</span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="flex items-center gap-1.5 bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md text-xs md:text-sm hover:bg-stone-700 transition-colors"
                >
                  {selectedCategory}
                  <X className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-1.5 bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md text-xs md:text-sm hover:bg-stone-700 transition-colors"
                >
                  "{searchQuery}"
                  <X className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-12 bg-stone-50 min-h-[60vh]">
        <div className="container-custom px-3 sm:px-4 md:px-6">
          {/* Results Count */}
          {!isLoading && !error && (
            <div className="mb-4 px-1">
              <p className="text-xs text-stone-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 px-4">
              <p className="text-sm">Error loading products. Please try again later.</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 sm:py-24 px-4"
            >
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600 text-base font-medium mb-4">
                No products found
              </p>
              <p className="text-stone-500 text-sm mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
