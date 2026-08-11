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
      <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
            <Landmark className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 leading-tight">
              {event ? event.eventName : 'Event Detail'}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Market ID: {eventId} • Sport: {event ? event.sport : 'N/A'}
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6 mb-8 text-left">
          <div className="bg-zinc-50 p-4 rounded-[6px] border border-zinc-200/50">
            <h3 className="text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">Market Details Placeholder</h3>
            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
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
