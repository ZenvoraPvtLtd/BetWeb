import React from 'react';
import { Logo } from '../components/common/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-b from-login-bg-start via-login-bg-middle to-login-bg-end relative p-6 overflow-y-auto">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Ambient radial glows */}
      <div className="absolute top-[25%] left-[20%] w-[380px] h-[380px] bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[20%] w-[320px] h-[320px] bg-sky-500/6 rounded-full blur-[80px] pointer-events-none" />

      {/* Centered Login Card Container */}
      <div className="w-full max-w-[420px] bg-white border border-zinc-200 rounded-[12px] p-8 md:p-10 shadow-2xl z-10 animate-fadeIn text-left">
        {/* Centered Logo inside Card */}
        <div className="flex justify-center mb-6">
          <Logo width={160} theme="dark" />
        </div>

        {children}
      </div>
    </div>
  );
};
