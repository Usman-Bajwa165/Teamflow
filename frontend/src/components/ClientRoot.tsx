'use client';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import TopNav from './TopNav';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <TopNav />
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </div>
    </AuthProvider>
  );
}
