import React from 'react';
import { useBetSlip } from '../../../context/BetSlipContext';
import { BookOpen } from 'lucide-react';

export const MyBetsPanel: React.FC = () => {
  const { placedBets } = useBetSlip();

  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden select-none text-left shadow-md">
      <div className="h-11 px-4 bg-[#0E1524] flex items-center gap-2 border-b border-[#1E293B] font-bold text-xs uppercase tracking-wider text-white font-mono">
        <BookOpen className="w-4 h-4 text-orange-400" />
        <span>My Bets ({placedBets.length})</span>
      </div>

      <div className="p-4 bg-[#090E17]/40">
        {placedBets.length > 0 ? (
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-[#1E293B] text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Market / Selection</th>
                  <th className="py-2.5 px-3">Odds</th>
                  <th className="py-2.5 px-3">Stake</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Placed Date</th>
                  <th className="py-2.5 px-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] text-[11px] font-semibold text-slate-300 font-mono">
                {placedBets.map((bet, idx) => (
                  <tr key={idx} className="hover:bg-[#18233C]/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-400">{bet.no}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-slate-100 block font-bold">{bet.selectionName}</span>
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider mt-0.5">{bet.marketName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-extrabold text-amber-400">{bet.rate}</td>
                    <td className="py-2.5 px-3 text-orange-400 font-bold">₹{bet.amount.toLocaleString()}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider ${bet.type === 'BACK' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'}`}>
                        {bet.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-400">{bet.placeDate}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-500">{bet.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
            No bets placed yet
          </div>
        )}
      </div>
    </div>
  );
};
export default MyBetsPanel;
