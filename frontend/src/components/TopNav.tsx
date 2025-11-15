"use client";
// frontend/src/components/TopNav.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function TopNav() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // while not mounted, render a minimal, neutral header (no auth links) to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-[100rem] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-md p-2 bg-gradient-to-r from-indigo-600 to-violet-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="block">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-900">Teamflow</span>
          </Link>

          {/* Keep the right side minimal while SSR/hydrating to avoid leaking auth state */}
          <nav className="flex items-center gap-3">
            <div className="w-36 h-6 rounded bg-gray-100 animate-pulse" />
          </nav>
        </div>
      </header>
    );
  }

  // After mount render full nav based on auth state
  const brandHref = user ? "/dashboard" : "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="max-w-[100rem] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={brandHref} className="flex items-center gap-3">
          <div className="rounded-md p-2 bg-gradient-to-r from-indigo-600 to-violet-500 shadow-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="block">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-lg text-slate-900 leading-none">Teamflow</div>
            <div className="text-xs text-slate-500 -mt-0.5">Collaborative boards, without the fuss</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/teams" className="text-sm text-slate-700 hover:text-slate-900">Teams</Link>
              <Link href="/projects" className="text-sm text-slate-700 hover:text-slate-900">Projects</Link>

              {user.role === "admin" && (
                <Link href="/admin/users" className="text-sm text-slate-700 hover:text-slate-900">Manage users</Link>
              )}

              <div className="flex items-center gap-3 ml-4">
                {/* role badge */}
                <span className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-700 border">
                  {user.role?.toUpperCase() ?? "USER"}
                </span>

                {/* small avatar or initials */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-medium flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : "U")}
                  </div>
                  <div className="hidden sm:block text-sm text-slate-700">{user.email}</div>
                </div>

                <button
                  onClick={() => logout()}
                  className="ml-2 text-sm bg-rose-600 text-white px-3 py-1 rounded-md shadow-sm hover:opacity-95"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-slate-700 hover:text-slate-900">Login</Link>
              <Link href="/register" className="text-sm ml-2 text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
