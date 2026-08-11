import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { useSettings } from '../../context/SettingsContext';
import { Smartphone, CreditCard, ShieldCheck, Check } from 'lucide-react';

export const PaymentMethodPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { paymentMethods, selectPaymentMethod } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const getMethodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#0EA5E9]" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  const breadcrumbs = [
    { label: 'Settings', to: '/settings' },
    { label: 'Payment Methods' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Payment Methods Preference"
          description="Manage your preferred transaction wire services and mock UPI selectors."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-36 bg-[#111F30] rounded-[12px] border border-slate-700/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method) => {
              const isSelected = method.status === 'SELECTED';
              return (
                <div
                  key={method.id}
                  onClick={() => selectPaymentMethod(method.id)}
                  className={`
                    p-5 rounded-[12px] border flex flex-col justify-between h-36 transition-all hover:scale-[1.01] cursor-pointer shadow-xs select-none
                    ${
                      isSelected
                        ? 'bg-[#111F30] border-[#0EA5E9] ring-1 ring-[#0EA5E9]/20'
                        : 'bg-zinc-950/15 border-slate-700/15 hover:border-zinc-800'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-zinc-900/30 border border-zinc-800 rounded-[8px]">
                      {getMethodIcon(method.icon)}
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-xs font-extrabold uppercase tracking-wide text-white">
                        {method.name}
                      </h4>
                      <p className="text-[10px] text-zinc-450 mt-1 font-semibold leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/80 pt-3 mt-auto">
                    <span className="text-[9px] font-bold text-zinc-550 uppercase tracking-widest">
                      Status: {isSelected ? 'Default' : 'Inactive'}
                    </span>
                    <button
                      className={`
                        flex items-center gap-1 px-3 h-7 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-colors outline-none
                        ${
                          isSelected
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E]'
                            : 'bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                        }
                      `}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Select</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
};
export default PaymentMethodPage;
