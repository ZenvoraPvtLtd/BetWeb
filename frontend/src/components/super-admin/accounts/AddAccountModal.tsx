import React, { useRef, useEffect } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Button } from '../../ui/Button';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white border border-zinc-200 rounded-[8px] shadow-lg p-6 text-left animate-fadeIn"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-zinc-900 font-bold text-base">
            <UserPlus className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>Add Account</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-600 focus:outline-none cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 border-t border-b border-zinc-100 text-xs md:text-sm text-zinc-500 leading-relaxed mb-6">
          Account creation form will be implemented here. Wait for additional design specifications to populate inputs.
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-[38px] rounded-[6px] border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors focus:outline-none cursor-pointer"
          >
            Cancel
          </button>
          <div className="w-[100px]">
            <Button onClick={onClose}>
              Okay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
