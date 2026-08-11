import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hourglass, ArrowLeft } from 'lucide-react';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';
import { Button } from '../../components/ui/Button';

export const PendingImplementation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SuperAdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[380px] text-center max-w-md mx-auto p-6 md:p-8 bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none">
        <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200/60 mb-5">
          <Hourglass className="w-5 h-5 text-zinc-500 animate-pulse" />
        </div>

        <h1 className="text-lg font-semibold text-zinc-900 mb-2">Module Pending Implementation</h1>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-6">
          This administrative feature is currently scheduled for development in an upcoming phase. Wait for design specifications to be provided.
        </p>

        <div className="w-[130px]">
          <Button
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="w-4 h-4 shrink-0" />}
          >
            Go Back
          </Button>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
