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

  // Header content (keeps the same styling you liked)
  const header = (
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 p-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="block">
            <path d="M3 12h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6h18M3 18h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-bold text-lg text-slate-900">Teamflow</span>
      </Link>

      <nav className="flex items-center gap-3">
        <Link href="/teams" className="text-sm text-slate-700 hover:text-slate-900">Teams</Link>
        <Link href="/projects" className="text-sm text-slate-700 hover:text-slate-900">Projects</Link>

        {/* Dashboard: only visible when user is logged in */}
        {mounted && user ? (
          <Link href="/dashboard" className="text-sm text-slate-700 hover:text-slate-900 ml-1">
            Dashboard
          </Link>
        ) : (
          // placeholder keeps DOM shape consistent for SSR
          <span className="hidden md:inline-block w-0" aria-hidden />
        )}

        {/* Admin-only "Manage users" */}
        {mounted && user?.role === "admin" ? (
          <Link href="/admin/users" className="text-sm ml-3 text-slate-700 hover:text-slate-900">Manage users</Link>
        ) : (
          <span className="hidden md:inline-block w-0" aria-hidden />
        )}

        {mounted && user ? (
          <>
            <div className="hidden sm:inline-block text-sm ml-4 mr-3 text-slate-700">{user.email}</div>
            <button
              onClick={() => logout()}
              className="text-sm bg-rose-600 text-white px-3 py-1 rounded-md shadow-sm hover:opacity-95"
            >
              Logout
            </button>
          </>
        ) : mounted ? (
          <>
            <Link href="/login" className="text-sm text-slate-700">Login</Link>
            <Link href="/register" className="text-sm ml-2 text-indigo-600">Register</Link>
          </>
        ) : (
          // placeholders to keep the DOM stable during SSR -> client mount
          <>
            <span className="hidden sm:inline-block w-20" aria-hidden />
            <span className="hidden sm:inline-block w-20" aria-hidden />
          </>
        )}
      </nav>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="h-16">{header}</div>
    </header>
  );
}
