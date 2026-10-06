import React, { useState } from 'react';
import { Product, GelatoFlavor } from '../types';
import { X, Star, Plus, Minus, Check, Sparkles, Utensils, Clock, Heart } from 'lucide-react';
import { GELATO_FLAVORS, TOPPINGS_LIST } from '../data/catalog';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedFlavors: string[],
    selectedTopping?: string,
    specialInstructions?: string
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!isOpen || !product) return null;

  const maxFlavors = product.maxFlavors || 1;
  const requiresFlavorSelection = maxFlavors > 0;

  // Initial state
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(() => {
    // default to first popular flavor
    return [GELATO_FLAVORS[0].name];
  });
  const [selectedTopping, setSelectedTopping] = useState<string>(TOPPINGS_LIST[0]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const toggleFlavor = (flavorName: string) => {
    if (selectedFlavors.includes(flavorName)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter((f) => f !== flavorName));
      }
    } else {
      if (selectedFlavors.length < maxFlavors) {
        setSelectedFlavors([...selectedFlavors, flavorName]);
      } else {
        // If max reached, replace the last one
        setSelectedFlavors([...selectedFlavors.slice(0, maxFlavors - 1), flavorName]);
      }
    }
  };

  const handleConfirm = () => {
    onAddToCart(
      product,
      quantity,
      selectedFlavors,
      selectedTopping,
      specialInstructions.trim() ? specialInstructions.trim() : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-neutral-200 dark:border-neutral-800 animate-slide-up">
        {/* Top Handle for mobile drawer feel */}
        <div className="sm:hidden w-10 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Header photo & close button */}
        <div className="relative w-full h-52 sm:h-60 shrink-0 bg-neutral-100 dark:bg-neutral-800">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-neutral-900 active:scale-90 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(product.id)}
            aria-label="Marcar como favorito"
            className={`absolute top-3 left-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-neutral-900/60 text-white hover:bg-neutral-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] uppercase">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-white/70">({product.reviewCount} opiniones)</span>
              </div>
            </div>
            <h3 className="text-xl font-display font-bold leading-tight drop-shadow-sm">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Scrollable details & selectors */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
          {/* Description */}
          <div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* Value badges strip */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Mantecado Diario</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Prep: ~{product.prepTimeMinutes || 5} min</span>
              </div>
              {product.includesCones && (
                <>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Incluye {product.includesCones} barquillos</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Flavor selection section */}
          {requiresFlavorSelection && (
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>Selecciona tus Sabores de Gelato</span>
                  <span className="text-amber-600 dark:text-amber-400 text-[11px]">
                    ({selectedFlavors.length}/{maxFlavors})
                  </span>
                </label>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  {maxFlavors === 1 ? 'Elige 1 sabor' : `Hasta ${maxFlavors} sabores`}
                </span>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {GELATO_FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavors.includes(flavor.name);
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      onClick={() => toggleFlavor(flavor.name)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-neutral-900 dark:text-white shadow-xs'
                          : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Flavor color dot */}
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-neutral-400/40 shrink-0 shadow-xs"
                          style={{ backgroundColor: flavor.colorHex }}
                        />
                        <div>
                          <span className="text-xs font-semibold block leading-tight">
                            {flavor.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {flavor.description}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 ml-2">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-neutral-950 font-bold'
                              : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toppings selection */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
            <label className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block mb-2">
              Topping o Acompañamiento
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {TOPPINGS_LIST.map((topping, idx) => {
                const isSelected = selectedTopping === topping;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTopping(topping)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-200 font-semibold'
                        : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-neutral-400'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="truncate">{topping}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions for Gelato Chef */}
          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
              Indicaciones especiales para el maestro heladero:
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Ej: Empacar barquillos por separado, enviar cucharas extra, poco dulce..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              aria-label="Menos"
              className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center hover:bg-neutral-200 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="min-w-[24px] text-center text-sm font-bold font-mono text-neutral-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Más"
              className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center hover:bg-amber-400 active:scale-95 transition-all shadow-xs font-bold cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Confirm Button with Total Amount */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-105 active:scale-[0.98] text-neutral-950 font-bold text-sm flex items-center justify-between shadow-md shadow-amber-500/25 transition-all cursor-pointer font-display"
          >
            <span>Agregar al Pedido</span>
            <span className="font-mono font-extrabold text-sm">
              S/ {(product.price * quantity).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
