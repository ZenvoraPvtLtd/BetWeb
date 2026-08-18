import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Users, BarChart3, ReceiptText, Dices, Settings2 } from 'lucide-react';

export const SuperAdminNavigation: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<'reports' | 'casino' | 'settings' | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name: 'reports' | 'casino' | 'settings') => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAll = () => {
    setActiveDropdown(null);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold select-none cursor-pointer transition-all duration-150 ${
      isActive
        ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
        : 'text-slate-400 hover:text-white hover:bg-[#131B2E] border border-transparent'
    }`;

  const dropdownTriggerClass = (name: 'reports' | 'casino' | 'settings') =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold select-none cursor-pointer transition-all duration-150 ${
      activeDropdown === name
        ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
        : 'text-slate-400 hover:text-white hover:bg-[#131B2E] border border-transparent'
    }`;

  return (
    <nav ref={navRef} className="flex flex-col md:flex-row items-stretch md:items-center gap-1">
      {/* List Of Clients Link */}
      <NavLink to="/admin/clients" onClick={closeAll} className={linkClass}>
        <Users className="w-3.5 h-3.5" />
        <span>List Of Clients</span>
      </NavLink>

      {/* Market Analysis Link */}
      <NavLink to="/admin/market-analysis" onClick={closeAll} className={linkClass}>
        <BarChart3 className="w-3.5 h-3.5" />
        <span>Market Analysis</span>
      </NavLink>

      {/* Reports Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('reports')}
          className={dropdownTriggerClass('reports')}
          aria-haspopup="true"
          aria-expanded={activeDropdown === 'reports'}
        >
          <ReceiptText className="w-3.5 h-3.5" />
          <span>Reports</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'reports' ? 'rotate-180 text-orange-400' : ''}`} />
        </button>
        {activeDropdown === 'reports' && (
          <ul className="absolute left-0 mt-2 w-48 bg-[#131B2E] border border-[#233252] rounded-[10px] shadow-xl py-1 z-50 text-xs text-slate-300 focus:outline-none backdrop-blur-md">
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Client Report</Link>
            </li>
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Market Report</Link>
            </li>
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Settlement Report</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Live Casino Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('casino')}
          className={dropdownTriggerClass('casino')}
          aria-haspopup="true"
          aria-expanded={activeDropdown === 'casino'}
        >
          <Dices className="w-3.5 h-3.5" />
          <span>Live Casino</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'casino' ? 'rotate-180 text-orange-400' : ''}`} />
        </button>
        {activeDropdown === 'casino' && (
          <ul className="absolute left-0 mt-2 w-48 bg-[#131B2E] border border-[#233252] rounded-[10px] shadow-xl py-1 z-50 text-xs text-slate-300 focus:outline-none backdrop-blur-md">
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Provider List</Link>
            </li>
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Active Sessions</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Settings Dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('settings')}
          className={dropdownTriggerClass('settings')}
          aria-haspopup="true"
          aria-expanded={activeDropdown === 'settings'}
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Settings</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'settings' ? 'rotate-180 text-orange-400' : ''}`} />
        </button>
        {activeDropdown === 'settings' && (
          <ul className="absolute left-0 mt-2 w-48 bg-[#131B2E] border border-[#233252] rounded-[10px] shadow-xl py-1 z-50 text-xs text-slate-300 focus:outline-none backdrop-blur-md">
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Global Limits</Link>
            </li>
            <li>
              <Link to="/admin/pending" onClick={closeAll} className="block px-3.5 py-2 hover:bg-[#18233C] hover:text-white transition-colors">Security Settings</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
