"use client";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import TopNav from "./TopNav";
import BackButton from "./BackButton";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
        <TopNav />
        <BackButton />
        {/* container is full width but content inside can limit itself */}
        <div className="w-full mx-auto px-4 py-6">{children}</div>
      </div>
    </AuthProvider>
  );
}
