import React, { useState } from 'react';
import { CartItem, DeliveryZone } from '../types';
import { X, Trash2, Plus, Minus, Tag, Check, ShoppingBag, ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  selectedZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
  tip: number;
  onSelectTip: (tip: number) => void;
  couponCode: string;
  discountAmount: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  subtotal: number;
  total: number;
  onProceedToCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  selectedZone,
  onSelectZone,
  tip,
  onSelectTip,
  couponCode,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
  subtotal,
  total,
  onProceedToCheckout,
  onExplore,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim());
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const tipOptions = [0, 2, 3, 5, 8];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col z-10 border-l border-neutral-200 dark:border-neutral-800 animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50 dark:bg-neutral-850">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white leading-tight">
                Tu Pedido Polares
              </h3>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {items.length} {items.length === 1 ? 'ítem agregado' : 'ítems agregados'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-1">
                Tu carrito está vacío
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-6">
                Aún no has agregado deliciosos gelatos artesanales. Explora nuestro catálogo y date un gusto hoy.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-display"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Product items list */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider block">
                  Productos Seleccionados
                </span>

                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 flex gap-3 relative group"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-200 dark:border-neutral-700"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate font-display">
                        {item.product.name}
                      </h4>

                      {/* Flavors preview */}
                      {item.selectedFlavors.length > 0 && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium line-clamp-1 mt-0.5">
                          Sabores: {item.selectedFlavors.join(' + ')}
                        </p>
                      )}

                      {/* Topping preview */}
                      {item.selectedTopping && (
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                          Topping: {item.selectedTopping}
                        </p>
                      )}

                      {/* Instructions */}
                      {item.specialInstructions && (
                        <p className="text-[10px] text-neutral-400 italic line-clamp-1">
                          &quot;{item.specialInstructions}&quot;
                        </p>
                      )}

                      {/* Quantity & Item price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-200/60 dark:border-neutral-700/50">
                        <span className="text-xs font-extrabold font-mono text-neutral-900 dark:text-white">
                          S/ {item.totalPrice.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-700 px-1 py-0.5 rounded-lg border border-neutral-200 dark:border-neutral-600">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-[11px] font-bold font-mono px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-neutral-100 dark:hover:bg-neutral-600 font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      aria-label="Eliminar ítem"
                      className="absolute top-2.5 right-2.5 w-6 h-6 rounded-lg text-neutral-400 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* District & Shipping Rate Selection */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Distrito de Entrega (Huancayo)
                  </label>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {selectedZone.price === 0 ? 'GRATIS' : `S/ ${selectedZone.price.toFixed(2)}`}
                  </span>
                </div>
                <select
                  value={selectedZone.id}
                  onChange={(e) => {
                    const zone = DELIVERY_ZONES.find((z) => z.id === e.target.value);
                    if (zone) onSelectZone(zone);
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} — {zone.price === 0 ? 'Gratis (Tienda)' : `S/ ${zone.price.toFixed(2)}`} ({zone.estMinutes})
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <span>Tiempo estimado de entrega:</span>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                    {selectedZone.estMinutes}
                  </span>
                </div>
              </div>

              {/* Courier tip selector */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4 text-amber-500" />
                  <span>Propina voluntaria para el repartidor</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {tipOptions.map((amount) => {
                    const isSelected = tip === amount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => onSelectTip(amount)}
                        className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-neutral-950 shadow-xs'
                            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {amount === 0 ? 'No' : `S/${amount}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coupon Validation Form */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Cupón de Descuento</span>
                  </label>
                  {couponCode && (
                    <button
                      onClick={onRemoveCoupon}
                      className="text-[10px] text-rose-500 hover:underline font-semibold cursor-pointer"
                    >
                      Quitar cupón
                    </button>
                  )}
                </div>

                {couponCode ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Cupón <strong>{couponCode}</strong> aplicado</span>
                    </div>
                    <span className="font-mono font-bold">- S/ {discountAmount.toFixed(2)}</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Ej. POLARES10, VERANO"
                      className="flex-1 text-xs px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase font-mono placeholder:normal-case focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                )}

                {/* Suggested coupon hints */}
                {!couponCode && (
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-300 flex items-center gap-1 pt-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Prueba: <strong className="text-amber-700 dark:text-amber-400 font-mono">POLARES10</strong> (10% off) o <strong className="text-amber-700 dark:text-amber-400 font-mono">ENVIOGRATIS</strong></span>
                  </div>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] font-medium ${
                      couponFeedback.success
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-850 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal productos:</span>
                  <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                    S/ {subtotal.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Descuento cupón ({couponCode}):</span>
                    <span className="font-mono">- S/ {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Envío ({selectedZone.name}):</span>
                  <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                    {selectedZone.price === 0 ? 'Gratis' : `S/ ${selectedZone.price.toFixed(2)}`}
                  </span>
                </div>

                {tip > 0 && (
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Propina voluntaria repartidor:</span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                      S/ {tip.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-baseline font-bold">
                  <span className="text-sm text-neutral-900 dark:text-white">Total a Pagar:</span>
                  <span className="text-lg font-mono text-amber-600 dark:text-amber-400 font-extrabold tracking-tight">
                    S/ {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Proceed Button */}
        {items.length > 0 && (
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0">
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-105 active:scale-[0.98] text-neutral-950 font-bold text-sm flex items-center justify-between shadow-lg shadow-amber-500/25 transition-all cursor-pointer font-display"
            >
              <span>Continuar al Pago y Datos de Envío</span>
              <div className="flex items-center gap-1.5 font-mono font-extrabold">
                <span>S/ {total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
