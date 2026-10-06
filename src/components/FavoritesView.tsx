import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

interface FavoritesViewProps {
  favoriteProducts: Product[];
  cartQuantities: { [productId: string]: number };
  onToggleFavorite: (productId: string) => void;
  onQuickAdd: (product: Product) => void;
  onQuickDecrease: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onGoToCatalog: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteProducts,
  cartQuantities,
  onToggleFavorite,
  onQuickAdd,
  onQuickDecrease,
  onOpenDetails,
  onGoToCatalog,
}) => {
  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-display text-neutral-900 dark:text-white">
            Tus Favoritos Polares
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Los sabores y especialidades que más amas, a un solo toque de distancia
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-neutral-800/80 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-1">
            Aún no tienes favoritos guardados
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mb-5 leading-relaxed">
            Presiona el icono de corazón en cualquier producto del catálogo para tenerlo siempre a mano aquí.
          </p>
          <button
            onClick={onGoToCatalog}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-display"
          >
            Explorar Gelatos & Waffles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={cartQuantities[product.id] || 0}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onQuickAdd={onQuickAdd}
              onQuickDecrease={onQuickDecrease}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
