import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const loggedUser = await login({ username, password });
      if (loggedUser.role === 'USER') {
        navigate('/user/dashboard');
      } else {
        navigate('/admin/market-analysis');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      {error && (
        <div
          className="w-full mb-4 px-3.5 py-2.5 bg-red-950/40 text-red-400 border border-red-800/60 rounded-[8px] text-xs flex items-start gap-2 text-left transition-all duration-200 animate-fadeIn"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="w-full flex flex-col gap-[22px]">
        <Input
          label="Username or Email"
          type="text"
          placeholder="Enter your username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="username"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="current-password"
        />

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            icon={<LogIn className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
};
