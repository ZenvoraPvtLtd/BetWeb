import React from 'react';
import { Logo } from '../../components/common/Logo';
import { UserLoginForm } from '../../components/auth/UserLoginForm';

export const UserLoginPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#0B0F19] font-sans text-slate-100">
      {/* LEFT SIDE: Brand & Marketing (Desktop: 55% width, Mobile: Top header) */}
      <section className="w-full md:w-[55%] bg-[#090D16] relative flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-[#1E293B]">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Ambient radial glows */}
        <div className="absolute top-[20%] left-[10%] w-[380px] h-[380px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top: Logo */}
        <div className="z-10 flex justify-center md:justify-start">
          <Logo width={140} theme="dark" />
        </div>

        {/* Middle: Brand Slogan */}
        <div className="my-8 md:my-auto max-w-[460px] w-full mx-auto md:mx-0 flex flex-col text-center md:text-left z-10 select-none font-mono">
          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2 block">
            Sports Exchange & Live Casino Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-100 leading-tight uppercase font-sans">
            Play Smart. <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-[#FF5722] to-[#FBBF24] bg-clip-text text-transparent">Play Confident.</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-4 leading-relaxed font-medium font-sans">
            Experience a modern sports exchange platform with instant back/lay trading, ultra-low latency odds, and secure real-time casino dealer streams.
          </p>

          {/* Thin geometric line graphics */}
          <div className="hidden md:block w-16 h-[3px] bg-gradient-to-r from-[#FF5722] to-[#FBBF24] mt-8 rounded-full shadow-sm shadow-orange-500/50" />
        </div>

        {/* Bottom note */}
        <div className="hidden md:block text-[11px] text-slate-500 select-none z-10 font-mono">
          &copy; {new Date().getFullYear()} XPLAY5. All rights reserved.
        </div>
      </section>

      {/* RIGHT SIDE: Login Canvas (Desktop: 45% width, Mobile: Full height content) */}
      <section className="flex-1 bg-[#0B0F19] flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-y-auto">
        {/* Align center in middle vertically */}
        <div className="my-auto max-w-[390px] w-full mx-auto flex flex-col justify-center animate-fadeIn font-mono">
          {/* Header titles */}
          <div className="mb-8 text-left select-none">
            <h2 className="text-2xl font-bold tracking-tight text-slate-100 font-sans">
              Welcome back
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 font-medium font-sans">
              Sign in to continue to your exchange account.
            </p>
          </div>

          <UserLoginForm />
        </div>

        {/* Brand footer inside login side */}
        <footer className="mt-8 pt-6 border-t border-[#1E293B] flex flex-row items-center justify-between text-[11px] text-slate-400 font-semibold tracking-wide select-none font-sans">
          <a href="/terms" className="hover:text-orange-400 transition-colors">
            Terms & Conditions
          </a>
          <a href="/responsible-gaming" className="hover:text-orange-400 transition-colors">
            Responsible Gaming
          </a>
          <a href="/support" className="hover:text-orange-400 transition-colors">
            24×7 Support
          </a>
        </footer>
      </section>
    </div>
  );
};
export default UserLoginPage;
