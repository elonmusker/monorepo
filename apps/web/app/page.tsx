import type { Metadata } from 'next';
import React from 'react';
import { Button, Card } from '@repo/ui';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">MyApp</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern web application built with Next.js App Router, TypeScript, and Supabase.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card title="Next.js 15">
            <p className="text-gray-600">
              App Router with React Server Components for optimal performance.
            </p>
          </Card>
          <Card title="Supabase">
            <p className="text-gray-600">
              Real-time database with authentication and storage built in.
            </p>
          </Card>
          <Card title="Monorepo">
            <p className="text-gray-600">
              Shared packages across web, admin, mobile, and API applications.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
