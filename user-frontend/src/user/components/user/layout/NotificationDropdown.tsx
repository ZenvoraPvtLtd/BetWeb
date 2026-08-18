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
      className="absolute right-0 mt-2.5 w-80 bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl z-50 text-left overflow-hidden animate-slideDown select-none"
    >
      {/* Header */}
      <div className="bg-[#0E1524] px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 flex items-center gap-1.5 font-mono">
          <Bell className="w-3.5 h-3.5 text-orange-400" />
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
                  p-3.5 border-b border-[#1E293B] flex gap-3 cursor-pointer hover:bg-[#18233C]/60 transition-colors last:border-0
                  ${isUnread ? 'bg-orange-500/5' : ''}
                `}
              >
                <div className={`mt-0.5 ${isUnread ? 'text-orange-400' : 'text-slate-500'}`}>
                  {isUnread ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                </div>

                <div className="flex flex-col text-left flex-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wide leading-tight ${isUnread ? 'text-slate-100' : 'text-slate-400'}`}>
                    {msg.title}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {msg.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            No notification alerts
          </div>
        )}
      </div>

      {/* Footer */}
      <a
        href="/settings/messages"
        onClick={onClose}
        className="block text-center py-2.5 bg-[#0E1524] border-t border-[#1E293B] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-orange-400 hover:bg-[#18233C] transition-colors"
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
