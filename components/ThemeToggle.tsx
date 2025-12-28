'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
        setTheme(initialTheme);
        setMounted(true);
      } catch {
        // Fallback if localStorage is not available
        console.warn('localStorage not available, using light theme as default');
        setTheme('light');
        setMounted(true);
      }
    };

    initializeTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      console.warn('Failed to save theme preference to localStorage');
    }
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="fixed top-4 right-4 w-10 h-10" aria-hidden="true"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}
