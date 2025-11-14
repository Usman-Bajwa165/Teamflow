// frontend/app/layout.tsx
import './globals.css';
import React from 'react';
import ClientRoot from '../components/ClientRoot';

export const metadata = {
  title: 'Teamflow',
  description: 'Teamflow - collaborative projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          <main className="w-full px-4 py-4">{children}</main>
        </ClientRoot>
      </body>
    </html>
  );
}
