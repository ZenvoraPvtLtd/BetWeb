import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import { reportsConfig } from '../../../config/reports';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';

export const ReportPage: React.FC = () => {
  const { reportSlug } = useParams<{ reportSlug: string }>();

  // Find report metadata matching slug parameter
  const report = reportsConfig.find((r) => r.slug === reportSlug);

  if (!report) {
    // Redirect back to market analysis if invalid slug is passed
    return <Navigate to="/admin/market-analysis" replace />;
  }

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-950 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-400">Reports</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-950">{report.label}</span>
        </nav>

        {/* Dynamic Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
            <FileText className="w-[18px] h-[18px] text-zinc-900" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 leading-none">
              {report.label}
            </h1>
            <p className="text-xs text-zinc-500 mt-1.5">
              {report.description}
            </p>
          </div>
        </div>

        {/* Premium Workspace Placeholder */}
        <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-6 md:p-8 bg-white border border-zinc-200 rounded-[8px] shadow-sm">
          <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200/60 mb-5">
            <FileText className="w-5 h-5 text-zinc-400" />
          </div>

          <h2 className="text-base font-semibold text-zinc-900 mb-1.5">
            {report.label} Console
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-sm">
            {report.placeholderText} Visual filter layouts and data structures will be populated once mockup references are provided.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
