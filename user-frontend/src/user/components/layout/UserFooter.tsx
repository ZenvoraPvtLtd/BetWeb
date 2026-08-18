import React from 'react';
import { Link } from 'react-router-dom';

export const UserFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#0E1524] border-t border-[#1E293B] text-slate-400 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:h-[70px] shrink-0 gap-3 md:gap-0 select-none">
      {/* Left side Links */}
      <div className="flex flex-row items-center gap-6 text-[12px] font-medium tracking-wide">
        <Link to="/terms" className="hover:text-orange-400 transition-colors">
          Terms and Conditions
        </Link>
        <Link to="/responsible-gaming" className="hover:text-orange-400 transition-colors">
          Responsible Gaming
        </Link>
        <Link to="/privacy" className="hover:text-orange-400 transition-colors">
          Privacy Policy
        </Link>
      </div>

      {/* Support Badge */}
      <div className="text-[11px] font-bold tracking-wider uppercase bg-orange-500/15 text-orange-400 px-3.5 py-1.5 rounded-full border border-orange-500/30 font-mono">
        24X7 Support
      </div>
    </footer>
  );
};
