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
    w-8 h-8 flex items-center justify-center rounded-[6px] border border-zinc-200 text-xs font-semibold
    transition-all focus:outline-none focus:ring-1 focus:ring-zinc-700 select-none
    ${
      disabled
        ? 'opacity-40 cursor-not-allowed bg-zinc-50 text-zinc-400'
        : 'bg-white hover:bg-zinc-50 text-zinc-600 cursor-pointer active:brightness-95'
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
              w-8 h-8 flex items-center justify-center rounded-[6px] text-xs font-semibold select-none transition-all cursor-pointer
              ${
                isCurrent
                  ? 'bg-zinc-900 border border-zinc-900 text-white font-bold'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 active:brightness-95'
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
