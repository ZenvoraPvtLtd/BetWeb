import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { mockClients, type ClientOption } from '../../mock/super-admin/clients';

export const ClientSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientOption>(mockClients[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-[36px] px-3 bg-[#131B2E] border border-[#233252] hover:border-orange-500/50 hover:bg-[#18233C] text-slate-200 hover:text-white rounded-[8px] text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-orange-500/50 select-none cursor-pointer shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-orange-400 shrink-0" />
        <span>{selectedClient.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-52 bg-[#131B2E] border border-[#233252] rounded-[10px] shadow-xl py-1 z-50 text-xs text-slate-200 divide-y divide-[#1E293B] focus:outline-none backdrop-blur-md animate-fadeIn"
          role="listbox"
        >
          {mockClients.map((client) => (
            <li key={client.id}>
              <button
                role="option"
                aria-selected={selectedClient.id === client.id}
                onClick={() => {
                  setSelectedClient(client);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 hover:bg-[#1C2844] hover:text-white transition-colors flex items-center justify-between cursor-pointer ${
                  selectedClient.id === client.id ? 'bg-orange-500/10 text-orange-400 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>{client.name}</span>
                {selectedClient.id === client.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
