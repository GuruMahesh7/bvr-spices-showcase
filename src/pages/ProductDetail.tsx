import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, ArrowRight, Check, Leaf, Shield, Package, Loader2, Info, FlaskConical, Utensils, Star, Truck, ShieldCheck, RotateCcw, Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useProduct, useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeImage, setActiveImage] = useState('');

  const { data: product, isLoading, error } = useProduct(id || '');
  const { data: allProducts } = useProducts();

  // Initialize selectedVariant and activeImage
  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant({ weight: product.weight || 'Default', price: product.price, countInStock: product.countInStock });
      }
      setActiveImage(product.image || product.images?.[0] || '');
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-heading text-white mb-6">Discovery Failed</h2>
          <p className="text-stone-400 mb-6 text-sm sm:text-base">The product you're looking for couldn't be found.</p>
          <Link to="/products">
            <button className="btn-premium min-h-[44px] px-6 sm:px-8 text-sm sm:text-base">Return to Boutique</button>
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayStock = selectedVariant ? selectedVariant.countInStock : product.countInStock;
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - displayPrice) / product.originalPrice) * 100)
    : 0;
  const rating = product.rating || 4.5;
  const numReviews = product.numReviews || 0;

  // Image navigation functions
  const currentImageIndex = productImages.findIndex(img => img === activeImage);
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === productImages.length - 1;
  
  const goToNextImage = () => {
    if (!isLastImage) {
      const nextIndex = currentImageIndex + 1;
      setActiveImage(productImages[nextIndex]);
    }
  };
  const goToPrevImage = () => {
    if (!isFirstImage) {
      const prevIndex = currentImageIndex - 1;
      setActiveImage(productImages[prevIndex]);
    }
  };

  const relatedProducts = allProducts
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const tabs = [
    { id: 'description', label: 'Description', icon: Info },
    { id: 'ingredients', label: 'Ingredients', icon: FlaskConical },
    { id: 'usage', label: 'Usage', icon: Utensils },
    { id: 'storage', label: 'Storage', icon: Package },
  ];

  const highlights = [
    { text: "100% Natural", icon: Leaf },
    { text: "Quality Verified", icon: Check },
    { text: "Hygienically Packed", icon: Shield },
  ];

  const deliveryInfo = [
    { icon: Truck, text: "Free delivery on orders above ₹500" },
    { icon: ShieldCheck, text: "7 Days Replacement" },
    { icon: RotateCcw, text: "100% Authentic Products" },
  ];

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      price: displayPrice,
      weight: selectedVariant ? selectedVariant.weight : product.weight,
      variantId: selectedVariant ? selectedVariant._id : null
    };
    addToCart(itemToAdd, quantity);
    toast.success(`${product.name} added to cart!`, {
      description: `Quantity: ${quantity} • Total: ₹${(displayPrice * quantity).toLocaleString()}`,
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} from BVR Spices`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - Flipkart Style */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors min-h-[44px] -ml-2 pl-2 active:scale-95"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-base text-gray-900 truncate max-w-[200px] text-center">
            {product.name}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-700 hover:text-primary transition-colors active:scale-95"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Desktop Editorial Header */}
      <section className="hidden lg:block relative h-[15vh] bg-stone-950 flex items-end pb-8">
        <div className="container-custom px-6">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-stone-400 hover:text-secondary transition-colors text-xs font-bold uppercase tracking-[0.3em] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Collection
          </button>
        </div>
      </section>

      {/* Main Content - Flipkart Style */}
      <section className="pb-20 lg:pb-0 lg:py-6">
        <div className="lg:container-custom lg:px-6">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-start">
            {/* Image Gallery - Flipkart Style */}
            <div className="bg-white lg:bg-transparent">
              {/* Main Image */}
              <div className="aspect-square lg:aspect-[4/5] bg-white flex items-center justify-center relative group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-3 lg:p-5"
                  />
                </AnimatePresence>
                
                {/* Badge overlay */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-secondary text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-lg z-10">
                    {product.badge}
                  </div>
                )}

                {/* Navigation Arrows - Only show if more than 1 image */}
                {productImages.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <button
                      onClick={goToPrevImage}
                      disabled={isFirstImage}
                      className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 hover:bg-white active:bg-gray-50 border rounded-full flex items-center justify-center shadow-lg transition-all z-20 lg:opacity-0 lg:group-hover:opacity-100 ${
                        isFirstImage 
                          ? 'border-gray-200 cursor-not-allowed opacity-50' 
                          : 'border-gray-300 active:scale-90'
                      }`}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className={`w-5 h-5 lg:w-6 lg:h-6 ${isFirstImage ? 'text-gray-400' : 'text-gray-700'}`} />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={goToNextImage}
                      disabled={isLastImage}
                      className={`absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/95 hover:bg-white active:bg-gray-50 border rounded-full flex items-center justify-center shadow-lg transition-all z-20 lg:opacity-0 lg:group-hover:opacity-100 ${
                        isLastImage 
                          ? 'border-gray-200 cursor-not-allowed opacity-50' 
                          : 'border-gray-300 active:scale-90'
                      }`}
                      aria-label="Next image"
                    >
                      <ChevronRight className={`w-5 h-5 lg:w-6 lg:h-6 ${isLastImage ? 'text-gray-400' : 'text-gray-700'}`} />
                    </button>

                    {/* Image Counter - Mobile */}
                    <div className="absolute bottom-3 right-3 lg:hidden bg-black/70 text-white px-2.5 py-1 rounded-md text-xs font-semibold z-10 backdrop-blur-sm">
                      {currentImageIndex + 1} / {productImages.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery - Bottom (Flipkart Style) */}
              {productImages.length > 1 && (
                <div className="flex gap-2 px-3 pb-3 pt-2 overflow-x-auto hide-scrollbar border-t border-gray-100 lg:border-0 lg:pt-3">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-14 h-14 lg:w-18 lg:h-18 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all active:scale-95 ${activeImage === img ? 'border-primary ring-1 ring-primary/20 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info - Flipkart Style */}
            <div className="bg-white lg:bg-transparent px-4 lg:px-0 py-3 lg:py-0">
              {/* Breadcrumb - Desktop Only */}
              <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                <span>/</span>
                <span className="text-gray-700">{product.category}</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </div>

              {/* Category Badge */}
              <div className="mb-1.5">
                <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-base lg:text-2xl font-semibold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews - Flipkart Style */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                  <span className="text-sm font-semibold text-green-700">{rating}</span>
                  <Star className="w-3.5 h-3.5 fill-green-700 text-green-700" />
                </div>
                <span className="text-xs text-gray-500">
                  ({numReviews} {numReviews === 1 ? 'Review' : 'Reviews'})
                </span>
                {product.badge && (
                  <span className="ml-auto text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Price Section - Flipkart Style */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2.5 mb-0.5">
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                    ₹{typeof displayPrice === 'number' ? displayPrice.toLocaleString() : displayPrice}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-base lg:text-lg text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        {discountPercent}% off
                      </span>
                    </>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-xs text-gray-500">You save ₹{(product.originalPrice - displayPrice).toLocaleString()}</p>
                )}
              </div>

              {/* Variant Selector - Flipkart Style */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Select Weight</label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.variants.map((variant: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-2 rounded-md border-2 transition-all text-xs font-medium min-h-[40px] ${selectedVariant?.weight === variant.weight
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-primary'}`}
                      >
                        {variant.weight}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status & Weight */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {displayStock > 0 ? (
                      <>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-600">In Stock</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600">{selectedVariant ? selectedVariant.weight : product.weight}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-xs font-medium text-red-600">Out of Stock</span>
                      </>
                    )}
                  </div>
                  {displayStock > 0 && displayStock < 10 && (
                    <span className="text-xs text-orange-600 font-medium">Only {displayStock} left!</span>
                  )}
                </div>
              </div>

              {/* Key Features - Flipkart Style */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Key Features</h3>
                <div className="space-y-1.5">
                  {highlights.map((highlight) => (
                    <div key={highlight.text} className="flex items-start gap-2 text-xs text-gray-700">
                      <highlight.icon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information - Flipkart Style */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Delivery & Services</h3>
                <div className="space-y-1.5">
                  {deliveryInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <info.icon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{info.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector - Desktop Only */}
              <div className="hidden lg:flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button - Desktop Only */}
              <div className="hidden lg:flex gap-2.5 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={displayStock <= 0}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={displayStock <= 0}
                  className="px-5 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Product Details Tabs - Flipkart Style */}
              <div className="mt-3 lg:mt-4">
                <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar -mx-4 lg:mx-0 px-4 lg:px-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2.5 font-medium text-xs whitespace-nowrap transition-colors relative min-h-[44px] flex items-center border-b-2 -mb-[1px] active:scale-95 ${activeTab === tab.id
                        ? 'text-primary border-primary font-semibold'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-3 lg:p-4 min-h-[100px]"
                  >
                    <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                      {activeTab === 'description' && product.description}
                      {activeTab === 'ingredients' && (product.ingredients || '100% natural composition of single-origin Indian botanical elements, sustainably sourced.')}
                      {activeTab === 'usage' && (product.usage || 'Add during the final stages of cooking to preserve its delicate aromatic profile.')}
                      {activeTab === 'storage' && (product.storage || 'Store in a cool, dry place away from direct sunlight. Keep in airtight container.')}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart Bar - Mobile Only (Flipkart Style) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl lg:hidden">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <div className="flex items-center gap-0.5 border border-gray-300 rounded-lg bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center active:bg-gray-100 transition-colors rounded-l-lg"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="w-10 text-center font-semibold text-gray-900 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center active:bg-gray-100 transition-colors rounded-r-lg"
              disabled={displayStock > 0 && quantity >= displayStock}
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <div className="flex-1 flex gap-1.5">
            <button
              onClick={handleAddToCart}
              disabled={displayStock <= 0}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-md text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden xs:inline">{displayStock > 0 ? `Add • ₹${(displayPrice * quantity).toLocaleString()}` : 'Out of Stock'}</span>
              <span className="xs:hidden">{displayStock > 0 ? 'Add' : 'Out'}</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={displayStock <= 0}
              className="px-3.5 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm"
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Related Products - Mobile Optimized */}
      {
        relatedProducts.length > 0 && (
          <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-50 border-t border-gray-200">
            <div className="container-custom px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900">
                  Similar Products
                </h2>
                <Link 
                  to="/products" 
                  className="text-primary font-medium text-xs hover:underline underline-offset-2 transition-all flex items-center"
                >
                  View All →
                </Link>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-3 snap-x snap-mandatory hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 md:gap-4 sm:overflow-visible sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0">
                {relatedProducts.map((p, index) => (
                  <div key={p.id} className="min-w-[240px] sm:min-w-0 snap-start">
                    <ProductCard product={p} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }
    </div >
  );
};

export default ProductDetail;
