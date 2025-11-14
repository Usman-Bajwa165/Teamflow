// frontend/src/components/ClientRoot.tsx
'use client';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import TopNav from './TopNav';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TopNav />
      {children}
    </AuthProvider>
  );
}
