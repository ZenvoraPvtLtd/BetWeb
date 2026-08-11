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
      className="absolute left-[70px] top-0 w-52 bg-zinc-950 border border-zinc-800 rounded-[6px] shadow-lg py-1.5 z-50 text-xs text-zinc-400 select-none max-h-[calc(100vh-120px)] overflow-y-auto"
    >
      <div className="px-3.5 py-1.5 border-b border-zinc-900 text-white font-semibold text-[11px] uppercase tracking-wider mb-1">
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
                  w-full px-3.5 py-2 hover:bg-zinc-900/60 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer
                  ${isActive ? 'bg-zinc-900/40 text-indigo-400 font-semibold' : ''}
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <span>{sport.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
