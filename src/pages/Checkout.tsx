import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Package, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      // Simulate order processing
      setTimeout(() => {
        setIsSubmitting(false);
        setOrderComplete(true);
        clearCart();
      }, 2000);
    }
  };

  const steps = [
    { id: 1, name: 'Concierge', icon: Package },
    { id: 2, name: 'Logistics', icon: Truck },
    { id: 3, name: 'Bespoke Pay', icon: CreditCard },
  ];

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-32 h-32 mx-auto mb-10 rounded-[2rem] bg-secondary flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.3)]"
          >
            <Check className="w-16 h-16 text-stone-900" />
          </motion.div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-secondary italic">the Legacy</span>
          </h1>
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-12">
            Order Confirmed • Reference #BVR{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Purity Promise</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Your spices are being freshly extracted and packed within 24 hours of this confirmation.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center flex flex-col justify-center">
              <p className="text-secondary font-heading font-bold text-2xl italic mb-2">
                "Taste You Can Trust"
              </p>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em]">BVR Heritage Standard</p>
            </div>
          </div>

          <Link to="/">
            <button className="btn-premium px-12 py-5 text-sm uppercase tracking-widest">
              Return to Gallery
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-stone-950 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/50" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <Link to="/cart">
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/5 transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] block mb-2">Final Step</span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                  Bespoke <span className="text-stone-400 italic">Checkout</span>
                </h1>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-full border border-white/10">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <motion.div
                    animate={{
                      scale: step >= s.id ? 1 : 0.9,
                      opacity: step >= s.id ? 1 : 0.3,
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                      step >= s.id ? 'bg-secondary text-stone-900 shadow-lg' : 'text-white'
                    }`}
                  >
                    {step > s.id ? (
                      <Check className="w-3 h-3 font-bold" />
                    ) : (
                      <s.icon className={`w-3 h-3 ${step === s.id ? 'text-stone-900' : 'text-secondary'}`} />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{s.name}</span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="w-6 h-[1px] bg-white/10 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                  <div className="bg-stone-50 rounded-[2rem] p-8 md:p-10 border border-stone-100 shadow-sm">
                    {step === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">Concierge Details</h2>
                          <p className="text-stone-400 text-sm font-light">Where shall we deliver your treasure?</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="e.g. Rahul"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              placeholder="e.g. Sharma"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="rahul@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">Contact Number</label>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="+91 00000 00000"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">Logistics</h2>
                          <p className="text-stone-400 text-sm font-light">The destination for your BVR spices.</p>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">Full Address</label>
                            <input
                              type="text"
                              name="address"
                              placeholder="Apartment, Street, Landmark"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                              required
                            />
                          </div>
                          <div className="grid sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">City</label>
                              <input
                                type="text"
                                name="city"
                                placeholder="Vijayawada"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">State</label>
                              <input
                                type="text"
                                name="state"
                                placeholder="Andhra Pradesh"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-4">PIN Code</label>
                              <input
                                type="text"
                                name="pincode"
                                placeholder="520012"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-stone-200 rounded-full px-6 py-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-secondary transition-all shadow-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">Bespoke Pay</h2>
                          <p className="text-stone-400 text-sm font-light">Secure your acquisition via premium channels.</p>
                        </div>
                        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 shadow-sm relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-3xl" />
                          <CreditCard className="w-16 h-16 mx-auto mb-6 text-secondary group-hover:scale-110 transition-transform duration-500" />
                          <p className="text-stone-500 mb-8 max-w-xs mx-auto font-light leading-relaxed">
                            Bespoke Checkout is in demonstration mode. No assets will be transferred.
                          </p>
                          <div className="flex flex-wrap justify-center gap-3">
                            {['Imperial Card', 'Bespoke UPI', 'Digital Vault'].map((method) => (
                              <div key={method} className="px-6 py-3 bg-stone-50 rounded-full border border-stone-100 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-6 mt-12">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="flex-1 px-8 py-4 border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-100 transition-all font-heading"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-premium flex-1 !py-4 justify-center text-xs"
                      >
                        {isSubmitting ? (
                          'Securing Transaction...'
                        ) : step === 3 ? (
                          'Acquire Now'
                        ) : (
                          'Proceed to Logistics'
                        )}
                      </button>
                    </div>
                  </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-stone-900 text-white rounded-[2rem] p-8 md:p-10 sticky top-24 border border-white/5 shadow-2xl overflow-hidden">
                <h2 className="font-heading text-xl font-bold mb-8 flex items-center gap-3">
                  Summary
                  <div className="h-[1px] flex-1 bg-white/10" />
                </h2>

                <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-secondary/50 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate text-white uppercase tracking-wider">{item.name}</p>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Qty: {item.quantity} • {item.weight}</p>
                      </div>
                      <p className="font-bold text-sm text-secondary">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8 space-y-4">
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Subtotal</span>
                    <span className="font-bold text-white">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Concierge Logistics</span>
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-widest italic">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/70 block mb-1">Total Balance</span>
                      <span className="text-3xl font-bold text-white leading-none">₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
