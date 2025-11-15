"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  // pages where we don't show back button
  const hiddenPaths = ["/", "/login", "/register", "/dashboard"];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <div
      className="fixed left-4 top-16 z-50"
      style={{ display: "block" }}
      aria-hidden={false}
    >
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-md border bg-white shadow-sm hover:bg-slate-50"
        aria-label="Go back"
      >
        ← Back
      </button>
    </div>
  );
}
