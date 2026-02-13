import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            The Boutique is Waiting
          </h2>
          <p className="text-stone-400 mb-8 max-w-sm mx-auto font-light">
            Your collection of culinary treasures is currently empty. Start your journey through our premium spice vault.
          </p>
          <Link to="/products">
            <button className="btn-premium px-12 py-4 text-sm">
              Discover Spices
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-stone-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">BVR Concierge</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Review <span className="text-secondary italic">Your Treasures</span>
            </h1>
            <p className="text-stone-400 font-light">
              You have {items.length} {items.length === 1 ? 'masterpiece' : 'masterpieces'} curated for your kitchen
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-[2rem] p-6 mb-6 flex flex-col sm:flex-row gap-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <Link to={`/products/${item.id}`} className="flex-shrink-0 group">
                      <div className="w-full sm:w-28 h-32 sm:h-28 overflow-hidden rounded-2xl relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-heading text-lg font-bold text-stone-950 hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{item.weight}</span>
                            <div className="w-1 h-1 rounded-full bg-stone-200" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{item.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-destructive hover:bg-destructive/5 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 bg-stone-50 rounded-full p-1 border border-stone-100">
                          <button
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3 text-stone-500" />
                          </button>
                          <span className="w-6 text-center font-bold text-stone-900 text-sm">{item.quantity}</span>
                          <button
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3 text-stone-500" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-xl text-primary">
                            ₹{item.price * item.quantity}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-300">
                              ₹{item.price} per unit
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex flex-wrap gap-4 mt-6">
                <Link to="/products">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-stone-950 text-white rounded-[2rem] p-8 md:p-10 sticky top-24 border border-white/5 shadow-2xl overflow-hidden relative group">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all duration-700" />
                
                <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
                  Summary
                  <div className="h-[1px] flex-1 bg-white/10" />
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="text-sm uppercase tracking-widest font-bold">Subtotal</span>
                    <span className="text-lg font-bold text-white">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="text-sm uppercase tracking-widest font-bold">Concierge Fee</span>
                    <span className="text-secondary font-bold text-sm uppercase tracking-widest">Complimentary</span>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold block mb-1">Total Balance</span>
                        <span className="text-3xl font-bold text-white leading-none">₹{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <button className="btn-premium w-full !py-5 justify-center text-sm">
                    Begin Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>

                <div className="mt-8 flex items-center justify-center gap-4 py-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    <div className="w-1 h-1 rounded-full bg-secondary" />
                    Insured Delivery
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    <div className="w-1 h-1 rounded-full bg-secondary" />
                    Purity Guaranteed
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
