import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { Rule } from '../../../data/rules';

interface RulesPanelProps {
  rules: Rule[];
}

export const RulesPanel: React.FC<RulesPanelProps> = ({ rules }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden select-none text-left shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 px-4 bg-[#0D1B2A] flex items-center justify-between font-bold text-xs uppercase tracking-wider text-white outline-none cursor-pointer border-b border-zinc-805"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#0EA5E9]" />
          <span>Game Rules & Multipliers</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 flex flex-col gap-3 max-h-[350px] overflow-y-auto scrollbar-thin bg-zinc-900/10">
          {rules.length > 0 ? (
            rules.map((rule, idx) => (
              <div key={idx} className="flex flex-col gap-1 border-b border-zinc-900/30 pb-2.5 last:border-0 last:pb-0">
                <h5 className="text-[11px] font-extrabold text-[#0EA5E9] uppercase tracking-wide">
                  {rule.name}
                </h5>
                <p className="text-[10px] font-semibold text-zinc-400 leading-relaxed mb-1">
                  {rule.description}
                </p>
                {rule.multiplier && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded self-start">
                    Payout: {rule.multiplier}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-[10px] text-zinc-500 font-semibold italic">Standard house rules apply.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default RulesPanel;
