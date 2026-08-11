import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { AccountStatementFilters as Filters } from '../../../../services/super-admin/accountStatementService';

interface AccountStatementFiltersProps {
  onApplyFilters: (filters: Filters) => void;
  onClear: () => void;
}

export const AccountStatementFilters: React.FC<AccountStatementFiltersProps> = ({
  onApplyFilters,
  onClear,
}) => {
  const [draftFilters, setDraftFilters] = useState<Required<Filters>>({
    user: '',
    startDate: '',
    endDate: '',
    type: 'All',
  });

  const [dateError, setDateError] = useState<string | null>(null);

  const handleInputChange = (field: keyof Filters, val: string) => {
    const updated = { ...draftFilters, [field]: val };
    setDraftFilters(updated);

    // Dynamic date bounds verification
    if (field === 'startDate' || field === 'endDate') {
      const start = updated.startDate ? new Date(updated.startDate) : null;
      const end = updated.endDate ? new Date(updated.endDate) : null;

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

  const handleClear = () => {
    const resetValues = {
      user: '',
      startDate: '',
      endDate: '',
      type: 'All',
    };
    setDraftFilters(resetValues);
    setDateError(null);
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-zinc-200 rounded-[8px] p-5 shadow-sm mb-6 select-none"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
        {/* User filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="user-filter"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            User
          </label>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-455 pointer-events-none" />
            <input
              id="user-filter"
              type="text"
              placeholder="Search User"
              value={draftFilters.user}
              onChange={(e) => handleInputChange('user', e.target.value)}
              className="w-full h-[38px] pl-9 pr-8 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 placeholder-zinc-400 transition-all"
            />
            {draftFilters.user && (
              <button
                type="button"
                onClick={() => handleInputChange('user', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
                aria-label="Clear user search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Start Date filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="start-date"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            Start Date
          </label>
          <div className="relative w-full">
            <input
              id="start-date"
              type="date"
              value={draftFilters.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 placeholder-zinc-400 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* End Date filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="end-date"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            End Date
          </label>
          <div className="relative w-full">
            <input
              id="end-date"
              type="date"
              value={draftFilters.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 placeholder-zinc-400 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Type select filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="type-filter"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            Type
          </label>
          <select
            id="type-filter"
            value={draftFilters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 cursor-pointer select-none outline-none"
          >
            <option value="All">All</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!!dateError}
            className={`
              flex-1 h-[38px] rounded-[6px] text-xs font-semibold select-none transition-all focus:outline-none focus:ring-1 focus:ring-zinc-700
              ${
                dateError
                  ? 'bg-zinc-150 border border-zinc-200 text-zinc-400 cursor-not-allowed'
                  : 'bg-zinc-900 border border-zinc-900 text-white hover:bg-zinc-800 cursor-pointer active:brightness-95'
              }
            `}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="h-[38px] px-3.5 text-xs font-semibold text-zinc-500 hover:text-zinc-850 hover:bg-zinc-50 border border-zinc-200 rounded-[6px] transition-colors focus:outline-none cursor-pointer"
            aria-label="Clear filters"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Date error inline message */}
      {dateError && (
        <p className="text-[10.5px] text-red-650 font-semibold mt-3.5 text-left font-mono">
          {dateError}
        </p>
      )}
    </form>
  );
};
