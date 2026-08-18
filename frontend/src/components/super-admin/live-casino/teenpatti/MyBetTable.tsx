import React from 'react';
import type { MyBet } from '../../../../services/live-casino/teenpatti20x20Service';
import { formatFinancial } from '../../../../utils/formatters';

interface MyBetTableProps {
  bets: MyBet[];
}

export const MyBetTable: React.FC<MyBetTableProps> = ({ bets }) => {
  return (
    <div className="w-full bg-[#0E1524] border border-[#1E293B] rounded-[8px] relative overflow-hidden select-none">
      {/* Scrollable table container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[180px] w-full scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#090E17] border-b border-[#1E293B] text-slate-400 uppercase text-[9px] font-semibold tracking-wider font-mono">
              <th className="py-2.5 px-3 text-center w-12">No</th>
              <th className="py-2.5 px-3">Username</th>
              <th className="py-2.5 px-3">Nation</th>
              <th className="py-2.5 px-3 text-right w-24">Amount</th>
              <th className="py-2.5 px-3 text-right w-20">Rate</th>
              <th className="py-2.5 px-3">Place Date</th>
              <th className="py-2.5 px-3">Match Date</th>
              <th className="py-2.5 px-3 w-32">IP</th>
            </tr>
          </thead>

          <tbody>
            {bets.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 px-4 text-center text-xs text-slate-400 font-normal"
                >
                  No bets available.
                </td>
              </tr>
            ) : (
              bets.map((bet, idx) => (
                <tr key={bet.id} className="border-b border-[#1E293B] hover:bg-[#18233C]/60 text-[11px]">
                  <td className="py-2 px-3 text-center tabular-nums text-slate-400">{idx + 1}</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">{bet.username}</td>
                  <td className="py-2 px-3 text-slate-300 font-medium">{bet.nation}</td>
                  <td className="py-2 px-3 text-right tabular-nums font-semibold text-slate-100 font-mono">
                    {formatFinancial(bet.amount)}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums font-semibold text-amber-400 font-mono">
                    {bet.rate.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-slate-400 font-mono">{bet.placeDate}</td>
                  <td className="py-2 px-3 text-slate-400 font-mono">{bet.matchDate}</td>
                  <td className="py-2 px-3 text-slate-400 font-mono">{bet.ip}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
