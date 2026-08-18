import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full flex items-start gap-2 p-3 bg-red-950/30 border border-red-500/40 rounded-[8px] text-red-300 text-xs leading-relaxed select-none font-mono">
      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
};
