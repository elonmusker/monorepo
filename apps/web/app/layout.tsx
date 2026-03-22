import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'A Next.js application with App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-blue-600">
              MyApp
            </a>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="/blog" className="text-gray-700 hover:text-blue-600">
                Blog
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
