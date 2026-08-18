import React from 'react';

export interface SummaryCard {
  label: string;
  value: string | number;
  color?: string;
}

interface ReportSummaryCardsProps {
  cards: SummaryCard[];
}

export const ReportSummaryCards: React.FC<ReportSummaryCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full select-none text-left font-mono">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 flex flex-col justify-center shadow-md hover:border-[#233252] transition-colors"
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            {card.label}
          </span>
          <span className={`text-base font-extrabold tracking-tight mt-1.5 ${card.color || 'text-slate-100'}`}>
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
};
export default ReportSummaryCards;
