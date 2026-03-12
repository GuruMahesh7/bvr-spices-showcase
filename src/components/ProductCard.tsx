import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product, useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-medium">
            {product.badge}
          </Badge>
        )}

        {/* Quick Actions Overlay - Desktop / Large Screens */}
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={`/products/${product.id}`}>
              <Button
                variant="secondary"
                className="rounded-full px-8 bg-white text-stone-900 hover:bg-secondary hover:text-stone-950 font-bold tracking-widest text-xs uppercase"
              >
                View Details
              </Button>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-stone-950 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Gold Foil Badge */}
          {product.badge && (
            <div className="absolute top-5 left-5">
              <div className="bg-gradient-to-br from-secondary via-secondary-foreground to-secondary px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950">
                  {product.badge}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions - Mobile Friendly */}
      <div className="mt-3 px-4 flex items-center justify-between gap-3 md:hidden">
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button
            variant="secondary"
            className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide text-xs uppercase"
          >
            View Details
          </Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-primary/40 text-primary hover:bg-primary/10 flex-shrink-0"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.weight}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                ₹{typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div >
  );
};

export default ProductCard;
