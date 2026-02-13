import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Leaf, Package, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Home = () => {
  const bestsellers = products.slice(0, 4);

  const trustIndicators = [
    { icon: Leaf, title: '100% Natural', description: 'No artificial additives or preservatives' },
    { icon: Shield, title: 'Premium Quality', description: 'Rigorous quality testing standards' },
    { icon: Package, title: 'Hygienic Packing', description: 'Sealed for freshness & purity' },
    { icon: Star, title: 'Authentic Taste', description: 'Traditional Indian recipes' },
  ];

  const qualityBadges = [
    { icon: CheckCircle, text: 'Quality Checked' },
    { icon: CheckCircle, text: 'Trusted by 10,000+ Families' },
    { icon: CheckCircle, text: 'Made in India' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-950">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/brand-assets/hero.png"
            alt="Cinematic Spice Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
        </div>

        <div className="container-custom relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <div className="w-12 h-[1px] bg-secondary" />
                <span className="text-secondary font-bold text-sm uppercase tracking-[0.4em]">
                  Premium Quality Since 2010
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8"
              >
                The Spirit of <br />
                <span className="text-secondary italic">Indian Heritage</span> <br />
                in Every Pinch.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl text-stone-300 mb-12 max-w-xl leading-relaxed font-light"
              >
                Authentic, single-origin spices handpicked from the most fertile fields of India. 
                Experience purity that honors tradition.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link to="/products">
                  <button className="btn-premium">
                    Shop the Collection
                  </button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10 rounded-full px-10">
                    Our Story
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Desktop Glass Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="hidden lg:block"
            >
              <div className="glass-card relative">
                <div className="absolute top-0 right-0 p-8">
                  <Star className="w-12 h-12 text-secondary/30 fill-secondary/10" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-8">Why BVR Spices?</h3>
                <div className="space-y-8">
                  {[
                    { title: "Purest Sourcing", desc: "No fillers, no colors. Just 100% natural spice." },
                    { title: "Lab Tested", desc: "Passed through 24 rigorous quality checks." },
                    { title: "Eco-Conscious", desc: "Sustainably harvested and thoughtfully packed." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + (idx * 0.1) }}
                      className="flex gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{item.title}</h4>
                        <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" 
          />
        </motion.div>
      </section>

      {/* Heritage Story Section (New Premium Section) */}
      <section className="section-padding bg-stone-950 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                <img 
                  src="/brand-assets/premium-spice-bg-1.png" 
                  alt="Ancient Spice Trade Heritage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass-card !p-8 max-w-[280px] hidden md:block">
                <p className="font-heading text-4xl font-bold text-secondary mb-2">14+</p>
                <p className="text-white font-medium text-sm leading-relaxed">Years of delivering authentic Indian spices to global kitchens.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-6 block">Our Heritage</span>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Honoring the <br />
                <span className="text-stone-400">Ancestral Art</span> <br />
                of Indian Spices.
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-8">
                Since 2010, BVR Spices has been more than just a brand; it's a bridge to the past. 
                We source our ingredients from the same fields that produced spices for the 
                ancient Silk Road, ensuring the same vibrancy and depth of flavor.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Direct Sourcing</h4>
                  <p className="text-stone-500 text-sm">Working hand-in-hand with heritage farmers.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Traditional Grinding</h4>
                  <p className="text-stone-500 text-sm">Slow-ground to preserve the natural volatile oils.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-stone-50 border-y border-stone-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {trustIndicators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:shadow-premium group-hover:scale-110 transition-all duration-500 ease-out">
                  <item.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-heading font-bold text-xl text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 max-w-[180px] mx-auto leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestselling Products */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Collection
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
              Bestselling Spices
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved spices, carefully selected and packed to bring 
              authentic flavors to your kitchen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-stone-900 text-white relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-6 block">Our Quality Pillars</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
                Crafting Purity for <br />
                <span className="text-secondary">Discerning</span> Palates.
              </h2>
              <div className="space-y-12">
                {[
                  { icon: Leaf, title: "Heritage Sourcing", desc: "We partner exclusively with multi-generational farms that prioritize soul over scale." },
                  { icon: Shield, title: "Uncompromising QC", desc: "Every batch is tested against 24 critical safety and flavor parameters in ISO-certified labs." },
                  { icon: Package, title: "Artisan Packing", desc: "Small-batch packed in light-protected glass and high-grade foil to lock in volatile oils." }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500">
                      <item.icon className="w-8 h-8 text-secondary group-hover:text-stone-900 transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-2 text-white group-hover:text-secondary transition-colors">{item.title}</h3>
                      <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <motion.img
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  src="/brand-assets/premium-spice-bg-2.png"
                  alt="Spice Perfection"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-10 -left-10 glass-card !p-10 max-w-[240px] hidden md:block border-secondary/20 bg-secondary/10">
                <Star className="w-10 h-10 text-secondary mb-4" />
                <p className="text-white font-bold text-lg leading-tight uppercase tracking-wider">The Standard <br /> of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Assurance */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {qualityBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The BVR Process - Interactive Timeline */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-bold text-sm uppercase tracking-[0.4em] mb-4 block"
            >
              The Science of Purity
            </motion.span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-stone-900 mb-6">
              How We <span className="text-primary italic">Perfect</span> Your Spices
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-stone-100 -translate-y-1/2 z-0" />

            <div className="grid lg:grid-cols-3 gap-12 relative z-10">
              {[
                { 
                  step: '01', 
                  title: 'Seed to Harvest', 
                  desc: 'We select non-GMO seeds and monitor the growth through traditional farming cycles.',
                  icon: Leaf 
                },
                { 
                  step: '02', 
                  title: 'Cold Grinding', 
                  desc: 'Traditional slow-grinding at low temperatures to preserve volatile oils and natural aroma.',
                  icon: Shield 
                },
                { 
                  step: '03', 
                  title: '24-Point QC', 
                  desc: 'Every batch is tested for purity, pesticide residue, and flavor intensity in our labs.',
                  icon: CheckCircle 
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="bg-stone-50 rounded-[3rem] p-12 text-center border border-stone-100 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-primary/20">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <span className="text-primary font-bold text-5xl opacity-10 mb-4 block">{item.step}</span>
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="section-padding bg-stone-50 overflow-hidden relative">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-bold text-sm uppercase tracking-[0.4em] mb-4 block"
              >
                Global Voices
              </motion.span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                Loved by <br />
                <span className="text-primary italic">Chefs & Families</span> <br />
                Alike
              </h2>
              <p className="text-stone-500 mb-8 leading-relaxed">
                From professional kitchens to dining tables across the globe, 
                our spices are the secret ingredient to authentic Indian flavors.
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100 flex-1">
                  <p className="text-stone-900 font-bold text-2xl">4.9/5</p>
                  <p className="text-stone-400 text-xs uppercase tracking-widest">Average Rating</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100 flex-1">
                  <p className="text-stone-900 font-bold text-2xl">50k+</p>
                  <p className="text-stone-400 text-xs uppercase tracking-widest">Global Orders</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 relative">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Anita Sharma",
                    role: "Professional Chef",
                    text: "The Teja Chilli from BVR is unmatched. The color it adds to my Rogan Josh without overpowering the other spices is pure artistry. Truly premium sourcing.",
                    rating: 5
                  },
                  {
                    name: "David Miller",
                    role: "Home Cook",
                    text: "I've tried many brands, but the aroma of BVR Turmeric is something else. It smells alive! You can tell it hasn't been sitting in a warehouse for years.",
                    rating: 5
                  }
                ].map((testimonial, idx) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.2, duration: 0.8 }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 relative"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                      ))}
                    </div>
                    <p className="text-stone-700 italic mb-8 leading-relaxed text-lg">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-stone-200 border-2 border-primary/20" />
                      <div>
                        <h4 className="font-bold text-stone-900">{testimonial.name}</h4>
                        <p className="text-primary text-xs font-semibold uppercase tracking-widest">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Origin Section */}
      <section className="section-padding bg-stone-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-4 block"
            >
              The Journey of Purity
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl font-bold mb-6"
            >
              From the <span className="text-secondary italic">Red Soils</span> <br className="hidden md:block" />
              to Your Kitchen
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              We source our spices directly from heritage farms across India's most fertile regions, 
              ensuring that every pinch carries the authentic soul of its origin.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                region: 'Guntur, Andhra Pradesh', 
                spice: 'Teja Chilli', 
                img: 'https://images.unsplash.com/photo-1599411995166-02e5352f71f1?q=80&w=2000&auto=format&fit=crop',
                desc: 'Famous for its vibrant red color and intense heat, sourced from the chili capital of India.'
              },
              { 
                region: 'Erode, Tamil Nadu', 
                spice: 'Salem Turmeric', 
                img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2000&auto=format&fit=crop',
                desc: 'Known for high curcumin content and earthy aroma, carefully selected for daily wellness.'
              },
              { 
                region: 'Wayanad, Kerala', 
                spice: 'Black Gold Pepper', 
                img: 'https://images.unsplash.com/photo-1596450514735-24402770eeef?q=80&w=2000&auto=format&fit=crop',
                desc: 'Premium bold peppercorns from the lush Western Ghats, packed with essential oils.'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.region}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="group cursor-default"
              >
                <div className="relative h-[450px] overflow-hidden rounded-[2.5rem] mb-6 shadow-2xl">
                  <img 
                    src={item.img} 
                    alt={item.spice} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">{item.region}</span>
                    <h3 className="font-heading text-3xl font-bold text-white mb-2">{item.spice}</h3>
                    <p className="text-stone-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-balance">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container-custom">
          <div className="glass-card !bg-stone-950 !border-stone-800 relative z-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-6 block"
              >
                The Culinary Club
              </motion.span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Receive Our <span className="text-secondary italic">Secret</span> Recipes
              </h2>
              <p className="text-stone-400 text-lg mb-10 leading-relaxed">
                Join our community of flavor enthusiasts. Get monthly spice pairings, 
                heritage recipes, and exclusive early access to our seasonal harvests.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-secondary transition-colors"
                />
                <button type="button" className="btn-premium !px-12">
                  Join Now
                </button>
              </form>
              <p className="mt-6 text-stone-500 text-xs">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/brand-assets/premium-spice-bg-ultra.png" 
            alt="Final CTA Background" 
            className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950" />
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ready to Transform <br />
              <span className="text-secondary italic">Your Cooking?</span>
            </h2>
            <p className="text-stone-400 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Step into a world of pure, authentic flavor. Experience the BVR difference 
              and bring the soul of India to your kitchen today.
            </p>
            <Link to="/products">
              <button className="btn-premium !px-16 !py-6 !text-xl shadow-premium hover:shadow-hover">
                Explore the Boutique
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
