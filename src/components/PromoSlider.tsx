import React, { useState, useEffect, useRef } from 'react';
import { PromotionSlide } from '../types';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface PromoSliderProps {
  promotions: PromotionSlide[];
  onSelectPromo: (promo: PromotionSlide) => void;
}

export const PromoSlider: React.FC<PromoSliderProps> = ({
  promotions,
  onSelectPromo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<number | null>(null);

  const minSwipeDistance = 45;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = window.setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isPaused, promotions.length]);

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const activePromo = promotions[currentIndex];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-lg select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStartHandler}
      onTouchMove={onTouchMoveHandler}
      onTouchEnd={onTouchEndHandler}
    >
      {/* Slide Container */}
      <div
        className="relative h-44 sm:h-52 w-full cursor-pointer overflow-hidden"
        onClick={() => onSelectPromo(activePromo)}
      >
        {/* Background photo with gradient scrim */}
        <img
          src={activePromo.image}
          alt={activePromo.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
        />

        {/* Dark contrast scrim gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent" />

        {/* Content Overlays */}
        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10">
          {/* Top Tag */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] tracking-wider uppercase shadow-md">
              <Sparkles className="w-2.5 h-2.5" />
              {activePromo.tag}
            </span>
          </div>

          {/* Bottom Title, Subtitle and Action */}
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-tight drop-shadow-sm mb-1">
              {activePromo.title}
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm line-clamp-1 mb-3">
              {activePromo.subtitle}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 transition-all">
              <span>{activePromo.buttonText}</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 active:scale-90"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 active:scale-90"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-2.5 right-4 z-20 flex items-center gap-1.5">
        {promotions.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? 'w-5 bg-amber-400'
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Ir a promoción ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
