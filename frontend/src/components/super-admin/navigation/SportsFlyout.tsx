import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sportsConfig } from '../../../config/sports';

interface SportsFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick?: () => void;
}

export const SportsFlyout: React.FC<SportsFlyoutProps> = ({ isOpen, onClose, onItemClick }) => {
  const flyoutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={flyoutRef}
      className="absolute left-[70px] top-0 w-52 bg-[#131B2E] border border-[#233252] rounded-[10px] shadow-2xl py-1.5 z-50 text-xs text-slate-300 select-none max-h-[calc(100vh-120px)] overflow-y-auto backdrop-blur-md"
    >
      <div className="px-3.5 py-2 border-b border-[#1E293B] text-white font-semibold text-[11px] uppercase tracking-wider mb-1">
        Sports Exchange
      </div>
      <ul className="flex flex-col gap-0.5">
        {sportsConfig.map((sport) => {
          const isActive = location.pathname === `/sports/${sport.slug}`;
          const Icon = sport.icon;
          return (
            <li key={sport.id}>
              <Link
                to={`/sports/${sport.slug}`}
                onClick={() => {
                  onClose();
                  if (onItemClick) onItemClick();
                }}
                className={`
                  w-full px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer
                  ${isActive ? 'bg-orange-500/15 text-orange-400 font-semibold' : 'text-slate-300'}
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                <span>{sport.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
