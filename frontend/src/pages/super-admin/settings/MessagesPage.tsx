import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { MessagesForm } from '../../../components/super-admin/settings/messages/MessagesForm';
import { messagesService } from '../../../services/settings/messagesService';
import type { MessagesFormData } from '../../../config/superAdmin/messages';

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<MessagesFormData | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await messagesService.getMessages();
        setMessages(data);
      } catch (err) {
        console.error('Failed to load system messages settings', err);
      }
    };
    loadMessages();
  }, []);

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-955 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-400">Settings</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-955">Messages</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            Messages
          </h1>
          <p className="text-xs text-zinc-555 mt-1.5 leading-relaxed">
            Update application notification banners, welcome headers, and scheduled maintenance notices.
          </p>
        </div>

        {/* Form Workspace Card */}
        {messages && <MessagesForm initialData={messages} />}
      </div>
    </SuperAdminLayout>
  );
};
