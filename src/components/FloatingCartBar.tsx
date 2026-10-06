import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface FloatingCartBarProps {
  totalItems: number;
  totalAmount: number;
  onOpenCart: () => void;
  isVisible: boolean;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  totalItems,
  totalAmount,
  onOpenCart,
  isVisible,
}) => {
  if (!isVisible || totalItems === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-35 px-4 pointer-events-none animate-slide-up">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-amber-500/35 border border-amber-300/60 flex items-center justify-between active:scale-[0.98] transition-all hover:brightness-105 cursor-pointer font-display"
        >
          {/* Left: Cart badge & items count */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 text-amber-400 flex items-center justify-center font-bold text-xs shadow-inner">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-xs font-semibold block text-neutral-900">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu pedido
              </span>
              <span className="text-[11px] text-neutral-800 font-medium">
                Toca para ver el desglose
              </span>
            </div>
          </div>

          {/* Right: Total price & arrow */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-900 block leading-none">
                Total
              </span>
              <span className="text-base font-extrabold font-mono tracking-tight text-neutral-950">
                S/ {totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-neutral-950/10 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 stroke-[2.5] text-neutral-950" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
