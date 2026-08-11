import React, { useEffect } from 'react';
import { X, ClipboardCheck, Clock, ShieldCheck } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface DetailPairProps {
  label: string;
  value: string | number;
  color?: string;
}

const DetailPair: React.FC<DetailPairProps> = ({ label, value, color }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-zinc-900 last:border-0">
    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">{label}</span>
    <span className={`text-xs font-bold ${color || 'text-white'}`}>{value}</span>
  </div>
);

interface ReportDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const ReportDetailDrawer: React.FC<ReportDetailDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const formatPL = (val?: number) => {
    if (val === undefined || val === 0) return '₹0.00';
    return `${val > 0 ? '+' : ''}₹${val.toLocaleString('en-IN', {
      minimumFractionDigits: 2
    })}`;
  };

  const drawerBody = (
    <div className="flex-1 flex flex-col h-full bg-[#111F30] text-white select-none text-left">
      {/* Drawer Header */}
      <div className="bg-[#0D1B2A] h-14 border-b border-zinc-800/60 px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-[#0EA5E9]" />
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Details Log</h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Details list */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-thin">
        {/* Badge details */}
        <div className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-[10px] flex items-center justify-between">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
            ID: #{data.id}
          </span>
          <StatusBadge status={data.status || 'Settled'} />
        </div>

        {/* Main detail properties */}
        <div className="bg-zinc-950/10 border border-zinc-900 rounded-[12px] px-4 py-1.5">
          <DetailPair label="Fixture / Title" value={data.matchName || data.gameName || 'System Statement'} />
          {data.marketName && <DetailPair label="Bet Market" value={data.marketName} />}
          {data.selectionName && <DetailPair label="Outcome Pick" value={data.selectionName} />}
          {data.odds && <DetailPair label="Bet Rate / Odds" value={data.odds} />}
          {data.stake !== undefined && (
            <DetailPair label="Staked Amount" value={`₹${data.stake.toLocaleString()}`} color="text-[#0EA5E9]" />
          )}
          {data.potentialReturn !== undefined && (
            <DetailPair label="Pot. Return" value={`₹${data.potentialReturn.toLocaleString()}`} />
          )}
          {data.profitLoss !== undefined && (
            <DetailPair
              label="Profit / Loss"
              value={formatPL(data.profitLoss)}
              color={data.profitLoss >= 0 ? 'text-[#22C55E]' : 'text-[#F43F5E]'}
            />
          )}
          {data.debit !== undefined && (
            <DetailPair label="Debited Out" value={`-₹${data.debit.toLocaleString()}`} color="text-[#F43F5E]" />
          )}
          {data.credit !== undefined && (
            <DetailPair label="Credited In" value={`+₹${data.credit.toLocaleString()}`} color="text-[#22C55E]" />
          )}
          {data.balance !== undefined && (
            <DetailPair label="Running Balance" value={`₹${data.balance.toLocaleString()}`} color="text-emerald-400" />
          )}
          {data.deletedBy && <DetailPair label="Cancelled By" value={data.deletedBy} color="text-rose-450" />}
          {data.reason && <DetailPair label="Cancel Reason" value={data.reason} color="text-rose-300" />}
        </div>

        {/* Time stamps */}
        <div className="bg-zinc-950/10 border border-zinc-900 rounded-[12px] p-4 flex flex-col gap-2">
          {data.placedAt && (
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Placed: {data.placedAt}</span>
            </div>
          )}
          {data.settledAt && (
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Settled: {data.settledAt}</span>
            </div>
          )}
          {data.deletedAt && (
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>Cancelled: {data.deletedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-3xs" />

      {/* Desktop view drawer */}
      <div className="relative w-[380px] max-w-full h-full shadow-2xl animate-slideLeft z-50">
        {drawerBody}
      </div>
    </div>
  );
};
export default ReportDetailDrawer;
