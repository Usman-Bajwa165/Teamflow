import "./globals.css";
import React from "react";
import ClientRoot from "../components/ClientRoot";

export const metadata = {
  title: "Teamflow",
  description: "Teamflow - collaborative projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <ClientRoot>
          {/* main holds page content; header is fixed so use top padding */}
          <main className="w-full pt-16 pb-6 min-h-[calc(100vh-4rem)] overflow-y-auto">
            {children}
          </main>
        </ClientRoot>
      </body>
    </html>
  );
}
