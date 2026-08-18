import React, { useState } from 'react';
import { DateRangeFilter } from './DateRangeFilter';
import type { DateOption } from './DateRangeFilter';
import { Search, Filter, RefreshCw, X } from 'lucide-react';

interface ReportFiltersProps {
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  selectedStatus?: string;
  onChangeStatus?: (status: string) => void;
  statusOptions?: string[];
  selectedType?: string;
  onChangeType?: (type: string) => void;
  typeOptions?: string[];
  // Date params
  selectedDateOption: DateOption;
  onChangeDateOption: (opt: DateOption) => void;
  fromDate: string;
  toDate: string;
  onChangeFromDate: (date: string) => void;
  onChangeToDate: (date: string) => void;
  // Actions
  onReset: () => void;
  onRefresh?: () => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchQuery,
  onChangeSearchQuery,
  selectedStatus,
  onChangeStatus,
  statusOptions,
  selectedType,
  onChangeType,
  typeOptions,
  selectedDateOption,
  onChangeDateOption,
  fromDate,
  toDate,
  onChangeFromDate,
  onChangeToDate,
  onReset,
  onRefresh,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtersBody = (
    <div className="flex flex-col md:flex-row gap-4 md:items-center w-full justify-between font-sans">
      {/* Date Range selectors */}
      <DateRangeFilter
        selectedOption={selectedDateOption}
        onChangeOption={onChangeDateOption}
        fromDate={fromDate}
        toDate={toDate}
        onChangeFromDate={onChangeFromDate}
        onChangeToDate={onChangeToDate}
      />

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search bar */}
        <div className="relative">
          <input
            placeholder="Search details..."
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            className="w-full sm:w-44 h-8 pl-8 pr-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-[10px] font-bold text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500 font-mono transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Select */}
        {statusOptions && onChangeStatus && (
          <select
            value={selectedStatus}
            onChange={(e) => onChangeStatus(e.target.value)}
            className="h-8 px-2.5 bg-[#090E17] border border-[#233252] rounded-[8px] text-[10px] font-bold text-slate-100 outline-none cursor-pointer focus:border-orange-500 font-mono transition-colors"
          >
            <option value="ALL">All Status</option>
            {statusOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#131B2E]">
                {opt}
              </option>
            ))}
          </select>
        )}

        {/* Type Select */}
        {typeOptions && onChangeType && (
          <select
            value={selectedType}
            onChange={(e) => onChangeType(e.target.value)}
            className="h-8 px-2.5 bg-[#090E17] border border-[#233252] rounded-[8px] text-[10px] font-bold text-slate-100 outline-none cursor-pointer focus:border-orange-500 font-mono transition-colors"
          >
            <option value="ALL">All Types</option>
            {typeOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#131B2E]">
                {opt}
              </option>
            ))}
          </select>
        )}

        {/* Action Triggers */}
        <div className="flex gap-2 shrink-0 font-mono">
          <button
            onClick={onReset}
            className="flex-1 sm:flex-none h-8 px-3 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer outline-none"
          >
            Reset
          </button>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="w-8 h-8 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer outline-none"
              aria-label="Refresh Data Table"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full select-none">
      {/* Desktop view filters (shows inline) */}
      <div className="hidden lg:block bg-[#131B2E] border border-[#1E293B] p-4 rounded-[12px] shadow-sm">
        {filtersBody}
      </div>

      {/* Mobile view Filters trigger bar */}
      <div className="lg:hidden flex items-center justify-between gap-3 bg-[#131B2E] border border-[#1E293B] px-4 py-3 rounded-[12px]">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#18233C] border border-[#2B3C60] text-[10px] font-bold uppercase text-slate-300 outline-none cursor-pointer font-mono"
        >
          <Filter className="w-3.5 h-3.5 text-orange-400" />
          <span>Filters</span>
        </button>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="w-8 h-8 rounded-[8px] bg-[#18233C] border border-[#2B3C60] text-slate-400 hover:text-white flex items-center justify-center outline-none cursor-pointer"
            aria-label="Refresh Data Table Mobile"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Mobile filter bottom sheet overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setShowMobileFilters(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fadeIn"
          />
          <div className="relative mt-auto w-full max-h-[85vh] bg-[#131B2E] border-t border-[#1E293B] rounded-t-[16px] p-6 shadow-2xl overflow-y-auto animate-slideUp text-left flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">Filter Ledger</h4>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-[#18233C] rounded text-slate-400 hover:text-white cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {filtersBody}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full h-10 rounded-[8px] bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white font-bold text-xs uppercase tracking-wider outline-none mt-2 font-mono"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReportFilters;
