import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07111F] text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-6 animate-pulse">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold uppercase tracking-widest text-white">
            Something went wrong
          </h1>
          <p className="text-xs text-zinc-450 mt-2 max-w-[320px] font-semibold leading-relaxed">
            An unexpected error occurred while loading this page layout. We apologize for the inconvenience.
          </p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={this.handleReload}
              className="flex items-center gap-1.5 px-4 h-10 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider transition-colors outline-none cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
            <a
              href="/home"
              className="flex items-center px-4 h-10 rounded-[8px] bg-[#111F30] border border-slate-700/10 hover:bg-[#16283D] text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors outline-none cursor-pointer"
            >
              Back to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default GlobalErrorBoundary;
