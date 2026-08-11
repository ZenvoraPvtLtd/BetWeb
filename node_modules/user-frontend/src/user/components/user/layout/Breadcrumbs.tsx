import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-450 select-none text-left flex-wrap">
      <a
        href="/home"
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <Home className="w-3 h-3 text-[#0EA5E9]" />
        <span>Home</span>
      </a>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          {item.to ? (
            <a
              href={item.to}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-white truncate max-w-[150px] sm:max-w-none">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
export default Breadcrumbs;
