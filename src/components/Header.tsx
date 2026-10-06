import React from 'react';
import { Logo } from './Logo';
import { Home, Moon, Sun, Shield, PhoneCall } from 'lucide-react';
import { StoreConfig } from '../types';

interface HeaderProps {
  storeConfig: StoreConfig;
  darkMode: boolean;
  onToggleTheme: () => void;
  onGoToSplash: () => void;
  onOpenAdmin: () => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeConfig,
  darkMode,
  onToggleTheme,
  onGoToSplash,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      {/* Gelato dripline motif thin accent top stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

      <div className="max-w-md mx-auto px-3.5 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Button to return to Portada */}
        <button
          onClick={onGoToSplash}
          title="Regresar a Portada"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold transition-all active:scale-95 cursor-pointer border border-neutral-200 dark:border-neutral-700"
        >
          <Home className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden xs:inline text-[11px]">Portada</span>
        </button>

        {/* Center: Brand identity */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onGoToSplash}>
          <Logo size="sm" showText={false} />
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-sm tracking-tight text-neutral-900 dark:text-white leading-tight">
              Polares Gelato
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-700 dark:text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Abierto</span>
              <span className="text-neutral-400 dark:text-neutral-500">·</span>
              <span className="font-mono text-neutral-600 dark:text-neutral-300">10am-10pm</span>
            </div>
          </div>
        </div>

        {/* Right: Quick actions (Theme toggle, Direct Call, Admin) */}
        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${storeConfig.phone}`}
            title="Llamar al local"
            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 transition-all active:scale-95 border border-neutral-200 dark:border-neutral-700"
          >
            <PhoneCall className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
          </a>

          <button
            onClick={onToggleTheme}
            title={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 transition-all active:scale-95 cursor-pointer border border-neutral-200 dark:border-neutral-700"
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-neutral-700" />
            )}
          </button>

          <button
            onClick={onOpenAdmin}
            title="Panel de Gestión de Negocio"
            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 transition-all active:scale-95 cursor-pointer border border-neutral-200 dark:border-neutral-700"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
