import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoginInput } from './LoginInput';
import { User, LockKeyhole, ArrowRight, ShieldCheck } from 'lucide-react';
import { ErrorMessage } from '../common/ErrorMessage';

export const UserLoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both User Name and Password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login(username.trim(), password.trim());
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login('User', 'DemoUser123');
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <ErrorMessage message={error} />}

        <LoginInput
          label="Username"
          placeholder="User Name"
          icon={User}
          id="login-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />

        <LoginInput
          label="Password"
          placeholder="Password"
          type="password"
          icon={LockKeyhole}
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* Primary Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="h-[52px] w-full bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-sm font-bold rounded-[10px] transition-all flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-950/40 uppercase tracking-wider"
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <span>Login to Account</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Demo Login Button */}
      <button
        onClick={handleDemoLogin}
        disabled={isLoading}
        className="h-[52px] w-full bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] hover:border-orange-500/40 text-slate-100 text-sm font-bold rounded-[10px] transition-all flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider shadow-sm"
      >
        <span>Login with Demo ID</span>
      </button>

      {/* Security alert footnote */}
      <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] font-medium mt-1 select-none font-sans">
        <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[2.2]" />
        <span>Secure login. Your account credentials are protected.</span>
      </div>
    </div>
  );
};
export default UserLoginForm;
