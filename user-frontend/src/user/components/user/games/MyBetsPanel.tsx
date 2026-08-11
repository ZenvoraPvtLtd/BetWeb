import React from 'react';
import { useBetSlip } from '../../../context/BetSlipContext';
import { BookOpen } from 'lucide-react';

export const MyBetsPanel: React.FC = () => {
  const { placedBets } = useBetSlip();

  return (
    <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden select-none text-left shadow-xs">
      <div className="h-11 px-4 bg-[#0D1B2A] flex items-center gap-2 border-b border-zinc-800/60 font-bold text-xs uppercase tracking-wider text-white">
        <BookOpen className="w-4 h-4 text-[#0EA5E9]" />
        <span>My Bets ({placedBets.length})</span>
      </div>

      <div className="p-4 bg-zinc-900/10">
        {placedBets.length > 0 ? (
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-zinc-900/50 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Market / Selection</th>
                  <th className="py-2.5 px-3">Odds</th>
                  <th className="py-2.5 px-3">Stake</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Placed Date</th>
                  <th className="py-2.5 px-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/30 text-[11px] font-semibold text-zinc-400">
                {placedBets.map((bet, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/20 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-zinc-500">{bet.no}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-white block font-bold">{bet.selectionName}</span>
                      <span className="text-[9px] text-zinc-550 block uppercase tracking-wider mt-0.5">{bet.marketName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-extrabold text-white">{bet.rate}</td>
                    <td className="py-2.5 px-3 text-[#0EA5E9] font-bold">₹{bet.amount.toLocaleString()}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider ${bet.type === 'BACK' ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' : 'bg-[#F43F5E]/10 text-[#F43F5E]'}`}>
                        {bet.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-zinc-400">{bet.placeDate}</td>
                    <td className="py-2.5 px-3 font-medium text-zinc-500">{bet.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            No bets placed yet
          </div>
        )}
      </div>
    </div>
  );
};
export default MyBetsPanel;
