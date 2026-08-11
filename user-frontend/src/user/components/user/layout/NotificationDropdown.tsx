import React, { useEffect, useRef } from 'react';
import { Mail, MailOpen, Bell, ArrowRight } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { messages, markMessageRead } = useSettings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recentMessages = messages.slice(0, 3);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2.5 w-80 bg-[#111F30] border border-slate-700/15 rounded-[12px] shadow-2xl z-50 text-left overflow-hidden animate-slideDown select-none"
    >
      {/* Header */}
      <div className="bg-[#0D1B2A] px-4 py-3 border-b border-zinc-900/60 flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8] flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-[#0EA5E9]" />
          <span>Notifications</span>
        </span>
      </div>

      {/* Body List */}
      <div className="flex flex-col max-h-64 overflow-y-auto scrollbar-thin">
        {recentMessages.length > 0 ? (
          recentMessages.map((msg) => {
            const isUnread = msg.status === 'UNREAD';
            return (
              <div
                key={msg.id}
                onClick={() => {
                  if (isUnread) markMessageRead(msg.id);
                }}
                className={`
                  p-3.5 border-b border-zinc-900/30 flex gap-3 cursor-pointer hover:bg-zinc-900/10 transition-colors last:border-0
                  ${isUnread ? 'bg-[#0ea5e9]/5' : ''}
                `}
              >
                <div className={`mt-0.5 ${isUnread ? 'text-[#0EA5E9]' : 'text-zinc-550'}`}>
                  {isUnread ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                </div>

                <div className="flex flex-col text-left flex-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wide leading-tight ${isUnread ? 'text-white' : 'text-zinc-400'}`}>
                    {msg.title}
                  </span>
                  <p className="text-[10px] text-zinc-500 font-semibold mt-1 line-clamp-2 leading-relaxed">
                    {msg.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-[10px] uppercase font-bold text-zinc-550 tracking-wider">
            No notification alerts
          </div>
        )}
      </div>

      {/* Footer */}
      <a
        href="/settings/messages"
        onClick={onClose}
        className="block text-center py-2.5 bg-[#0D1B2A] border-t border-zinc-900/60 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-[#16283D] transition-colors"
      >
        <span className="flex items-center justify-center gap-1">
          <span>View All Messages</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </a>
    </div>
  );
};
export default NotificationDropdown;
