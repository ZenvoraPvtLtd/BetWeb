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
        <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 animate-pulse">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold uppercase tracking-widest text-slate-100">
            Something went wrong
          </h1>
          <p className="text-xs text-slate-400 mt-2 max-w-[340px] font-semibold leading-relaxed">
            An unexpected error occurred while loading this page layout. We apologize for the inconvenience.
          </p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={this.handleReload}
              className="flex items-center gap-1.5 px-4 h-10 rounded-[8px] bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white font-bold text-xs uppercase tracking-wider transition-all outline-none cursor-pointer shadow-md shadow-orange-950/40"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
            <a
              href="/home"
              className="flex items-center px-4 h-10 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors outline-none cursor-pointer"
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
