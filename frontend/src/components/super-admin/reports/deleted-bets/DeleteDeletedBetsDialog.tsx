import React, { useRef, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface DeleteDeletedBetsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export const DeleteDeletedBetsDialog: React.FC<DeleteDeletedBetsDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
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
        ref={dialogRef}
        className="w-full max-w-sm bg-white border border-zinc-200 rounded-[8px] shadow-lg p-6 text-left animate-fadeIn"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-650 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <span>Action Unconfirmed</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-6">
          Action is not confirmed for Deleted Bets. This is a placeholder confirmation dialog for the
          selected <strong className="text-zinc-900">{selectedCount}</strong> bet(s).
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-[38px] rounded-[6px] border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors focus:outline-none cursor-pointer"
          >
            Close
          </button>
          <div className="w-[100px]">
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="bg-zinc-900 hover:bg-zinc-800 focus:ring-zinc-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
