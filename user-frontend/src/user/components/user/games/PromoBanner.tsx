import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { userPromotions } from '../../../data/promotions';

export const PromoBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % userPromotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? userPromotions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % userPromotions.length);
  };

  return (
    <div className="w-full aspect-[21/9] sm:aspect-[4/1] bg-[#131B2E] rounded-[16px] overflow-hidden border border-[#1E293B] relative group select-none shrink-0 shadow-lg">
      {/* Animated slides */}
      {userPromotions.map((promo, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={promo.id}
            style={{
              background: `linear-gradient(135deg, ${promo.gradientFrom || '#0E1524'} 0%, ${promo.gradientTo || '#18233C'} 100%)`
            }}
            className={`
              absolute inset-0 p-6 sm:p-8 flex items-center justify-between transition-all duration-500 ease-in-out
              ${isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'}
            `}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute -right-16 w-80 h-80 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-orange-500/15 transition-colors" />

            <div className="z-10 text-left max-w-md">
              {promo.badge && (
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full font-mono">
                  {promo.badge}
                </span>
              )}
              <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white mt-3 uppercase leading-tight">
                {promo.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                {promo.subtitle}
              </p>
              <button className="mt-4 px-4 py-1.5 bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-[11px] font-bold rounded-[6px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer outline-none shadow-md shadow-orange-950/40 font-mono">
                <Play className="w-3 h-3 fill-white" />
                <span>{promo.actionText}</span>
              </button>
            </div>
          </div>
        );
      })}

      {/* Navigation slide buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#090E17]/60 hover:bg-[#090E17]/90 border border-[#233252] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity outline-none cursor-pointer z-20"
        aria-label="Previous Promo Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#090E17]/60 hover:bg-[#090E17]/90 border border-[#233252] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity outline-none cursor-pointer z-20"
        aria-label="Next Promo Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default PromoBanner;
