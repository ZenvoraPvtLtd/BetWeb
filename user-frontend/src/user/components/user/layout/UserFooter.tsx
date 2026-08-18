import React from 'react';

export const UserFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Responsible Gaming', to: '/responsible-gaming' },
    { label: 'Betting Rules', to: '/rules' },
    { label: 'Support Center', to: '/support' }
  ];

  return (
    <footer className="w-full bg-[#0E1524] border-t border-[#1E293B] py-6 px-6 mt-auto text-left select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest font-mono">
            XPLAY5 Exchange
          </span>
          <span className="text-[9px] font-semibold text-slate-500">
            © {currentYear} XPLAY5. All rights reserved. Demo mock interface.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-orange-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default UserFooter;
