import React, { useRef, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface DeleteBetsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export const DeleteBetsDialog: React.FC<DeleteBetsDialogProps> = ({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div
        ref={dialogRef}
        className="w-full max-w-sm bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl p-6 text-left animate-fadeIn"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <span>Confirm Bet Deletion</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#18233C] rounded-lg text-slate-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
          Are you sure you want to delete the{' '}
          <strong className="text-orange-400">{selectedCount}</strong> selected unsettled bet(s)? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-[38px] rounded-[8px] border border-[#233252] text-xs font-semibold text-slate-300 hover:bg-[#18233C] hover:text-white transition-colors focus:outline-none cursor-pointer"
          >
            Cancel
          </button>
          <div className="w-[100px]">
            <Button
              variant="danger"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
