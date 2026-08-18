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
    return <Navigate to="/admin/market-analysis" replace />;
  }

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-orange-400 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-500">Reports</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400">{report.label}</span>
        </nav>

        {/* Dynamic Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center border border-orange-500/30">
            <FileText className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-none">
              {report.label}
            </h1>
            <p className="text-xs text-slate-400 mt-1.5">
              {report.description}
            </p>
          </div>
        </div>

        {/* Workspace Placeholder */}
        <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-6 md:p-8 bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30 mb-5">
            <FileText className="w-6 h-6 text-orange-400" />
          </div>

          <h2 className="text-base font-bold text-slate-100 mb-1.5">
            {report.label} Console
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
            {report.placeholderText} Visual filter layouts and data structures will be populated once mockup references are provided.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
