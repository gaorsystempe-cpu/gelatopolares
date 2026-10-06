import React from 'react';
import { Logo } from './Logo';
import { Sparkles, ShieldCheck, Clock, Flame, ArrowRight, IceCream, Coffee, GlassWater } from 'lucide-react';
import { StoreConfig, CategoryId } from '../types';

interface SplashScreenProps {
  storeConfig: StoreConfig;
  onEnterCatalog: (categoryId?: CategoryId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  storeConfig,
  onEnterCatalog,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-neutral-950 text-white select-none">
      {/* Background ambient lighting and gelato drip glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[340px] bg-gradient-to-b from-amber-500/25 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Italian Gelato Dripping Canopy Top Bar */}
      <div className="relative z-10 w-full px-5 pt-8 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-semibold text-[11px]">Abierto ahora</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-300 text-[11px] font-mono">10:00 AM - 10:00 PM</span>
        </div>

        <div className="text-[11px] text-amber-400/90 font-medium tracking-wide flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-800/40">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Delivery Huancayo</span>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-6 text-center max-w-md mx-auto w-full">
        {/* Floating High-Res Logo with gentle float effect and soft warm aura */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/30 to-yellow-500/30 rounded-full blur-xl opacity-75 animate-pulse" />
          <div className="animate-float-gentle relative">
            <Logo size="xl" showText={false} className="justify-center" />
          </div>
        </div>

        {/* Business Title & Authentic Tagline */}
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white mb-1.5 drop-shadow-sm">
          Polares Auténtico Gelato Italiano
        </h1>
        <p className="text-amber-400 font-medium text-xs sm:text-sm tracking-wide uppercase mb-3">
          100% Artesanal y de Calidad Superior
        </p>
        <p className="text-neutral-300 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed mb-6 font-normal">
          Tradición italiana con ingredientes naturales puros. Mantecado fresco a diario para una textura insuperable.
        </p>

        {/* Value Propositions Strip */}
        <div className="grid grid-cols-3 gap-2 w-full mb-7">
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-neutral-200">100% Natural</span>
            <span className="text-[9px] text-neutral-400">Sin químicos</span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1.5">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-neutral-200">Anti-Deshielo</span>
            <span className="text-[9px] text-neutral-400">Pote térmico</span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-neutral-200">Yape & BCP</span>
            <span className="text-[9px] text-neutral-400">Pago seguro</span>
          </div>
        </div>

        {/* Central Floating Card with Pulsing Glow Animation */}
        <div className="w-full bg-gradient-to-b from-neutral-900/90 to-neutral-900/95 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl animate-pulse-glow backdrop-blur-md">
          {/* Main Action CTA */}
          <button
            onClick={() => onEnterCatalog()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer font-display"
          >
            <span>Ingresar al Catálogo Completo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Quick Access by Category */}
          <div className="mt-3.5 pt-3.5 border-t border-neutral-800/80">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2 text-left">
              Accesos rápidos:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => onEnterCatalog('potes')}
                className="flex flex-col items-center py-2 px-1 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 active:scale-95 transition-all text-neutral-200 border border-neutral-700/50 cursor-pointer"
              >
                <IceCream className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] font-medium leading-tight">Potes 1L/Med</span>
              </button>

              <button
                onClick={() => onEnterCatalog('waffles')}
                className="flex flex-col items-center py-2 px-1 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 active:scale-95 transition-all text-neutral-200 border border-neutral-700/50 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] font-medium leading-tight">Waffles</span>
              </button>

              <button
                onClick={() => onEnterCatalog('bebidas')}
                className="flex flex-col items-center py-2 px-1 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 active:scale-95 transition-all text-neutral-200 border border-neutral-700/50 cursor-pointer"
              >
                <GlassWater className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] font-medium leading-tight">Milkshakes</span>
              </button>

              <button
                onClick={() => onEnterCatalog('cafeteria')}
                className="flex flex-col items-center py-2 px-1 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 active:scale-95 transition-all text-neutral-200 border border-neutral-700/50 cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] font-medium leading-tight">Affogato</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info note */}
      <div className="relative z-10 w-full px-6 py-4 text-center border-t border-neutral-900 text-neutral-400 text-[11px] pb-safe">
        <span>Pedidos directos a WhatsApp </span>
        <span className="text-amber-400 font-semibold font-mono">{storeConfig.whatsappFormatted}</span>
      </div>
    </div>
  );
};
