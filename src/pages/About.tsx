import { motion } from 'framer-motion';
import { Leaf, Shield, Package, Award, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const processSteps = [
    {
      step: 1,
      title: 'Sourcing',
      description: 'We source our spices directly from trusted farmers across India who follow traditional farming methods.',
      icon: Leaf,
    },
    {
      step: 2,
      title: 'Grinding',
      description: 'Using state-of-the-art machinery while preserving traditional grinding techniques for optimal flavor.',
      icon: Package,
    },
    {
      step: 3,
      title: 'Packing',
      description: 'Hygienically packed in airtight containers to preserve freshness and extend shelf life.',
      icon: Package,
    },
    {
      step: 4,
      title: 'Quality Check',
      description: 'Every batch undergoes rigorous testing for purity, flavor, and freedom from contaminants.',
      icon: Shield,
    },
  ];

  const values = [
    { icon: Leaf, title: 'Purity', description: '100% natural ingredients with no additives' },
    { icon: Shield, title: 'Quality', description: 'Rigorous testing at every stage' },
    { icon: Award, title: 'Trust', description: 'Loved by thousands of families' },
    { icon: CheckCircle, title: 'Consistency', description: 'Same great taste, every time' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2 }}
            src="/brand-assets/premium-spice-bg-3.png"
            alt="About BVR Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/70" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-[1px] bg-secondary" />
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.5em]">Our Legacy</span>
              <div className="w-12 h-[1px] bg-secondary" />
            </motion.div>
            <h1 className="font-heading text-5xl md:text-8xl font-bold text-white mb-10 leading-tight">
              Purity in <span className="text-secondary italic">Every</span> Grain.
            </h1>
            <p className="text-stone-300 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              Since 2010, we've been more than just spice makers. We are curators of 
              India's rich, ancestral culinary heritage.
            </p>
          </motion.div>
        </div>

        {/* Floating Decor */}
        <div className="absolute -bottom-12 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-[120px]" />
      </section>

      {/* Brand Story (Editorial Style) */}
      <section className="section-padding bg-stone-950 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                <img
                  src="/brand-assets/premium-spice-bg-1.png"
                  alt="Ancient Spice Trade"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass-card !p-12 hidden md:block border-secondary/20 bg-secondary/5">
                <span className="text-secondary font-bold text-5xl mb-2 block">14+</span>
                <p className="text-white text-sm font-medium uppercase tracking-[0.2em]">Years of Excellence</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-6 block">The BVR Narrative</span>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
                Crafting Purity <br />
                <span className="text-stone-500 italic">Across Generations</span>
              </h2>
              <div className="space-y-8 text-stone-400 text-lg leading-relaxed font-light">
                <p>
                  BVR Spices was born from a simple observation: Indian families 
                  deserved better access to pure, authentic spices that honoed the 
                  sensory depth of traditional cooking.
                </p>
                <ul className="list-disc list-inside space-y-4">
                  {[
                    { title: "100% Pure & Natural", desc: "No artificial additives, preservatives, or colors. Just pure spice as nature intended." },
                    { title: "Rich Aroma & Freshness", desc: "Sun-dried and stone-ground to preserve the natural oils and deep fragrance." },
                    { title: "Hygienically Processed", desc: "Maintaining modern standards of hygiene and quality at every step of production." },
                    { title: "Premium Assurance", desc: "Every product reflects our commitment to trust and excellence, tested for purity." }
                  ].map((value, idx) => (
                    <li key={idx}>
                      <strong className="text-white">{value.title}:</strong> {value.desc}
                    </li>
                  ))}
                </ul>
                <p>
                  We don't just sell spices; we curate the alchemy of your kitchen, 
                  ensuring that the heritage of Indian flavor is preserved for 
                  the tables of tomorrow.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process (Glassmorphism) */}
      <section className="section-padding bg-stone-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <span className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-6 block">Our Methodology</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">
              Where <span className="text-secondary italic">Quality</span> <br />
              Meets <span className="text-stone-400">Flavor.</span>
            </h1>
            <p className="text-stone-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              At BVR Spices, we bring the authentic taste of tradition to every kitchen. 
              Based in Vijayawada, we are committed to delivering high-quality, pure, 
              and flavorful spices sourced from the finest farms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="glass-card !p-10 h-full border-white/5 bg-white/5 hover:bg-white/10 group transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
                    <step.icon className="w-8 h-8 text-secondary group-hover:text-stone-900 transition-colors duration-500" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed font-light">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold text-sm uppercase tracking-[0.4em] mb-6 block">What We Stand For</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Our Promise to You
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-10 rounded-3xl bg-white border border-stone-100 hover:shadow-premium transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <value.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Heritage Banner */}
      <section className="py-24 bg-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Star className="w-12 h-12 text-secondary mx-auto mb-8" />
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-8">
              Experience the BVR <span className="text-secondary italic">Difference</span>
            </h2>
            <p className="text-stone-400 text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy families who have made BVR Spices a legacy 
              at their dinner tables.
            </p>
            <Link to="/products">
              <button className="btn-premium !px-16 !py-6 !text-xl">
                Shop the Collection
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
