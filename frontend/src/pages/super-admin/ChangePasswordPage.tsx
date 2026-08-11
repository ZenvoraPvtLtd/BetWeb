import React from 'react';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';

export const ChangePasswordPage: React.FC = () => {
  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-955 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-955">Change Password</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            Change Password
          </h1>
          <p className="text-xs text-zinc-555 mt-1.5 leading-relaxed">
            Configure password keys and update your account security options.
          </p>
        </div>

        {/* Premium Placeholder Panel */}
        <div className="bg-white border border-zinc-200 rounded-[8px] p-8 shadow-sm flex flex-col items-center justify-center min-h-[320px] text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-50/60 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-150">
            <ShieldAlert className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-800">Security Configuration</h2>
          <p className="text-xs text-zinc-500 max-w-sm mt-1.5 leading-relaxed font-sans">
            Change password functionality will be implemented here. This environment is currently
            configured as a development workspace.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
