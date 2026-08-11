import React from 'react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/forms/LoginForm';

export const Login: React.FC = () => {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col text-center">
        {/* Modern SaaS welcome typography */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-1.5 leading-none">
          Welcome back
        </h1>
        <p className="text-xs text-zinc-500 mb-6 font-normal">
          Sign in to continue to your admin workspace.
        </p>

        {/* Redesigned Form */}
        <LoginForm />
      </div>
    </AuthLayout>
  );
};
