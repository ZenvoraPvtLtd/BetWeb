import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { MessageDetailDrawer } from '../../components/settings/MessageDetailDrawer';
import { useSettings } from '../../context/SettingsContext';
import { Search, Mail, MailOpen, Trash2 } from 'lucide-react';
import { EmptyReportState } from '../../components/reports/EmptyReportState';
import type { Message } from '../../types/settings';

export const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { messages, markMessageRead, deleteMessage } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterOption('ALL');
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterOption === 'ALL' || msg.status === filterOption;

    return matchesSearch && matchesFilter;
  });

  const breadcrumbs = [
    { label: 'Settings', to: '/settings' },
    { label: 'Messages' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Inbox Messages"
          description="Access exchange notifications, promo announcements, and important updates."
          breadcrumbs={breadcrumbs}
        />

        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-[#131B2E] border border-[#1E293B] p-4 rounded-[12px] justify-between shadow-sm font-mono">
          <div className="flex bg-[#090E17] border border-[#233252] rounded-[8px] p-1 self-start">
            {(['ALL', 'UNREAD', 'READ'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterOption(opt)}
                className={`
                  px-3.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer transition-all
                  ${
                    filterOption === opt
                      ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Messages List view */}
        {isLoading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-[#131B2E] rounded-[12px] border border-[#1E293B]" />
            ))}
          </div>
        ) : filteredMessages.length > 0 ? (
          <div className="flex flex-col gap-3 font-mono">
            {filteredMessages.map((msg) => {
              const isUnread = msg.status === 'UNREAD';
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`
                    p-4 rounded-[12px] border flex items-center justify-between transition-all hover:scale-[1.002] cursor-pointer shadow-md
                    ${
                      isUnread
                        ? 'bg-[#131B2E] border-orange-500/40 ring-1 ring-orange-500/10'
                        : 'bg-[#131B2E]/60 border-[#1E293B] hover:border-[#233252]'
                    }
                  `}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`mt-1 p-2 rounded-[8px] bg-[#090E17] border border-[#233252] ${isUnread ? 'text-orange-400' : 'text-slate-500'}`}>
                      {isUnread ? <Mail className="w-4.5 h-4.5" /> : <MailOpen className="w-4.5 h-4.5" />}
                    </div>

                    <div className="flex flex-col text-left flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-extrabold uppercase tracking-wide ${isUnread ? 'text-slate-100' : 'text-slate-400'}`}>
                          {msg.title}
                        </h4>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed line-clamp-1 font-sans">
                        {msg.description}
                      </p>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 font-mono">
                        {msg.date} • {msg.time}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(msg.id);
                    }}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-[8px] transition-colors outline-none cursor-pointer"
                    aria-label="Delete Notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyReportState
            title="Inbox Empty"
            message="No alerts found in your notifications list."
            onResetFilters={handleResetFilters}
          />
        )}

        <MessageDetailDrawer
          isOpen={selectedMessage !== null}
          onClose={() => setSelectedMessage(null)}
          message={selectedMessage}
          onMarkRead={markMessageRead}
          onDelete={deleteMessage}
        />
      </div>
    </UserLayout>
  );
};
export default MessagesPage;
