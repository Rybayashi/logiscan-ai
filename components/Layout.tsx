'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const categories = [
  { name: 'Popular', active: true },
  { name: 'Technology', active: false },
  { name: 'Sports', active: false },
  { name: 'Entertainment', active: false },
  { name: 'Science', active: false },
  { name: 'Politics', active: false },
  { name: 'Crime', active: false },
  { name: 'Economics', active: false },
  { name: 'Video Games', active: false },
];

const filters = [
  'Infectious Diseases',
  'Visa Policy',
  'Executive Compensation',
  'Teams',
  'Clubs',
  'Transfers',
  'Players',
  'Cryptocurrency',
  'Legislation',
  'Thunderstorms',
];

export function Layout({ children }: LayoutProps) {
  const [activeCategory, setActiveCategory] = useState('Popular');

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-semibold text-zinc-900">LogiScan AI</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
              <span>Download App</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-card border-r min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === category.name
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 w-64 p-6 border-t bg-card">
            <div className="flex space-x-3 mb-4">
              <Button variant="ghost" size="sm" className="p-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Button>
            </div>
            <div className="text-xs text-zinc-500 space-y-1">
              <div className="flex space-x-4">
                <a href="#" className="hover:text-zinc-700">Terms of Service</a>
                <a href="#" className="hover:text-zinc-700">Privacy Policy</a>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-zinc-700">Jobs</a>
                <a href="#" className="hover:text-zinc-700">Help</a>
                <a href="#" className="hover:text-zinc-700">Partners</a>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-zinc-700">About Us</a>
              </div>
              <div className="pt-2 text-zinc-400">
                Copyright © 2025 LogiScan AI Inc
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Content Header */}
          <div className="border-b bg-card">
            <div className="px-8 py-6">
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">
                {activeCategory}
              </h1>
              <div className="flex space-x-4 overflow-x-auto">
                {filters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    className="whitespace-nowrap cursor-pointer hover:bg-zinc-100"
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 