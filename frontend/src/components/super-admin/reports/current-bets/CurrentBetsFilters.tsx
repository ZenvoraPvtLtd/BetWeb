import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { CurrentBetsFilters as Filters } from '../../../../services/super-admin/currentBetsService';
import { sportsConfig } from '../../../../config/sports';

interface CurrentBetsFiltersProps {
  onApplyFilters: (filters: Filters) => void;
  onReset: () => void;
}

export const CurrentBetsFilters: React.FC<CurrentBetsFiltersProps> = ({
  onApplyFilters,
  onReset,
}) => {
  const [draftFilters, setDraftFilters] = useState<Required<Filters>>({
    user: '',
    searchByName: '',
    sport: 'All',
    startDateTime: '',
    endDateTime: '',
  });

  const [dateError, setDateError] = useState<string | null>(null);

  const handleInputChange = (field: keyof Filters, val: string) => {
    const updated = { ...draftFilters, [field]: val };
    setDraftFilters(updated);

    // Validate datetime range constraints
    if (field === 'startDateTime' || field === 'endDateTime') {
      const start = updated.startDateTime ? new Date(updated.startDateTime).getTime() : null;
      const end = updated.endDateTime ? new Date(updated.endDateTime).getTime() : null;

      if (start && end && end < start) {
        setDateError('End Date/Time cannot be earlier than Start Date/Time.');
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
      searchByName: '',
      sport: 'All',
      startDateTime: '',
      endDateTime: '',
    };
    setDraftFilters(resetValues);
    setDateError(null);
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-zinc-200 rounded-[8px] p-5 shadow-sm mb-6 select-none"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
        {/* User filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="user-filter"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            User
          </label>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-450 pointer-events-none" />
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

        {/* Search By Name filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="name-filter"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            Search By Name
          </label>
          <div className="relative w-full">
            <input
              id="name-filter"
              type="text"
              placeholder="Search By Name"
              value={draftFilters.searchByName}
              onChange={(e) => handleInputChange('searchByName', e.target.value)}
              className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 placeholder-zinc-400 transition-all"
            />
            {draftFilters.searchByName && (
              <button
                type="button"
                onClick={() => handleInputChange('searchByName', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
                aria-label="Clear search by name"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sport filter */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="sport-filter"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            Sport
          </label>
          <select
            id="sport-filter"
            value={draftFilters.sport}
            onChange={(e) => handleInputChange('sport', e.target.value)}
            className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 cursor-pointer outline-none"
          >
            <option value="All">Select Sport</option>
            {sportsConfig.map((sport) => (
              <option key={sport.id} value={sport.slug}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date + Time */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="start-date-time"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            Start Date
          </label>
          <input
            id="start-date-time"
            type="datetime-local"
            value={draftFilters.startDateTime}
            onChange={(e) => handleInputChange('startDateTime', e.target.value)}
            className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 cursor-pointer"
          />
        </div>

        {/* End Date + Time */}
        <div className="flex flex-col text-left">
          <label
            htmlFor="end-date-time"
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2 font-mono"
          >
            End Date
          </label>
          <input
            id="end-date-time"
            type="datetime-local"
            value={draftFilters.endDateTime}
            onChange={(e) => handleInputChange('endDateTime', e.target.value)}
            className="w-full h-[38px] px-3 bg-white border border-zinc-200 rounded-[6px] text-xs focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-900 cursor-pointer"
          />
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
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
            onClick={handleReset}
            className="h-[38px] px-3 text-xs font-semibold text-zinc-500 hover:text-zinc-850 hover:bg-zinc-50 border border-zinc-200 rounded-[6px] transition-colors focus:outline-none cursor-pointer"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Date-Time validation warning banner */}
      {dateError && (
        <p className="text-[10.5px] text-red-650 font-semibold mt-3.5 text-left font-mono">
          {dateError}
        </p>
      )}
    </form>
  );
};
