// frontend/src/app/layout.tsx
import './globals.css';
import React from 'react';
import ClientRoot from '../components/ClientRoot';

export const metadata = {
  title: 'Teamflow',
  description: 'Teamflow - collaborative projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // IMPORTANT:
  // TopNav is fixed with height h-16 (64px). We add padding-top to the main container
  // so content does not sit under the navbar. We also make main the scrollable area
  // (overflow-y-auto) so the navbar never moves and only body/main scrolls.
  //
  // If you ever want only a sub-area to scroll (e.g. right panel), remove overflow on main
  // and apply `max-h-[...] overflow-y-auto` to the specific container.
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <ClientRoot>
          {/* main holds page content, is scrollable and has top padding matching header height */}
          <main className="w-full px-4 pt-16 pb-6 min-h-[calc(100vh-4rem)] overflow-y-auto">
            {children}
          </main>
        </ClientRoot>
      </body>
    </html>
  );
}
