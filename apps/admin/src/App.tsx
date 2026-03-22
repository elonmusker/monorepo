import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Posts from './pages/Posts';

function Sidebar() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      'block px-4 py-2 rounded-md text-sm font-medium transition-colors',
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100',
    ].join(' ');

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col gap-1">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>
      <NavLink to="/" end className={navClass}>
        Dashboard
      </NavLink>
      <NavLink to="/users" className={navClass}>
        Users
      </NavLink>
      <NavLink to="/posts" className={navClass}>
        Posts
      </NavLink>
    </aside>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
