import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { circle: 'w-8 h-8', text: 'text-sm' },
    md: { circle: 'w-11 h-11', text: 'text-base' },
    lg: { circle: 'w-20 h-20', text: 'text-xl' },
    xl: { circle: 'w-28 h-28', text: 'text-2xl' },
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Luxury Porcelain Medallion with Dual Gold Ring */}
      <div
        className={`${sizeMap[size].circle} relative rounded-full bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FEF3C7] dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center shadow-xl shadow-amber-900/15 shrink-0 border-2 border-amber-400 select-none overflow-hidden`}
      >
        {/* Soft radial aura */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-amber-200/20 to-amber-500/10 dark:from-white/10 dark:to-transparent pointer-events-none" />

        {/* 
          Masterpiece Emblem of Lúcuma:
          Harmony of the 3 Authentic Colors:
          1. Verde Esmeralda/Oliva (Corteza y hoja)
          2. Naranja Dorado Azafrán (Pulpa aterciopelada y helado mantecado)
          3. Marrón Caoba Brillante (Pepa pulida y chocolate)
        */}
        <svg
          viewBox="0 0 120 120"
          className="w-[86%] h-[86%] drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 1. COLOR VERDE LÚCUMA (Corteza & Hoja) */}
            <linearGradient id="lucumaGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="40%" stopColor="#16A34A" />
              <stop offset="80%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#14532D" />
            </linearGradient>

            {/* 2. COLOR NARANJA DORADO (Pulpa de Lúcuma & Helado Artesanal) */}
            <radialGradient id="lucumaPulp" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="25%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* 3. COLOR MARRÓN CAOBA (Pepa Brillante de Lúcuma) */}
            <radialGradient id="lucumaSeed" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="45%" stopColor="#5A2209" />
              <stop offset="85%" stopColor="#2E0E04" />
              <stop offset="100%" stopColor="#1A0601" />
            </radialGradient>

            {/* Gold Frame Gradient */}
            <linearGradient id="goldFrame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Cream Swirl Gradient */}
            <linearGradient id="creamHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>

          {/* Outer Gold Decorative Ring */}
          <circle cx="60" cy="60" r="54" stroke="url(#goldFrame)" strokeWidth="1.2" opacity="0.6" />
          <circle cx="60" cy="60" r="51" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />

          {/* TOP STEM & LEAVES (Color 1: Verde Lúcuma) */}
          <g transform="translate(60, 18)">
            {/* Left curved leaf */}
            <path
              d="M 0 0 C -12 -16, -26 -6, -20 8 C -16 12, -6 8, 0 0 Z"
              fill="url(#lucumaGreen)"
              stroke="#14532D"
              strokeWidth="0.8"
            />
            {/* Right smaller leaf */}
            <path
              d="M 0 0 C 10 -14, 22 -4, 18 8 C 14 10, 6 6, 0 0 Z"
              fill="url(#lucumaGreen)"
              stroke="#14532D"
              strokeWidth="0.8"
            />
            {/* Small stem */}
            <path
              d="M 0 0 Q 2 -5 5 -7"
              stroke="#78350F"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* MAIN SILHOUETTE: LÚCUMA CUT FRUIT & GELATO SWIRL */}
          
          {/* Outer Rind (Color 1: Verde Corteza de Lúcuma) */}
          <path
            d="M 60 22
               C 86 22, 104 42, 104 68
               C 104 92, 84 106, 60 106
               C 36 106, 16 92, 16 68
               C 16 42, 34 22, 60 22 Z"
            fill="url(#lucumaGreen)"
            stroke="#14532D"
            strokeWidth="1.2"
            filter="drop-shadow(0px 2px 4px rgba(20,83,45,0.25))"
          />

          {/* Thin inner chartreuse skin transition */}
          <path
            d="M 60 25
               C 83 25, 100 44, 100 68
               C 100 89, 81 102, 60 102
               C 39 102, 20 89, 20 68
               C 20 44, 37 25, 60 25 Z"
            fill="#4D7C0F"
          />

          {/* Luscious Golden-Orange Pulp (Color 2: Naranja Dorado Lúcuma) */}
          <path
            d="M 60 27
               C 80 27, 96 45, 96 68
               C 96 87, 78 99, 60 99
               C 42 99, 24 87, 24 68
               C 24 45, 40 27, 60 27 Z"
            fill="url(#lucumaPulp)"
          />

          {/* Gelato Mantecado Waves on the Golden Pulp */}
          <path
            d="M 32 60
               C 36 46, 50 34, 66 32
               C 78 30, 88 38, 90 48
               C 84 42, 74 38, 64 40
               C 50 42, 40 50, 32 60 Z"
            fill="#FEF08A"
            opacity="0.8"
          />

          {/* Artisanal Gelato Swirl Crest (Floating Soft Cream Peak) */}
          <path
            d="M 44 48
               C 48 36, 64 30, 72 38
               C 78 44, 74 52, 64 48
               C 54 44, 50 52, 58 56
               C 66 60, 60 68, 52 64
               C 44 60, 40 54, 44 48 Z"
            fill="url(#creamHighlight)"
            opacity="0.9"
            filter="drop-shadow(0px 1px 2px rgba(217,119,6,0.2))"
          />

          {/* Pure White Fresh Shine Ribbon */}
          <path
            d="M 52 38
               C 58 32, 68 34, 72 40
               C 68 42, 60 38, 52 38 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* ELEGANT DROP SEED (Color 3: Marrón Caoba Brillante) */}
          {/* Smooth, tilted drop-shaped seed resting organically */}
          <g transform="translate(62, 70) rotate(-12)">
            {/* Seed Body */}
            <path
              d="M 0 -18
                 C 14 -18, 20 4, 16 16
                 C 12 24, -2 26, -12 18
                 C -20 8, -14 -18, 0 -18 Z"
              fill="url(#lucumaSeed)"
              stroke="#2E0E04"
              strokeWidth="0.8"
              filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.3))"
            />

            {/* Glossy Seed Curved Highlight */}
            <path
              d="M -4 -12
                 C 6 -12, 10 0, 7 8"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M -4 -12
                 C 6 -12, 10 0, 7 8"
              stroke="#FEF3C7"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Tiny accent dot */}
            <circle cx="8" cy="12" r="1.2" fill="#FFFFFF" opacity="0.6" />
          </g>

          {/* Sparkles of Sweetness */}
          <path d="M 88 28 Q 90 24 90 20 Q 90 24 92 28 Q 90 32 90 28 Z" fill="#F59E0B" />
          <path d="M 28 38 Q 29.5 35 29.5 32 Q 29.5 35 31 38 Q 29.5 41 29.5 38 Z" fill="#F59E0B" opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-display font-extrabold tracking-tight text-neutral-900 dark:text-white ${sizeMap[size].text}`}>
            Lúcuma
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
            Postres · Helados · Jugos
          </span>
        </div>
      )}
    </div>
  );
};
