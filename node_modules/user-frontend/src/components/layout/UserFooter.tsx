import React from 'react';

export const UserFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#078FCB] text-white flex flex-col md:flex-row items-center justify-between px-6 py-4 md:h-[78px] shrink-0 gap-3 md:gap-0 select-none">
      {/* Left side Links */}
      <div className="flex flex-row items-center gap-6 text-[13px] font-medium tracking-wide">
        <a href="#terms" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
          Terms and Conditions
        </a>
        <a href="#gaming" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
          Responsible Gaming
        </a>
      </div>

      {/* Center / Support */}
      <div className="text-[13px] font-bold tracking-wider uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
        24X7 Support
      </div>
    </footer>
  );
};
