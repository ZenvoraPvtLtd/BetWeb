import React, { useState } from 'react';
import { UserLayout } from '../components/user/layout/UserLayout';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { HelpCircle, Mail, MessageSquare, ChevronDown } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is my exposure calculated?',
      a: 'Your exposure is the maximum possible amount you could lose based on all currently matched active wagers.'
    },
    {
      q: 'How do I add matches to my viewport?',
      a: 'Navigate to Settings → Add Match List and click "Add Match". The match will instantly appear in your Home exchange feed.'
    },
    {
      q: 'What is the minimum password requirement?',
      a: 'Your password must be at least 6 characters long and we recommend incorporating letters, numbers, and symbols.'
    }
  ];

  const breadcrumbs = [
    { label: 'Home', to: '/home' },
    { label: 'Support Center' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left max-w-4xl">
        <SettingsHeader
          title="Support Center"
          description="Find quick answers to common questions or contact our mock help desk team."
          breadcrumbs={breadcrumbs}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <HelpCircle className="w-4 h-4 text-[#0EA5E9]" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="flex flex-col gap-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-zinc-900/10 cursor-pointer outline-none transition-all"
                    >
                      <span className="text-xs font-extrabold text-white">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-550 transition-transform ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-zinc-900/30 text-xs font-semibold text-zinc-400 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <MessageSquare className="w-4 h-4 text-[#0EA5E9]" />
              <span>Contact Options</span>
            </h3>

            <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0EA5E9] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Email Help Desk</span>
                  <span className="text-xs font-semibold text-zinc-400 mt-1 select-all">support@xplay5.demo</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#0EA5E9] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Telegram Channel</span>
                  <span className="text-xs font-semibold text-zinc-400 mt-1 select-all">@XPLAY5_Exchange_Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default SupportPage;
