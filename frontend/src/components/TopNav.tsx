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

  // Server-like fallback markup (keeps SSR output stable)
  if (!mounted) {
    return (
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            Teamflow
          </Link>
          <nav className="space-x-3">
            <Link href="/teams" className="text-sm">
              Teams
            </Link>
            <Link href="/projects" className="text-sm">
              Projects
            </Link>
            <Link href="/login" className="text-sm">
              Login
            </Link>
            <Link href="/register" className="text-sm ml-2">
              Register
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  // Client-rendered nav (uses auth state)
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          Teamflow
        </Link>

        <nav className="space-x-3 flex items-center">
          <Link href="/teams" className="text-sm">
            Teams
          </Link>
          <Link href="/projects" className="text-sm">
            Projects
          </Link>

          {/* Admin-only "Manage users" */}
          {user?.role === "admin" && (
            <Link href="/admin/users" className="text-sm ml-3">
              Manage users
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm ml-4 mr-3">{user.email}</span>
              <button
                onClick={() => logout()}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm">
                Login
              </Link>
              <Link href="/register" className="text-sm ml-2">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
