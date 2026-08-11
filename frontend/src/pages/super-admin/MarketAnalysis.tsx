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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/60">
            Upcoming
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-100/60">
            Suspended
          </span>
        );
    }
  };

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left">
        {/* Page Header info */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <BarChart2 className="w-5 h-5 text-zinc-950 shrink-0" />
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 leading-none">
                Market Analysis
              </h1>
            </div>
            <p className="text-xs md:text-sm text-zinc-500 font-normal">
              You can view your cricket card books from spot menu.
            </p>
          </div>
        </div>

        {/* Redesigned Events Table */}
        <div className="bg-white border border-zinc-200 rounded-[8px] shadow-sm overflow-hidden select-none">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] font-semibold tracking-wider">
                  <th className="py-3.5 px-6">Event Name</th>
                  <th className="py-3.5 px-6">Team</th>
                  <th className="py-3.5 px-6 hidden sm:table-cell">Sport</th>
                  <th className="py-3.5 px-6 hidden sm:table-cell">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70">
                {mockMarketEvents.map((event) => (
                  <tr
                    key={event.id}
                    onClick={() => handleRowClick(event.id)}
                    className="hover:bg-zinc-50/40 transition-colors cursor-pointer group"
                  >
                    {/* Event Name column */}
                    <td className="py-4 px-6 font-semibold text-zinc-900 text-[13px] md:text-sm truncate max-w-[220px] sm:max-w-none">
                      {event.eventName}
                    </td>

                    {/* Team column */}
                    <td className="py-4 px-6 text-zinc-600 text-xs md:text-sm">
                      {event.team}
                    </td>

                    {/* Sport column */}
                    <td className="py-4 px-6 text-zinc-500 text-xs md:text-sm hidden sm:table-cell">
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
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors focus:outline-none cursor-pointer"
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
