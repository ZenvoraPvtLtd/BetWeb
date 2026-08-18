import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { GameReportFilters as Filters } from '../../../../services/super-admin/gameReportsService';

interface GameReportFiltersProps {
  onApplyFilters: (filters: Filters) => void;
  onReset: () => void;
}

export const GameReportFilters: React.FC<GameReportFiltersProps> = ({
  onApplyFilters,
  onReset,
}) => {
  const [draftFilters, setDraftFilters] = useState<Required<Filters>>({
    user: '',
    startDate: '',
    endDate: '',
  });

  const [dateError, setDateError] = useState<string | null>(null);

  const handleInputChange = (field: keyof Filters, val: string) => {
    const updated = { ...draftFilters, [field]: val };
    setDraftFilters(updated);

    if (field === 'startDate' || field === 'endDate') {
      const start = updated.startDate ? new Date(updated.startDate).getTime() : null;
      const end = updated.endDate ? new Date(updated.endDate).getTime() : null;

      if (start && end && end < start) {
        setDateError('End Date cannot be earlier than Start Date.');
      } else {
        setDateError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) return;
    onApplyFilters(draftFilters);
  };

  const handleReset = () => {
    const resetValues = {
      user: '',
      startDate: '',
      endDate: '',
    };
    setDraftFilters(resetValues);
    setDateError(null);
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-5 shadow-xl mb-6 select-none"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        {/* User Filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="user-filter"
            className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono"
          >
            User
          </label>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              id="user-filter"
              type="text"
              placeholder="Search User"
              value={draftFilters.user}
              onChange={(e) => handleInputChange('user', e.target.value)}
              className="w-full h-[38px] pl-9 pr-8 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs focus:outline-none focus:border-orange-500 text-slate-100 placeholder-slate-500 transition-all"
            />
            {draftFilters.user && (
              <button
                type="button"
                onClick={() => handleInputChange('user', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
                aria-label="Clear user search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Start Date picker */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="start-date"
            className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono"
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={draftFilters.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full h-[38px] px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs focus:outline-none focus:border-orange-500 text-slate-100 cursor-pointer"
          />
        </div>

        {/* End Date picker */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="end-date"
            className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono"
          >
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={draftFilters.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full h-[38px] px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs focus:outline-none focus:border-orange-500 text-slate-100 cursor-pointer"
          />
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!!dateError}
            className={`
              flex-1 h-[38px] rounded-[8px] text-xs font-semibold select-none transition-all focus:outline-none shadow-md
              ${
                dateError
                  ? 'bg-slate-800 border border-[#233252] text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white cursor-pointer active:scale-95 shadow-orange-950/40'
              }
            `}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="h-[38px] px-3 text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#18233C] border border-[#233252] rounded-[8px] transition-colors focus:outline-none cursor-pointer"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>

      {dateError && (
        <p className="text-[10.5px] text-red-400 font-semibold mt-3.5 text-left font-mono">
          {dateError}
        </p>
      )}
    </form>
  );
};
