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
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-3xs" />

      {/* Drawer */}
      <div className="relative w-[380px] max-w-full h-full bg-[#111F30] text-white shadow-2xl flex flex-col z-50 text-left animate-slideLeft">
        {/* Header */}
        <div className="bg-[#0D1B2A] h-14 border-b border-zinc-800/80 px-5 flex items-center justify-between shrink-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
            Alert ID: #{message.id}
          </span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors outline-none cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-thin">
          <div className="flex flex-col gap-2">
            <span className="px-2 py-0.5 border border-zinc-850 rounded bg-zinc-950/20 text-[9px] font-bold text-[#0EA5E9] uppercase tracking-wider self-start">
              {message.type}
            </span>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-white mt-1 leading-snug">
              {message.title}
            </h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              Received: {message.date} at {message.time}
            </span>
          </div>

          <div className="p-4 bg-zinc-950/15 border border-zinc-900 rounded-[12px] text-xs font-semibold leading-relaxed text-zinc-300">
            {message.body}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-[#0D1B2A] border-t border-zinc-850 flex gap-3 shrink-0">
          {message.status === 'UNREAD' && (
            <button
              onClick={() => {
                onMarkRead(message.id);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer"
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
              flex items-center justify-center gap-1.5 h-10 rounded-[8px] bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-500 text-xs font-bold uppercase tracking-wider transition-all outline-none cursor-pointer
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
