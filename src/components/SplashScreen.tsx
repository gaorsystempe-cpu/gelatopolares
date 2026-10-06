import React from 'react';
import { Logo } from './Logo';
import { ArrowRight, Sparkles, Sun, Moon, Flame, IceCream, GlassWater, Clock } from 'lucide-react';
import { StoreConfig, CategoryId } from '../types';

// Mouthwatering real gelato assets
import imgBubbleWaffle from '../assets/images/bubble_waffle_gelato_1791312438173.jpg';
import imgGelato1L from '../assets/images/gelato_tub_1liter_1791312448427.jpg';
import imgGelato500ml from '../assets/images/gelato_tub_medium_1791312456968.jpg';
import imgMilkshake from '../assets/images/gelato_milkshake_1791312476756.jpg';

interface SplashScreenProps {
  storeConfig: StoreConfig;
  onEnterCatalog: (categoryId?: CategoryId) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  storeConfig,
  onEnterCatalog,
  darkMode,
  onToggleTheme,
}) => {
  const visualHighlights = [
    {
      id: 'potes' as CategoryId,
      title: 'Pote 1 Litro',
      subtitle: '2 Sabores + 6 Conos',
      price: 'S/ 43.00',
      image: imgGelato1L,
      tag: 'Familiar',
    },
    {
      id: 'waffles' as CategoryId,
      title: 'Bubble Waffle',
      subtitle: 'Gelato + Fruta fresca',
      price: 'S/ 15.90',
      tag: 'Favorito',
      image: imgBubbleWaffle,
    },
    {
      id: 'potes' as CategoryId,
      title: 'Medio Litro',
      subtitle: '2 Sabores + 4 Conos',
      price: 'S/ 24.00',
      tag: '500ml',
      image: imgGelato500ml,
    },
    {
      id: 'bebidas' as CategoryId,
      title: 'Milkshake 12oz',
      subtitle: 'Gelato + Chantilly',
      price: 'S/ 12.90',
      tag: 'Cremoso',
      image: imgMilkshake,
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-100/60 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white select-none transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[440px] h-[340px] bg-gradient-to-b from-amber-300/35 via-yellow-200/25 to-transparent dark:from-amber-500/20 dark:via-amber-600/10 dark:to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-16 w-64 h-64 bg-amber-400/20 dark:bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-4 pt-6 pb-2 flex items-center justify-between max-w-md mx-auto">
        {/* Open badge */}
        <div className="flex items-center gap-1.5 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-200/80 dark:border-neutral-800 text-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">Abierto</span>
          <span className="text-neutral-400">·</span>
          <span className="text-neutral-600 dark:text-neutral-300 text-[11px] font-mono">10am - 10pm</span>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2">
          <div className="text-[11px] text-amber-900 dark:text-amber-300 font-bold flex items-center gap-1 bg-amber-100/90 dark:bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-300/80 dark:border-amber-800/40 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Huancayo</span>
          </div>

          <button
            onClick={onToggleTheme}
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            aria-label="Alternar tema claro y oscuro"
            className="w-8 h-8 rounded-full bg-white/95 dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 shadow-xs hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-95 transition-all cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>
        </div>
      </header>

      {/* Main Visual Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2 text-center max-w-md mx-auto w-full">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-2">
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-400/40 to-yellow-500/40 rounded-full blur-lg opacity-80 animate-pulse" />
            <div className="animate-float-gentle relative">
              <Logo size="lg" showText={false} className="justify-center" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Polares Gelato Italiano
          </h1>
          <p className="text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            100% Artesanal · Huancayo
          </p>
        </div>

        {/* Visually Rich Gelato Photo Grid Showcase */}
        <div className="w-full mb-4">
          <div className="grid grid-cols-2 gap-2.5">
            {visualHighlights.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onEnterCatalog(item.id)}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-800 shadow-md border border-amber-200/80 dark:border-neutral-700 cursor-pointer active:scale-[0.97] transition-all hover:shadow-lg"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-100 dark:bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Floating category tag */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[9px] uppercase tracking-wider shadow-xs">
                    {item.tag}
                  </span>

                  {/* Price on image */}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-neutral-950/80 backdrop-blur-xs text-amber-400 font-mono font-extrabold text-[11px] shadow-xs">
                    {item.price}
                  </span>
                </div>

                {/* Micro caption */}
                <div className="p-2 text-left bg-white dark:bg-neutral-850">
                  <h3 className="font-display font-bold text-xs text-neutral-900 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Pulsing Glow CTA Button */}
        <div className="w-full bg-white/95 dark:bg-neutral-900/95 border border-amber-300/90 dark:border-amber-500/30 rounded-2xl p-3 sm:p-3.5 shadow-xl animate-pulse-glow backdrop-blur-md">
          <button
            onClick={() => onEnterCatalog()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer font-display"
          >
            <span>Ingresar al Catálogo Completo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.8]" />
          </button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full px-4 py-3 text-center border-t border-amber-200/70 dark:border-neutral-900 text-neutral-600 dark:text-neutral-400 text-[11px] pb-safe max-w-md mx-auto">
        <span>Delivery WhatsApp: </span>
        <span className="text-amber-700 dark:text-amber-400 font-extrabold font-mono">{storeConfig.whatsappFormatted}</span>
      </footer>
    </div>
  );
};
