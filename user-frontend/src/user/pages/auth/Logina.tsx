import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { ShieldCheck } from 'lucide-react';

export const Logina: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login(username, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-8 shadow-2xl flex flex-col items-center font-mono">
      <div className="w-12 h-12 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck className="w-6 h-6" />
      </div>

      <h1 className="text-xl font-bold tracking-tight text-slate-100 mb-2 leading-none uppercase">
        Sign In
      </h1>
      <p className="text-xs text-slate-400 mb-6 text-center leading-relaxed font-sans">
        Access the Play Money Sports Exchange client workspace.
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {error && <ErrorMessage message={error} />}

        <Input
          label="Username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Login
        </Button>
      </form>
    </div>
  );
};
export default Logina;
