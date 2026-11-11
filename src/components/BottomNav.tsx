import React from 'react';
import { Store, Compass, Heart } from 'lucide-react';

export type NavTab = 'inicio' | 'explorar' | 'favoritos';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
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
      label: 'Catálogo',
      icon: Compass,
      badge: 0,
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
      <div className="max-w-md mx-auto grid grid-cols-3 h-16 items-center px-2">
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
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-500' : ''}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scale-up">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 ${isActive ? 'font-bold text-amber-600 dark:text-amber-400' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
