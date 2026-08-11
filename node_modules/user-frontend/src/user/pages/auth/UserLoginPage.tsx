import React from 'react';
import { Logo } from '../../components/common/Logo';
import { UserLoginForm } from '../../components/auth/UserLoginForm';

export const UserLoginPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans">
      {/* LEFT SIDE: Brand & Marketing (Desktop: 55% width, Mobile: Top header) */}
      <section className="w-full md:w-[55%] bg-[#07111F] relative flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden shrink-0">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Ambient radial glows */}
        <div className="absolute top-[20%] left-[10%] w-[380px] h-[380px] bg-[#0EA5E9]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Top: Logo */}
        <div className="z-10 flex justify-center md:justify-start">
          <Logo width={120} theme="light" />
        </div>

        {/* Middle: Brand Slogan */}
        <div className="my-8 md:my-auto max-w-[460px] w-full mx-auto md:mx-0 flex flex-col text-center md:text-left z-10 select-none">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0EA5E9] mb-2 block">
            Sports Exchange Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
            Play Smart. <br className="hidden md:inline" />
            Play Confident.
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-4 leading-relaxed font-medium">
            Experience a modern sports exchange platform with fast, secure and simple access.
          </p>

          {/* Thin geometric line graphics */}
          <div className="hidden md:block w-16 h-[2px] bg-[#0EA5E9] mt-8 rounded-full" />
        </div>

        {/* Bottom note */}
        <div className="hidden md:block text-[11px] text-zinc-500 select-none z-10">
          &copy; {new Date().getFullYear()} XPLAY5. All rights reserved.
        </div>
      </section>

      {/* RIGHT SIDE: Login Canvas (Desktop: 45% width, Mobile: Full height content) */}
      <section className="flex-1 bg-[#F8FAFC] flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-y-auto">
        {/* Align center in middle vertically */}
        <div className="my-auto max-w-[390px] w-full mx-auto flex flex-col justify-center animate-fadeIn">
          {/* Header titles */}
          <div className="mb-8 text-left select-none">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
              Welcome back
            </h2>
            <p className="text-xs text-[#64748B] mt-1.5 font-medium">
              Sign in to continue to your exchange account.
            </p>
          </div>

          <UserLoginForm />
        </div>

        {/* Brand footer inside login side */}
        <footer className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-row items-center justify-between text-[11px] text-[#64748B] font-semibold tracking-wide select-none">
          <a href="#terms" className="hover:text-[#0F172A] transition-colors">
            Terms & Conditions
          </a>
          <a href="#gaming" className="hover:text-[#0F172A] transition-colors">
            Responsible Gaming
          </a>
          <a href="#support" className="hover:text-[#0F172A] transition-colors">
            24×7 Support
          </a>
        </footer>
      </section>
    </div>
  );
};
export default UserLoginPage;
