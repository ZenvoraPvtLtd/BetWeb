import React from 'react';
import type { TeenpattiRule } from '../../../../config/liveCasino/teenpatti20x20';

interface TeenpattiRulesPanelProps {
  rules: TeenpattiRule[];
}

export const TeenpattiRulesPanel: React.FC<TeenpattiRulesPanelProps> = ({ rules }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-[8px] p-4 shadow-sm select-none text-left flex flex-col gap-3">
      {/* Panel Header */}
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">Rules</h3>

      {/* Rules table */}
      <div className="border border-zinc-200 rounded-[6px] overflow-hidden">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            {/* Pair Plus Category label */}
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th colSpan={2} className="py-2.5 px-3.5 text-zinc-700 font-bold font-mono">
                Pair Plus
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id} className="border-b border-zinc-100 hover:bg-zinc-50/50">
                <td className="py-2.5 px-3.5 text-zinc-600 font-medium">{rule.name}</td>
                <td className="py-2.5 px-3.5 text-right font-semibold text-zinc-800 font-mono">
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
