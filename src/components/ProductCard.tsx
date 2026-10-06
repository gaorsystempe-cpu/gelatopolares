import React from 'react';
import { Product } from '../types';
import { Star, Plus, Minus, Heart, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onQuickAdd: (product: Product) => void;
  onQuickDecrease: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  isFavorite,
  onToggleFavorite,
  onQuickAdd,
  onQuickDecrease,
  onOpenDetails,
}) => {
  return (
    <div className="group relative flex flex-col bg-white dark:bg-neutral-800/90 rounded-2xl border border-neutral-200/90 dark:border-neutral-700/70 overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Product Image Box */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-neutral-900/40 text-white hover:bg-neutral-900/70'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'fill-current stroke-rose-500' : 'stroke-white'}`}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500/95 text-neutral-950 font-bold text-[10px] tracking-wide uppercase shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Flavors allowed tag */}
        {product.maxFlavors && product.maxFlavors > 1 && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-sm text-neutral-200 text-[10px] font-medium border border-neutral-700/60">
            Hasta {product.maxFlavors} sabores
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-3.5 flex flex-col justify-between">
        <div>
          {/* Rating & reviews */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500 dark:text-amber-400 font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-neutral-400 dark:text-neutral-500 font-normal">
              ({product.reviewCount})
            </span>
          </div>

          {/* Title */}
          <h4
            onClick={() => onOpenDetails(product)}
            className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer font-display"
          >
            {product.name}
          </h4>

          {/* Short description */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Controls */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">S/</span>
              <span className="text-base font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
                {product.price.toFixed(2)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-[10px] text-neutral-400 line-through font-mono">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action buttons: if in cart or needs configuration */}
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-750 px-1 py-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => onQuickDecrease(product)}
                aria-label="Disminuir cantidad"
                className="w-7 h-7 rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="min-w-[20px] text-center text-xs font-bold font-mono text-neutral-900 dark:text-white">
                {quantityInCart}
              </span>
              <button
                onClick={() => onQuickAdd(product)}
                aria-label="Aumentar cantidad"
                className="w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center hover:bg-amber-400 active:scale-95 transition-all shadow-xs font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onQuickAdd(product)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer font-display"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Pedir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
