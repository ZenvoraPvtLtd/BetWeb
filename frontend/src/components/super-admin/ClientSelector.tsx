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
        className="flex items-center gap-2 h-[34px] px-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 hover:text-white rounded-[6px] text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-700 select-none cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span>{selectedClient.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-1.5 w-48 bg-zinc-950 border border-zinc-800 rounded-[6px] shadow-md py-1 z-50 text-xs text-zinc-300 divide-y divide-zinc-900/60 focus:outline-none"
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
                className={`w-full text-left px-3.5 py-2 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-between cursor-pointer ${
                  selectedClient.id === client.id ? 'bg-zinc-900/40 text-indigo-400 font-semibold' : ''
                }`}
              >
                <span>{client.name}</span>
                {selectedClient.id === client.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
