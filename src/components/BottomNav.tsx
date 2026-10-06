import React from 'react';
import { Store, Compass, ReceiptText, Heart } from 'lucide-react';

export type NavTab = 'inicio' | 'explorar' | 'pedidos' | 'favoritos';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  favoritesCount: number;
  ordersCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  ordersCount,
}) => {
  const tabs = [
    {
      id: 'inicio' as NavTab,
      label: 'Inicio',
      icon: Store,
      badge: 0,
    },
    {
      id: 'explorar' as NavTab,
      label: 'Explorar',
      icon: Compass,
      badge: 0,
    },
    {
      id: 'pedidos' as NavTab,
      label: 'Pedidos',
      icon: ReceiptText,
      badge: ordersCount,
    },
    {
      id: 'favoritos' as NavTab,
      label: 'Favoritos',
      icon: Heart,
      badge: favoritesCount,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 transition-colors pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full w-full py-1 transition-all active:scale-95 cursor-pointer select-none ${
                isActive
                  ? 'text-amber-500 font-bold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {/* Icon Container with Badge */}
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-extrabold flex items-center justify-center leading-none shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 font-medium'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Dot Indicator */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
