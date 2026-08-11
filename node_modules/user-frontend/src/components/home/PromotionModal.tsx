import React, { useEffect, useState } from 'react';
import { X, TriangleAlert, Shield, Trophy, Ticket, Award } from 'lucide-react';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState('opacity-0 -translate-y-2');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Trigger entrance animation next tick
      const timer = setTimeout(() => {
        setAnimationClass('opacity-100 translate-y-0');
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setAnimationClass('opacity-0 -translate-y-2');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200); // match transition duration
      document.body.style.overflow = '';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Handle escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-center items-start overflow-y-auto px-4 py-4 md:py-8 select-none">
      {/* Semi-darkened full screen overlay (prevents interactions) */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-3xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Main Promotional Popup Window */}
      <div
        className={`
          relative w-[940px] max-w-full bg-[#181A20] rounded-[10px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] z-[1001]
          transition-all duration-200 ease-out
          ${animationClass}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Section */}
        <div className="bg-[#078FCB] h-[60px] flex items-center justify-between px-5 shrink-0">
          <h3 id="modal-title" className="text-base md:text-lg font-semibold tracking-wide text-white">
            Welcome to our exchange
          </h3>

          {/* Close Circular Button */}
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-[#078FCB]/40 cursor-pointer"
            aria-label="Close promotion modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Beware Of Phishing Black Alert Warning strip */}
        <div className="bg-zinc-950 h-[38px] flex items-center justify-center px-4 gap-2 text-center text-white shrink-0 border-b border-zinc-900/50">
          <TriangleAlert className="w-[14px] h-[14px] text-amber-400 shrink-0 stroke-[2.2]" />
          <span className="text-[10px] md:text-xs font-semibold tracking-wide truncate">
            Beware Of Phishing Websites. Before Login Enable Security Auth To Secure Your ID.
          </span>
        </div>

        {/* 2x2 Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-zinc-900/60 p-0.5">
          {/* Banner 1: Live Casino */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-indigo-900 via-indigo-950 to-[#120e24] flex flex-col justify-between p-6 border border-zinc-800/40 group overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-[180px] h-[180px] bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-300" />
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full w-fit">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-300">Live Casino</span>
            </div>
            <div className="z-10 mt-auto">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">Welcome Bonus up to 150%</h4>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">Claim virtual chips and access live tables instantly.</p>
            </div>
          </div>

          {/* Banner 2: Sports Exchange */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-sky-900 via-sky-950 to-[#0e1d24] flex flex-col justify-between p-6 border border-zinc-800/40 group overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-[180px] h-[180px] bg-sky-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-sky-500/20 transition-all duration-300" />
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full w-fit">
              <Trophy className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300">Sports Exchange</span>
            </div>
            <div className="z-10 mt-auto">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">100% Sports Rebate Daily</h4>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">Bet on major events with premium play-money odds.</p>
            </div>
          </div>

          {/* Banner 3: Weekly Lottery */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-rose-900 via-rose-950 to-[#240e13] flex flex-col justify-between p-6 border border-zinc-800/40 group overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-[180px] h-[180px] bg-rose-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-rose-500/20 transition-all duration-300" />
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full w-fit">
              <Ticket className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300">Jackpot Draws</span>
            </div>
            <div className="z-10 mt-auto">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">Weekly Lottery Jackpot</h4>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">Get a lucky ticket today and stand a chance to hit the jackpot.</p>
            </div>
          </div>

          {/* Banner 4: VIP Special */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-amber-900 via-amber-950 to-[#241a0e] flex flex-col justify-between p-6 border border-zinc-800/40 group overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-[180px] h-[180px] bg-amber-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-500/20 transition-all duration-300" />
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full w-fit">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">VIP Special</span>
            </div>
            <div className="z-10 mt-auto">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">VIP Loyalty Club Rewards</h4>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium">Accumulate virtual points to trigger special VIP multipliers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
