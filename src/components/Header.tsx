'use client';

import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from "@/components/SearchBar";
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Services', href: '/main#services' },
    // { name: 'Blogs', href: '/main#blogs' }, // Blog/Insights section hidden on homepage
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About Us', href: '/main#about' },
    { name: 'Testimonials', href: '/main#testimonials' },
    { name: 'Join Us', href: '/careers' },
  ];

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/80 dark:bg-black/70
        border-b border-gray-200 dark:border-gray-800
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/main" aria-label="Planitt Home" className="flex items-center">
            <Image
              src="/planitt-app-black.png"
              alt="Planitt Logo"
              width={120}
              height={40}
              priority
              className="h-10 w-auto transition-transform duration-200 hover:scale-105 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={(item as { external?: boolean }).external ? "_blank" : undefined}
                  rel={(item as { external?: boolean }).external ? "noreferrer" : undefined}
                  className="
                    nav-gradient-underline
                    text-gray-700 dark:text-gray-300
                    hover:text-[#b78622] dark:hover:text-zinc-300
                    font-medium transition-colors
                    focus:outline-none focus-visible:outline-none
                  "
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className="flex items-center gap-4">
              <SearchBar />
              <button
                suppressHydrationWarning
                onClick={toggleTheme}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-3">
            <button
              suppressHydrationWarning
              onClick={toggleTheme}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">

              {/* 🔍 Mobile Search */}
              <div className="mb-3">
                <SearchBar />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={(item as { external?: boolean }).external ? "_blank" : undefined}
                  rel={(item as { external?: boolean }).external ? "noreferrer" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    block px-3 py-2 rounded-md
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-900
                    focus:outline-none focus-visible:outline-none
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;

