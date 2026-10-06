import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = false, className = '' }) => {
  const sizeMap = {
    sm: { circle: 'w-8 h-8', text: 'text-sm' },
    md: { circle: 'w-11 h-11', text: 'text-base' },
    lg: { circle: 'w-20 h-20', text: 'text-xl' },
    xl: { circle: 'w-28 h-28', text: 'text-2xl' },
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Artisanal Polares Golden Emblem with Dripping P */}
      <div
        className={`${sizeMap[size].circle} relative rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0 border border-amber-300/40 select-none overflow-hidden`}
      >
        {/* Subtle creamy waffle/cone texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/35 via-transparent to-black/20 pointer-events-none" />

        {/* Polares Stylized Melting P Vector */}
        <svg
          viewBox="0 0 100 100"
          className="w-[72%] h-[72%] drop-shadow-md text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Organic Melting Gelato Letter P */}
          <path
            d="M 28 18 
               C 28 14, 32 10, 48 10 
               C 66 10, 78 18, 78 35 
               C 78 50, 66 57, 49 57 
               L 41 57 
               L 41 72 
               C 41 76, 43 78, 44 82
               C 44.5 84, 43 88, 39 88
               C 35 88, 34 83, 34 78
               C 33 70, 31 66, 29 60
               C 28 55, 28 22, 28 18 Z
               M 42 22 
               L 42 45 
               L 49 45 
               C 59 45, 64 41, 64 33.5 
               C 64 26, 58 22, 49 22 Z"
            fill="#FFFFFF"
          />
          {/* Organic dripping droplets */}
          <path
            d="M 68 46 C 68 49, 70 52, 70 54 C 70 56, 68 58, 66 58 C 64 58, 62 56, 62 54 C 62 52, 64 49, 68 46 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M 52 64 C 52 66.5, 54 69, 54 71 C 54 73, 52.5 74.5, 51 74.5 C 49.5 74.5, 48 73, 48 71 C 48 69, 50 66.5, 52 64 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-display font-bold tracking-tight text-neutral-900 dark:text-white ${sizeMap[size].text}`}>
            polares
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
            Auténtico Gelato
          </span>
        </div>
      )}
    </div>
  );
};
