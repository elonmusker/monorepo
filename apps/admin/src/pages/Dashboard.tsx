import React from 'react';
import { Card } from '@repo/ui';

const stats = [
  { label: 'Total Users', value: '—', description: 'Registered accounts' },
  { label: 'Published Posts', value: '—', description: 'Visible to the public' },
  { label: 'Draft Posts', value: '—', description: 'Pending publication' },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} title={stat.label}>
            <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
