import React from 'react';
import { Calendar } from 'lucide-react';

export type DateOption = 'today' | 'yesterday' | '7days' | '30days' | 'custom';

interface DateRangeFilterProps {
  selectedOption: DateOption;
  onChangeOption: (opt: DateOption) => void;
  fromDate: string;
  toDate: string;
  onChangeFromDate: (date: string) => void;
  onChangeToDate: (date: string) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  selectedOption,
  onChangeOption,
  fromDate,
  toDate,
  onChangeFromDate,
  onChangeToDate,
}) => {
  const options: { value: DateOption; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 select-none text-left w-full sm:w-auto">
      {/* Quick filters selection */}
      <div className="flex bg-[#111F30] border border-slate-700/10 rounded-[8px] p-1 self-start">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChangeOption(opt.value)}
            className={`
              px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer transition-all
              ${
                selectedOption === opt.value
                  ? 'bg-[#0EA5E9] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Custom Inputs */}
      {selectedOption === 'custom' && (
        <div className="flex items-center gap-2 animate-fadeIn">
          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => onChangeFromDate(e.target.value)}
              className="h-8 pl-8 pr-2.5 bg-[#111F30] border border-zinc-850 rounded-[8px] text-[10px] font-bold text-white outline-none focus:border-[#0EA5E9] cursor-pointer"
            />
            <Calendar className="w-3.5 h-3.5 text-zinc-505 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <span className="text-[10px] font-bold uppercase text-zinc-500">to</span>
          <div className="relative">
            <input
              type="date"
              value={toDate}
              onChange={(e) => onChangeToDate(e.target.value)}
              className="h-8 pl-8 pr-2.5 bg-[#111F30] border border-zinc-850 rounded-[8px] text-[10px] font-bold text-white outline-none focus:border-[#0EA5E9] cursor-pointer"
            />
            <Calendar className="w-3.5 h-3.5 text-zinc-505 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
};
export default DateRangeFilter;
