'use client';
import React, { useState } from 'react';
import { requestPasswordReset } from '../../lib/api';

export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function isEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!isEmail(email)) {
      setErr('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await requestPasswordReset(email.trim());
      setMsg(res?.message || 'Email sent successfully check your inbox.');
    } catch (e: any) {
      setErr(e?.body?.message || 'Email not found try register yourself');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-3">Forgot password?</h2>
        <p className="mb-4 text-sm text-gray-500">Enter your account email. If it exists, we'll email a password reset link.</p>

        <form onSubmit={submit} className="space-y-4">
          {msg && <div className="text-green-600 text-sm">{msg}</div>}
          {err && <div className="text-red-600 text-sm">{err}</div>}

          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
            className="w-full px-4 py-3 border rounded-lg" type="email" />

          <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full">{loading ? 'Sending…' : 'Send reset link'}</button>
        </form>
      </div>
    </div>
  );
}
