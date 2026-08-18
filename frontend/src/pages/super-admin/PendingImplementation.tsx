import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hourglass, ArrowLeft } from 'lucide-react';
import { SuperAdminLayout } from '../../components/super-admin/SuperAdminLayout';
import { Button } from '../../components/ui/Button';

export const PendingImplementation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SuperAdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[380px] text-center max-w-md mx-auto p-6 md:p-8 bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl select-none animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30 mb-5">
          <Hourglass className="w-6 h-6 text-orange-400 animate-pulse" />
        </div>

        <h1 className="text-lg font-bold text-slate-100 mb-2">Module Pending Implementation</h1>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
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
