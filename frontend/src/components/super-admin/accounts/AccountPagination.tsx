import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AccountPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AccountPagination: React.FC<AccountPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const buttonClass = (disabled: boolean) => `
    w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#233252] text-xs font-semibold
    transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 select-none
    ${
      disabled
        ? 'opacity-30 cursor-not-allowed bg-[#0E1524] text-slate-500'
        : 'bg-[#131B2E] hover:bg-[#1C2844] text-slate-200 cursor-pointer active:scale-95'
    }
  `;

  return (
    <nav className="flex items-center justify-center gap-1.5 py-4" aria-label="Pagination Navigation">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={buttonClass(currentPage === 1)}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => {
        const isCurrent = num === currentPage;
        return (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`
              w-8 h-8 flex items-center justify-center rounded-[8px] text-xs font-semibold select-none transition-all cursor-pointer
              ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] border border-orange-500/30 text-white font-bold shadow-md shadow-orange-950/40'
                  : 'bg-[#131B2E] border border-[#233252] text-slate-300 hover:bg-[#1C2844] hover:text-white'
              }
            `}
          >
            {num}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={buttonClass(currentPage === totalPages)}
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
