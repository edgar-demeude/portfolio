'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeBtn from './themeBtn';
import HoverFillText from './hoverFillText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SCROLL_THRESHOLD = 50;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const ticking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > SCROLL_THRESHOLD;
          setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`
        flex items-center justify-between px-6 md:px-14 sticky top-0 z-30 text-2xl
        transition-all duration-700 ease-out
        ${isScrolled ? 'pt-3 pb-2' : 'pt-6 md:pt-10 pb-4 md:pb-9'}
      `}
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
        transition: 'background-color 0.7s ease, color 0.7s ease, padding 0.7s ease',
      }}
    >
      {/* Left: Name */}
      <Link href="/" className="text-2xl font-medium z-40">
        Edgar Demeude
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex flex-1 justify-end items-center space-x-6">
        <Link href="/research" className={pathname.startsWith('/research') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/research')}>Research</HoverFillText>
        </Link>
        <Link href="/photography" className={pathname.startsWith('/photography') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/photography')}>Photography</HoverFillText>
        </Link>
        <Link href="/videos" className={pathname.startsWith('/videos') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/videos')}>Videos</HoverFillText>
        </Link>
        <Link href="/music" className={pathname.startsWith('/music') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/music')}>Music</HoverFillText>
        </Link>
        <Link href="/about" className={pathname.startsWith('/about') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/about')}>About</HoverFillText>
        </Link>

        {/* Language & Theme */}
        {/* <button aria-label="Change language" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300">
          En
        </button> */}
        <ThemeBtn />
      </nav>

      {/* Mobile burger */}
      <div className="md:hidden flex items-center space-x-2">
        <ThemeBtn />
        <button className="p-2" onClick={() => setIsOpen(prev => !prev)} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-3xl space-y-6"
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-2 text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            <Link href="/" onClick={() => setIsOpen(false)} className="py-3 text-white">Home</Link>
            <Link href="/research" onClick={() => setIsOpen(false)} className="py-3 text-white">Research</Link>

            {/* Projects submenu */}
            <div className="w-full flex flex-col items-center">
              <button
                className="flex items-center space-x-2 py-3 font-medium text-white"
                onClick={() => setIsProjectsOpen(prev => !prev)}
              >
                <span>Projects</span>
                {isProjectsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {isProjectsOpen && (
                  <motion.div
                    key="projects-submenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center mt-3 space-y-3 pl-6 border-l border-white"
                  >
                    <Link href="/photography" onClick={() => setIsOpen(false)} className="text-white">Photography</Link>
                    <Link href="/videos" onClick={() => setIsOpen(false)} className="text-white">Videos</Link>
                    <Link href="/music" onClick={() => setIsOpen(false)} className="text-white">Music</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" onClick={() => setIsOpen(false)} className="py-3 text-white">About</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
