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
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setAnimationClass('opacity-100 translate-y-0');
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setAnimationClass('opacity-0 -translate-y-2');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      document.body.style.overflow = '';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

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
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex justify-center items-start overflow-y-auto px-4 py-4 md:py-8 select-none cursor-pointer font-sans"
    >
      {/* Semi-darkened full screen overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Main Promotional Popup Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-[940px] max-w-full bg-[#131B2E] border border-[#233252] rounded-[12px] overflow-hidden shadow-2xl z-[1001] cursor-default
          transition-all duration-200 ease-out
          ${animationClass}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#FF5722] to-[#F97316] h-[60px] flex items-center justify-between px-5 shrink-0">
          <h3 id="modal-title" className="text-base md:text-lg font-bold tracking-wide text-white font-mono uppercase">
            Welcome to XPLAY5 Exchange
          </h3>

          {/* Close Circular Button */}
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-full bg-[#0E1524] text-slate-200 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
            aria-label="Close promotion modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Beware Of Phishing Black Alert Warning strip */}
        <div className="bg-[#090D16] h-[38px] flex items-center justify-center px-4 gap-2 text-center text-white shrink-0 border-b border-[#1E293B] font-mono">
          <TriangleAlert className="w-[14px] h-[14px] text-amber-400 shrink-0 stroke-[2.2]" />
          <span className="text-[10px] md:text-xs font-semibold tracking-wide text-amber-300 truncate">
            Beware Of Phishing Websites. Before Login Enable Security Auth To Secure Your ID.
          </span>
        </div>

        {/* 2x2 Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[#0B0F19] p-0.5">
          {/* Banner 1: Live Casino */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-[#18233C] via-[#131B2E] to-[#0E1524] flex flex-col justify-between p-6 border border-[#1E293B] group overflow-hidden">
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-orange-500/15 border border-orange-500/30 rounded-full w-fit">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-orange-300 font-mono">Live Casino</span>
            </div>
            <div className="z-10 mt-auto text-left">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">Welcome Bonus up to 150%</h4>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Claim virtual chips and access live tables instantly.</p>
            </div>
          </div>

          {/* Banner 2: Sports Exchange */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-[#18233C] via-[#131B2E] to-[#0E1524] flex flex-col justify-between p-6 border border-[#1E293B] group overflow-hidden">
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full w-fit">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 font-mono">Sports Exchange</span>
            </div>
            <div className="z-10 mt-auto text-left">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">100% Sports Rebate Daily</h4>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Bet on major events with premium play-money odds.</p>
            </div>
          </div>

          {/* Banner 3: Weekly Lottery */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-[#18233C] via-[#131B2E] to-[#0E1524] flex flex-col justify-between p-6 border border-[#1E293B] group overflow-hidden">
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-red-500/15 border border-red-500/30 rounded-full w-fit">
              <Ticket className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-red-300 font-mono">Jackpot Draws</span>
            </div>
            <div className="z-10 mt-auto text-left">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">Weekly Lottery Jackpot</h4>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Get a lucky ticket today and stand a chance to hit the jackpot.</p>
            </div>
          </div>

          {/* Banner 4: VIP Special */}
          <div className="relative aspect-[2/1] md:h-[235px] bg-gradient-to-br from-[#18233C] via-[#131B2E] to-[#0E1524] flex flex-col justify-between p-6 border border-[#1E293B] group overflow-hidden">
            <div className="z-10 flex items-center gap-2 px-3 py-1 bg-orange-500/15 border border-orange-500/30 rounded-full w-fit">
              <Award className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-orange-300 font-mono">VIP Special</span>
            </div>
            <div className="z-10 mt-auto text-left">
              <h4 className="text-base md:text-lg font-bold text-white leading-tight">VIP Loyalty Club Rewards</h4>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Accumulate virtual points to trigger special VIP multipliers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PromotionModal;
