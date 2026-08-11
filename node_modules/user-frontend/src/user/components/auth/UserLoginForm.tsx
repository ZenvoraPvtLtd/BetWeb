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
    <div className="w-full flex flex-col gap-6">
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
          className="h-[52px] w-full bg-[#0EA5E9] hover:bg-[#0284c7] active:bg-[#0369a1] text-white text-sm font-semibold rounded-[10px] transition-colors flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </>
          )}
        </button>
      </form>

      {/* Demo Login Button */}
      <button
        onClick={handleDemoLogin}
        disabled={isLoading}
        className="h-[52px] w-full bg-white border border-[#E2E8F0] hover:bg-zinc-50 active:bg-zinc-100 text-zinc-700 text-sm font-semibold rounded-[10px] transition-all flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-zinc-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Login with Demo ID</span>
      </button>

      {/* Security alert footnote */}
      <div className="flex items-center justify-center gap-2 text-zinc-500 text-[11px] font-medium mt-1 select-none">
        <ShieldCheck className="w-4 h-4 text-[#0EA5E9] stroke-[2.2]" />
        <span>Secure login. Your account credentials are protected.</span>
      </div>
    </div>
  );
};
export default UserLoginForm;
