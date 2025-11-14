'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resetPassword, validateResetToken } from '../../lib/api';

export default function ResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // validation state
  const [validating, setValidating] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [invalidReason, setInvalidReason] = useState<string | null>(null);

  useEffect(() => {
    // if no token present, mark invalid immediately
    if (!token) {
      setValid(false);
      setInvalidReason('missing');
      setValidating(false);
      return;
    }

    let mounted = true;
    setValidating(true);
    (async () => {
      try {
        const res = await validateResetToken(token);
        if (!mounted) return;
        if (res && res.valid) {
          setValid(true);
          setInvalidReason(null);
        } else {
          setValid(false);
          setInvalidReason(res?.reason || 'invalid');
        }
      } catch (e: any) {
        setValid(false);
        // fallback message
        setInvalidReason(e?.body?.message || 'invalid');
      } finally {
        setValidating(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!valid) {
      setErr('Reset link is invalid or expired. Request a new reset.');
      return;
    }

    if (password.length < 7) {
      setErr('Password must be at least 7 characters.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setMsg('Password reset successful. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1200);
    } catch (error: any) {
      // surface backend message
      let message = 'Reset failed';
      if (error?.body) {
        try {
          const body = typeof error.body === 'string' ? JSON.parse(error.body) : error.body;
          message = body?.message || JSON.stringify(body);
        } catch {
          message = String(error?.body);
        }
      } else if (error?.message) {
        message = error.message;
      }
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  // map reason to user friendly message
  function reasonToMessage(r: string | null) {
    switch (r) {
      case 'used':
        return 'This reset link was already used. Request a new reset.';
      case 'expired':
        return 'This reset link has expired. Request a new reset.';
      case 'missing':
        return 'Missing or invalid reset link. Request a new reset.';
      case 'invalid':
      default:
        return 'Invalid reset link. Request a new reset.';
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">Reset password</h2>

      {validating ? (
        <div className="mb-4 text-slate-600">Validating link...</div>
      ) : null}

      {err && <div className="mb-3 text-red-600">{err}</div>}
      {msg && <div className="mb-3 text-green-600">{msg}</div>}

      {/* Modal/popup when invalid */}
      {valid === false && !validating ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Reset link not usable</h3>
            <p className="mb-4 text-sm text-slate-600">{reasonToMessage(invalidReason)}</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => router.push('/forgot')}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Request new reset
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 border rounded"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* form (disabled if link invalid) */}
      <form onSubmit={submit} className="space-y-4 opacity-100" aria-hidden={valid === false}>
        <div>
          <label className="block text-sm text-slate-600 mb-1">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a new password (min 7 chars)"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            disabled={!valid || validating}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={!valid || validating || loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loading ? 'Resetting...' : 'Reset password'}
          </button>

          <a className="text-sm text-indigo-600 hover:underline" href="/login">
            Back to login
          </a>
        </div>
      </form>
    </div>
  );
}
