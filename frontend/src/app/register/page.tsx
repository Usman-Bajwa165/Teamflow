'use client';
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (password.length < 7) {
      setMsg('Password must be at least 7 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      setMsg('Registered. Please login.');
    } catch (err: any) {
      setMsg(err?.body?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        {msg && <div className="mb-3 text-sm text-red-600">{msg}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name (optional)" className="w-full px-4 py-3 border rounded-lg" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-4 py-3 border rounded-lg" />
          <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">{loading ? '...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
}
