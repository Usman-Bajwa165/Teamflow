'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      // redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (e: any) {
      setErr(e?.body?.message || String(e?.message || 'Login failed'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Welcome back</h2>
        <p className="text-sm text-slate-500 mb-4">Sign in to access your projects and teams.</p>

        <form onSubmit={submit} className="space-y-4">
          {err && <div className="text-red-600">{err}</div>}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-200"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-200"
            required
          />

          <div className="flex items-center justify-between">
            <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded shadow">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <a className="text-sm text-indigo-600 hover:underline" href="/forgot">Forgot?</a>
          </div>
        </form>

        <div className="text-sm text-slate-500 mt-4">
          Don’t have an account? <a className="text-indigo-600 hover:underline" href="/register">Create one</a>
        </div>
      </div>
    </div>
  );
}
