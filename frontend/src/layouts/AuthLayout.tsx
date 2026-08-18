import React from 'react';
import { Logo } from '../components/common/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#0B0F19] relative p-6 overflow-y-auto">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Ambient radial glows with Sunset Orange and Amber */}
      <div className="absolute top-[20%] left-[20%] w-[420px] h-[420px] bg-orange-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[380px] h-[380px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Centered Login Card Container */}
      <div className="w-full max-w-[420px] bg-[#131B2E] border border-[#233252] rounded-[14px] p-8 md:p-10 shadow-2xl shadow-black/60 z-10 animate-fadeIn text-left backdrop-blur-md">
        {/* Centered Logo inside Card */}
        <div className="flex justify-center mb-6">
          <Logo width={165} theme="light" />
        </div>

        {children}
      </div>
    </div>
  );
};
