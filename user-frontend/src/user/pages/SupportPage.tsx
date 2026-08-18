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
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left max-w-4xl font-sans">
        <SettingsHeader
          title="Support Center"
          description="Find quick answers to common questions or contact our mock help desk team."
          breadcrumbs={breadcrumbs}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="flex flex-col gap-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#18233C] cursor-pointer outline-none transition-all"
                    >
                      <span className="text-xs font-extrabold text-slate-100">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180 text-orange-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-2 border-t border-[#1E293B] text-xs font-medium text-slate-300 leading-relaxed bg-[#0E1524]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Contact Options</span>
            </h3>

            <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-100">Email Help Desk</span>
                  <span className="text-xs font-semibold text-slate-400 mt-1 select-all">support@xplay5.demo</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-100">Telegram Channel</span>
                  <span className="text-xs font-semibold text-slate-400 mt-1 select-all">@XPLAY5_Exchange_Demo</span>
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
