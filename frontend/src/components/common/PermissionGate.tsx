import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

interface PermissionGateProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  fallback,
  children,
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    // Default "Access Denied" view
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl select-none font-sans animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 mb-5 text-red-400">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-base font-bold text-slate-100 mb-1.5 uppercase tracking-wide">
          Access Denied
        </h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
          Your account role does not have permission to view this workspace. Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
