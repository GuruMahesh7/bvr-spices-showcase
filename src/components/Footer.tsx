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
      <div className="container-custom py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center shadow-premium">
                <span className="text-stone-950 font-heading font-bold text-lg sm:text-xl">B</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                BVR Spices
              </h3>
            </div>
            <p className="text-stone-400 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed font-light">
              Crafting legacy through purity since 2010. Our spices are 
              honored by tradition and gathered from the most fertile 
              origins of the Indian soil.
            </p>
            <div className="inline-block p-3 sm:p-4 border border-secondary/20 rounded-xl sm:rounded-2xl bg-secondary/5">
              <p className="text-secondary font-heading italic text-xs sm:text-sm">
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
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8">
              Navigation
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-500 hover:text-secondary transition-all duration-300 text-xs sm:text-sm flex items-center group min-h-[36px] sm:min-h-[44px]"
                  >
                    <span className="w-0 group-hover:w-3 sm:group-hover:w-4 h-[1px] bg-secondary transition-all duration-300 mr-0 group-hover:mr-2" />
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
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8">
              Collections
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {categories.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-stone-500 hover:text-secondary transition-all duration-300 text-xs sm:text-sm flex items-center group min-h-[36px] sm:min-h-[44px]"
                  >
                    <span className="w-0 group-hover:w-3 sm:group-hover:w-4 h-[1px] bg-secondary transition-all duration-300 mr-0 group-hover:mr-2" />
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
            <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8">
              Our Parlour
            </h4>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start gap-3 text-stone-400 group">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm leading-relaxed">
                  Door No: #28-251, Jakkamapudi<br />
                  Vijayawada, AP - 520012
                </span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 group min-h-[36px] sm:min-h-[44px]">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-xs sm:text-sm">93983 62452</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 group min-h-[36px] sm:min-h-[44px]">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">bvrspices@gmail.com</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-stone-950 transition-all duration-500 min-h-[36px] sm:min-h-[40px]"
                >
                  <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-stone-950">
        <div className="container-custom py-6 sm:py-8 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-[10px] sm:text-xs text-stone-600 font-medium">
            <p className="tracking-widest uppercase text-center md:text-left">© 2024 BVR Spices. All rights reserved.</p>
            <div className="flex items-center gap-6 sm:gap-8">
              <Link to="#" className="hover:text-white transition-colors uppercase tracking-widest min-h-[36px] sm:min-h-[44px] flex items-center">
                Privacy
              </Link>
              <Link to="#" className="hover:text-white transition-colors uppercase tracking-widest min-h-[36px] sm:min-h-[44px] flex items-center">
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
