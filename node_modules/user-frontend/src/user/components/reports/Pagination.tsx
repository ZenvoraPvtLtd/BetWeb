import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 select-none py-4 border-t border-zinc-900/60 mt-4">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-8 h-8 rounded-[8px] border border-zinc-850 bg-[#111F30] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer outline-none disabled:opacity-20 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`
            w-8 h-8 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer outline-none
            ${
              currentPage === p
                ? 'bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/15'
                : 'border border-zinc-850 bg-[#111F30] text-zinc-400 hover:text-white'
            }
          `}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-8 h-8 rounded-[8px] border border-zinc-850 bg-[#111F30] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer outline-none disabled:opacity-20 disabled:cursor-not-allowed"
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default Pagination;
