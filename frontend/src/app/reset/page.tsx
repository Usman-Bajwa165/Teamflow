// frontend/app/reset/page.tsx
'use client';
import React, { useState } from 'react';
import { resetPassword } from '../../lib/api';

export default function ResetPage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (password.length < 7) {
      setMsg('Password must be at least 7 characters.');
      return;
    }
    try {
      await resetPassword(token, password);
      setMsg('Password reset successful. Please login.');
    } catch (err: any) {
      setMsg(err?.body?.message || 'Reset failed');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Reset password</h2>
      {msg && <div className="mb-3">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Reset token (from server console)" className="w-full px-3 py-2 border rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" type="password" className="w-full px-3 py-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Reset</button>
      </form>
    </div>
  );
}
