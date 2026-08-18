import React from 'react';
import type { TeenpattiRule } from '../../../../config/liveCasino/teenpatti20x20';

interface TeenpattiRulesPanelProps {
  rules: TeenpattiRule[];
}

export const TeenpattiRulesPanel: React.FC<TeenpattiRulesPanelProps> = ({ rules }) => {
  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-4 shadow-xl select-none text-left flex flex-col gap-3">
      {/* Panel Header */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">Rules</h3>

      {/* Rules table */}
      <div className="border border-[#1E293B] rounded-[8px] overflow-hidden">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            {/* Pair Plus Category label */}
            <tr className="bg-[#0E1524] border-b border-[#1E293B]">
              <th colSpan={2} className="py-2.5 px-3.5 text-orange-400 font-bold font-mono">
                Pair Plus
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id} className="border-b border-[#1E293B] last:border-b-0 hover:bg-[#18233C]/60">
                <td className="py-2.5 px-3.5 text-slate-300 font-medium">{rule.name}</td>
                <td className="py-2.5 px-3.5 text-right font-semibold text-amber-400 font-mono">
                  {rule.payout}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
