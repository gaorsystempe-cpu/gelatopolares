import React from 'react';
import { Logo } from './Logo';
import { ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';
import { StoreConfig, CategoryId } from '../types';

// Mouthwatering real artisanal Lúcuma ice cream photo
import imgLucumaHero from '../assets/images/gelato_cup_personal_1791312466672.jpg';

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
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-100/60 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white select-none transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[440px] h-[340px] bg-gradient-to-b from-amber-300/35 via-yellow-200/25 to-transparent dark:from-amber-500/20 dark:via-orange-600/10 dark:to-transparent blur-3xl pointer-events-none" />
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
            <span>Delivery Express</span>
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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-2 pb-safe pb-6 text-center max-w-md mx-auto w-full">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center mb-3">
          <div className="relative mb-2">
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-400/45 via-orange-400/45 to-yellow-500/45 rounded-full blur-lg opacity-85 animate-pulse" />
            <div className="animate-float-gentle relative">
              <Logo size="lg" showText={false} className="justify-center" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Lúcuma
          </h1>
          <p className="text-amber-700 dark:text-amber-400 font-extrabold text-xs tracking-widest uppercase mt-0.5">
            Postres · Helados · Jugos
          </p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            El Auténtico Sabor del Oro de los Incas
          </span>
        </div>

        {/* 
          HERO PHOTO SPOTLIGHT: 
          Solo una foto muy profesional de helado de lúcuma
        */}
        <div
          onClick={() => onEnterCatalog('helados')}
          className="group relative w-full rounded-3xl overflow-hidden bg-white dark:bg-neutral-800 shadow-xl border-2 border-amber-300/90 dark:border-amber-500/40 cursor-pointer active:scale-[0.98] transition-all hover:shadow-2xl mb-4"
        >
          {/* Main Photo Container */}
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-amber-100 dark:bg-neutral-900">
            <img
              src={imgLucumaHero}
              alt="Helado Artesanal de Lúcuma"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                ⭐ Especialidad de la Casa
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-amber-300 font-bold text-[10px] tracking-wide border border-amber-400/40">
                100% Lúcuma Natural
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-3 left-3 right-3 text-left flex items-end justify-between">
              <div>
                <h2 className="font-display font-extrabold text-lg text-white drop-shadow-sm leading-tight">
                  Helado Artesanal de Lúcuma
                </h2>
                <p className="text-xs text-amber-200/90 drop-shadow-xs font-medium">
                  Mantecado fresco con pulpa pura & chocolate
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-300 block">Desde</span>
                <span className="text-amber-400 font-mono font-extrabold text-base drop-shadow-sm">
                  S/ 13.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Pulsing Glow CTA Button */}
        <div className="w-full bg-white/95 dark:bg-neutral-900/95 border border-amber-300/90 dark:border-amber-500/30 rounded-2xl p-3 sm:p-3.5 shadow-xl animate-pulse-glow backdrop-blur-md">
          <button
            onClick={() => onEnterCatalog()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500 text-neutral-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer font-display"
          >
            <span>Ingresar al Catálogo Completo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.8]" />
          </button>
        </div>
      </main>
    </div>
  );
};
