// frontend/app/login/page.tsx
'use client';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('ali@gmail.com');
  const [password, setPassword] = useState('newPass123');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      setErr(e?.body?.message || JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        {err && <div className="text-red-600">{err}</div>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded" />
        <div className="flex justify-between items-center">
          <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? '...' : 'Login'}</button>
          <a href="/forgot" className="text-sm">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}
