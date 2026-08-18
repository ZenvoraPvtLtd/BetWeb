import React, { useEffect } from 'react';
import { X, MailOpen, Trash2 } from 'lucide-react';
import type { Message } from '../../types/settings';

interface MessageDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MessageDetailDrawer: React.FC<MessageDetailDrawerProps> = ({
  isOpen,
  onClose,
  message,
  onMarkRead,
  onDelete,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      {/* Drawer */}
      <div className="relative w-[380px] max-w-full h-full bg-[#131B2E] text-white shadow-2xl flex flex-col z-50 text-left animate-slideLeft font-sans">
        {/* Header */}
        <div className="bg-[#0E1524] h-14 border-b border-[#1E293B] px-5 flex items-center justify-between shrink-0 font-mono">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Alert ID: #{message.id}
          </span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#18233C] rounded text-slate-400 hover:text-white transition-colors outline-none cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-thin">
          <div className="flex flex-col gap-2">
            <span className="px-2 py-0.5 border border-orange-500/30 rounded bg-orange-500/15 text-[9px] font-bold text-orange-400 uppercase tracking-wider self-start font-mono">
              {message.type}
            </span>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-100 mt-1 leading-snug font-mono">
              {message.title}
            </h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Received: {message.date} at {message.time}
            </span>
          </div>

          <div className="p-4 bg-[#090E17] border border-[#1E293B] rounded-[12px] text-xs font-medium leading-relaxed text-slate-300">
            {message.body}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-[#0E1524] border-t border-[#1E293B] flex gap-3 shrink-0 font-mono">
          {message.status === 'UNREAD' && (
            <button
              onClick={() => {
                onMarkRead(message.id);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-[8px] bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-xs font-bold uppercase tracking-wider transition-all outline-none cursor-pointer shadow-md shadow-orange-950/40"
            >
              <MailOpen className="w-4 h-4" />
              <span>Mark Read</span>
            </button>
          )}
          <button
            onClick={() => {
              onDelete(message.id);
              onClose();
            }}
            className={`
              flex items-center justify-center gap-1.5 h-10 rounded-[8px] bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-bold uppercase tracking-wider transition-all outline-none cursor-pointer
              ${message.status === 'UNREAD' ? 'px-4' : 'flex-1'}
            `}
            aria-label="Delete Notification"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessageDetailDrawer;
