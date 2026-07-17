'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useLogin } from '@/hooks/useLogin';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, handleLogin } = useLogin();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        id="email"
        type="email"
        label="EMAIL ADDRESS"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        required
      />
      <Input
        id="password"
        type="password"
        label="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />

      <div className="flex items-center justify-between mb-10">
        <Checkbox id="remember" label="Remember me" />
        <a href="#" className="text-xs text-text-secondary hover:text-accent-light transition-colors tracking-[0.02em]">
          Forgot password?
        </a>
      </div>

      {error && (
        <p className="text-xs text-red-400 mb-4 text-center">{error}</p>
      )}

      <Button type="submit" loading={loading} className="w-full">
        Sign In
      </Button>
    </form>
  );
}
