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

    // Default "Access Denied" premium view
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none font-sans animate-fadeIn">
        <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200/60 mb-5 text-red-500">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-zinc-900 mb-1.5 uppercase tracking-wide">
          Access Denied
        </h2>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-sm">
          Your account role does not have permission to view this workspace. Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
