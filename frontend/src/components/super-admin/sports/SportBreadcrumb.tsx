import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface SportBreadcrumbProps {
  sportName: string;
}

export const SportBreadcrumb: React.FC<SportBreadcrumbProps> = ({ sportName }) => {
  return (
    <nav className="flex items-center gap-1.5 text-[11px] md:text-xs text-zinc-500 mb-4 select-none" aria-label="Breadcrumb">
      <Link
        to="/admin/market-analysis"
        className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Super Admin</span>
      </Link>

      <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />

      <span className="text-zinc-500 font-normal">Sports</span>

      <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />

      <span className="text-zinc-900 font-medium truncate max-w-[120px] sm:max-w-none">
        {sportName}
      </span>
    </nav>
  );
};
