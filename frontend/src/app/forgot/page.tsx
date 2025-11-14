// frontend/app/forgot/page.tsx
'use client';
import React, { useState } from 'react';
import { requestPasswordReset } from '../../lib/api';

export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      setMsg('If that email exists we logged a reset token on the server (dev).');
    } catch (err: any) {
      setMsg('Failed to request reset');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Request password reset</h2>
      {msg && <div className="mb-3">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
        <button className="bg-yellow-600 text-white px-4 py-2 rounded">Send reset</button>
      </form>
    </div>
  );
}
