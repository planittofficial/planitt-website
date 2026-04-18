'use client';

import { useEffect, useState } from 'react';
import { Flame, Menu, Moon, Sun, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import { useTheme } from '@/context/ThemeContext';

type HeaderProps = {
  variant?: 'landing' | 'main';
};

export default function Header({ variant = 'main' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [landingAccentEnabled, setLandingAccentEnabled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLanding = variant === 'landing';

  useEffect(() => {
    if (!isLanding) {
      return;
    }

    const storedAccent = window.localStorage.getItem('landing-accent-theme') === 'amber';
    setLandingAccentEnabled(storedAccent);
  }, [isLanding]);

  const toggleLandingAccent = () => {
    const nextEnabled = !landingAccentEnabled;
    setLandingAccentEnabled(nextEnabled);
    window.localStorage.setItem('landing-accent-theme', nextEnabled ? 'amber' : 'violet');
    window.dispatchEvent(
      new CustomEvent('planitt-landing-accent-change', {
        detail: nextEnabled ? 'amber' : 'violet',
      }),
    );
  };

  const navItems = isLanding
    ? [
        { name: 'Signals', href: '/#live-signals' },
        { name: 'AI', href: '/#ai' },
        { name: 'Markets', href: '/#showcase' },
        { name: 'Academy', href: '/#academy' },
        { name: 'Calculators', href: '/calculators' },
      ]
    : [
        { name: 'Services', href: '/main#services' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Portfolio', href: '/main#portfolio' },
        { name: 'About Us', href: '/main#about' },
        { name: 'Testimonials', href: '/main#testimonials' },
        { name: 'Join Us', href: '/careers' },
      ];

  return (
    <header
      className={`fixed top-0 z-50 w-full backdrop-blur-xl transition-colors duration-300 ${
        isLanding
          ? 'border-b border-white/10 bg-[#0B0F19]/45'
          : 'border-b border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-black/70'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={isLanding ? '/' : '/main'} aria-label="Planitt Home" className="flex items-center">
            <Image
              src={theme === 'dark' ? '/planitt-app-silver.png' : '/planitt-app-black.png'}
              alt="Planitt Logo"
              width={120}
              height={40}
              priority
              className="h-10 w-auto transition-transform duration-200 hover:scale-105"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-gradient-underline font-medium transition-colors ${
                    isLanding
                      ? 'text-gray-200 hover:text-white'
                      : 'text-gray-700 hover:text-[#b78622] dark:text-gray-300 dark:hover:text-zinc-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {isLanding ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleLandingAccent}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    landingAccentEnabled
                      ? 'border-[#f5b544]/30 bg-[#f97316]/15 text-[#ffd27a]'
                      : 'border-white/10 bg-white/5 text-gray-200 hover:border-white/20 hover:bg-white/10'
                  }`}
                  aria-label="Toggle landing accent theme"
                  title="Toggle landing accent theme"
                >
                  <Flame size={18} />
                </button>
                <Link
                  href="/main"
                  className="inline-flex items-center justify-center rounded-full bg-[#7C5CFF] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
                >
                  Continue to Services
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <SearchBar />
                <button
                  suppressHydrationWarning
                  onClick={toggleTheme}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {isLanding ? (
              <button
                type="button"
                onClick={toggleLandingAccent}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition ${
                  landingAccentEnabled
                    ? 'border-[#f5b544]/30 bg-[#f97316]/15 text-[#ffd27a]'
                    : 'border-white/10 text-gray-200'
                }`}
                aria-label="Toggle landing accent theme"
                title="Toggle landing accent theme"
              >
                <Flame size={18} />
              </button>
            ) : (
              <button
                suppressHydrationWarning
                onClick={toggleTheme}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isLanding ? 'text-gray-200' : 'text-gray-700 dark:text-gray-300'}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`border-t md:hidden ${isLanding ? 'border-white/10' : 'border-gray-200 dark:border-gray-800'}`}
          >
            <div className="space-y-3 px-4 py-4">
              {!isLanding && (
                <div className="mb-3">
                  <SearchBar />
                </div>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 ${
                    isLanding
                      ? 'text-gray-200 hover:bg-white/5'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {isLanding && (
                <div className="mt-2 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toggleLandingAccent();
                      setIsMenuOpen(false);
                    }}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                      landingAccentEnabled
                        ? 'border-[#f5b544]/30 bg-[#f97316]/15 text-[#ffd27a]'
                        : 'border-white/10 bg-white/5 text-white'
                    }`}
                  >
                    <Flame size={16} />
                    Toggle Accent Theme
                  </button>
                  <Link
                    href="/main"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#7C5CFF] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Continue to Services
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
