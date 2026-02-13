import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Registered Office',
      details: ['Door No: #28-251, R S No: 366/2B', 'YSR Colony Road, Jakkamapudi', 'Vijayawada, AP - 520012'],
    },
    {
      icon: Phone,
      title: 'Customer Care',
      details: ['93983 62452'],
    },
    {
      icon: Mail,
      title: 'Official Email',
      details: ['bvrspices@gmail.com'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0">
          <img 
            src="/brand-assets/hero.png" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
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
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em]">The Boutique Parlour</span>
              <div className="w-8 h-[1px] bg-secondary" />
            </motion.div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">
              Connect With <span className="text-secondary italic">Purity</span>
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Have a question about our collections or need a bespoke recommendation? 
              Our concierge team is here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info (Info Boutique) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <h2 className="font-heading text-3xl font-bold text-stone-900 mb-10">
                The <span className="text-primary italic">Parlour</span> Details
              </h2>
              <div className="space-y-10">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-500">
                      <info.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-stone-900 mb-2 group-hover:text-primary transition-colors">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-stone-500 font-light leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form (Glassmorphism Luxury) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="glass-card !bg-stone-950 !border-stone-800 !p-12 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 relative z-10"
                  >
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                      <CheckCircle className="w-12 h-12 text-secondary" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-white mb-4">
                      Inquiry Received
                    </h3>
                    <p className="text-stone-400 mb-10 font-light">
                      Thank you for contacting the BVR concierge. We will respond within 24 hours.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="btn-premium">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <div className="relative z-10">
                    <h2 className="font-heading text-3xl font-bold text-white mb-10">
                      Send a <span className="text-secondary italic">Bespoke</span> Inquiry
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Your Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-secondary transition-colors font-light"
                            placeholder="Full Name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-secondary transition-colors font-light"
                            placeholder="email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Phone (Optional)</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-secondary transition-colors font-light"
                            placeholder="+91 00000 00000"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Inquiry Topic</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-secondary transition-colors font-light appearance-none"
                            required
                          >
                            <option value="" disabled className="bg-stone-900">Select a topic</option>
                            <option value="general" className="bg-stone-900">General Inquiry</option>
                            <option value="order" className="bg-stone-900">Order Concierge</option>
                            <option value="product" className="bg-stone-900">Product Heritage</option>
                            <option value="wholesale" className="bg-stone-900">Wholesale Boutique</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Your Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:outline-none focus:border-secondary transition-colors font-light min-h-[120px] resize-none"
                          placeholder="How may we assist you?"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-premium w-full sm:w-auto"
                      >
                        {isSubmitting ? 'Sending inquiry...' : 'Send Message'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Experience Banner */}
      <section className="py-24 bg-stone-50 overflow-hidden relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="grid grid-cols-6 h-full w-full">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border-r border-b border-stone-900" />
            ))}
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="font-heading text-3xl font-bold text-stone-900 mb-4">
              Immediate <span className="text-primary italic">Concierge</span>
            </h3>
            <p className="text-stone-500 mb-10 font-light text-lg">
              For urgent procurement or wholesale inquiries, please contact our head office directly.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              <a href="tel:+919398362452" className="group">
                <span className="block text-xs uppercase tracking-[0.4em] text-stone-400 mb-2">Hotline</span>
                <span className="text-2xl font-bold text-primary group-hover:underline underline-offset-8">+91 93983 62452</span>
              </a>
              <a href="mailto:bvrspices@gmail.com" className="group">
                <span className="block text-xs uppercase tracking-[0.4em] text-stone-400 mb-2">Direct Email</span>
                <span className="text-2xl font-bold text-primary group-hover:underline underline-offset-8">bvrspices@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
