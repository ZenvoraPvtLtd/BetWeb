import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';
import { mockMarketEvents, type MarketEvent } from '../../mock/super-admin/marketAnalysis';

export const MarketAnalysis: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (eventId: string) => {
    navigate(`/admin/market-analysis/${eventId}`);
  };

  const getStatusBadge = (status: MarketEvent['status']) => {
    switch (status) {
      case 'Live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Upcoming
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            Suspended
          </span>
        );
    }
  };

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Page Header info */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-orange-400 shrink-0" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-none">
                Market Analysis
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-normal">
              You can view your cricket card books from sports menu.
            </p>
          </div>
        </div>

        {/* Events Table Container */}
        <div className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] shadow-xl overflow-hidden select-none">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0E1524] border-b border-[#1E293B] text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3.5 px-6">Event Name</th>
                  <th className="py-3.5 px-6">Team</th>
                  <th className="py-3.5 px-6 hidden sm:table-cell">Sport</th>
                  <th className="py-3.5 px-6 hidden sm:table-cell">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {mockMarketEvents.map((event) => (
                  <tr
                    key={event.id}
                    onClick={() => handleRowClick(event.id)}
                    className="hover:bg-[#18233C]/60 transition-colors cursor-pointer group"
                  >
                    {/* Event Name column */}
                    <td className="py-4 px-6 font-semibold text-slate-100 text-[13px] md:text-sm truncate max-w-[220px] sm:max-w-none group-hover:text-orange-400 transition-colors">
                      {event.eventName}
                    </td>

                    {/* Team column */}
                    <td className="py-4 px-6 text-slate-300 text-xs md:text-sm">
                      {event.team}
                    </td>

                    {/* Sport column */}
                    <td className="py-4 px-6 text-slate-400 text-xs md:text-sm hidden sm:table-cell">
                      {event.sport}
                    </td>

                    {/* Status badge column */}
                    <td className="py-4 px-6 hidden sm:table-cell">
                      {getStatusBadge(event.status)}
                    </td>

                    {/* Actions link column */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(event.id);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 group-hover:text-orange-300 transition-colors focus:outline-none cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
