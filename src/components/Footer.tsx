import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Chilli Powder', path: '/products?category=Powders' },
    { name: 'Turmeric', path: '/products?category=Powders' },
    { name: 'Garam Masala', path: '/products?category=Masalas' },
    { name: 'Biryani Masala', path: '/products?category=Blends' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-stone-950 text-white border-t border-stone-900">
      {/* Main Footer */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-premium">
                <span className="text-stone-950 font-heading font-bold text-xl">B</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                BVR Spices
              </h3>
            </div>
            <p className="text-stone-400 mb-8 text-sm leading-relaxed font-light">
              Crafting legacy through purity since 2010. Our spices are 
              honored by tradition and gathered from the most fertile 
              origins of the Indian soil.
            </p>
            <div className="inline-block p-4 border border-secondary/20 rounded-2xl bg-secondary/5">
              <p className="text-secondary font-heading italic text-sm">
                "Purity Honored, Tradition Preserved"
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-[0.3em] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-500 hover:text-secondary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-secondary transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-[0.3em] mb-8">
              Collections
            </h4>
            <ul className="space-y-4">
              {categories.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-stone-500 hover:text-secondary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-secondary transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-[0.3em] mb-8">
              Our Parlour
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 text-stone-400 group">
                <MapPin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-sm">
                  Door No: #28-251, Jakkamapudi<br />
                  Vijayawada, AP - 520012
                </span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 group">
                <Phone className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-sm">93983 62452</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 group">
                <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-sm">bvrspices@gmail.com</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-10">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-stone-950 transition-all duration-500"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-stone-950">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-600 font-medium">
            <p className="tracking-widest uppercase">© 2024 BVR Spices. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <Link to="#" className="hover:text-white transition-colors uppercase tracking-widest">
                Privacy
              </Link>
              <Link to="#" className="hover:text-white transition-colors uppercase tracking-widest">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
