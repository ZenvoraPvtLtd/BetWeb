import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Landmark } from 'lucide-react';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';
import { Button } from '../../components/ui/Button';
import { mockMarketEvents } from '../../mock/super-admin/marketAnalysis';

export const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  // Find the event in mock data
  const event = mockMarketEvents.find((e) => e.id === eventId);

  return (
    <SuperAdminLayout>
      <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl select-none animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center border border-orange-500/30">
            <Landmark className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 leading-tight">
              {event ? event.eventName : 'Event Detail'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Market ID: <span className="text-orange-400 font-mono">{eventId}</span> • Sport: {event ? event.sport : 'N/A'}
            </p>
          </div>
        </div>

        <div className="border-t border-[#1E293B] pt-6 mb-8 text-left">
          <div className="bg-[#0E1524] p-5 rounded-[8px] border border-[#233252]">
            <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">Market Details Placeholder</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              This space will host the book details, spot menus, and detailed trading logs for <strong>{event ? event.eventName : 'the selected event'}</strong>. Full implementation is pending layout specifications.
            </p>
          </div>
        </div>

        <div className="w-[140px]">
          <Button
            onClick={() => navigate('/admin/market-analysis')}
            icon={<ArrowLeft className="w-4 h-4 shrink-0" />}
          >
            Back to List
          </Button>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
