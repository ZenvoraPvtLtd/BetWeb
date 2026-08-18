import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { Rule } from '../../../data/rules';

interface RulesPanelProps {
  rules: Rule[];
}

export const RulesPanel: React.FC<RulesPanelProps> = ({ rules }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden select-none text-left shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 px-4 bg-[#0E1524] flex items-center justify-between font-bold text-xs uppercase tracking-wider text-white outline-none cursor-pointer border-b border-[#1E293B] font-mono"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-orange-400" />
          <span>Game Rules & Multipliers</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 flex flex-col gap-3 max-h-[350px] overflow-y-auto scrollbar-thin bg-[#090E17]/40">
          {rules.length > 0 ? (
            rules.map((rule, idx) => (
              <div key={idx} className="flex flex-col gap-1 border-b border-[#1E293B] pb-2.5 last:border-0 last:pb-0">
                <h5 className="text-[11px] font-extrabold text-orange-400 uppercase tracking-wide font-mono">
                  {rule.name}
                </h5>
                <p className="text-[10px] font-medium text-slate-400 leading-relaxed mb-1">
                  {rule.description}
                </p>
                {rule.multiplier && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded self-start font-mono">
                    Payout: {rule.multiplier}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-[10px] text-slate-500 font-semibold italic">Standard house rules apply.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default RulesPanel;
