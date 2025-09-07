'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeBtn from './themeBtn';
import HoverFillText from './hoverFillText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../../../translations';
import { useLanguage } from './languageContext';
import LanguageBtn from './languageBtn';

const SCROLL_THRESHOLD = 50;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ticking = useRef(false);
  const pathname = usePathname();
  const { language } = useLanguage();

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
      <nav className="hidden [@media(min-width:1050px)]:flex flex-1 justify-end items-center space-x-6">
        <Link href="/research" className={pathname.startsWith('/research') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/research')}>
            {translations[language].research}
          </HoverFillText>
        </Link>
        <Link href="/photography" className={pathname.startsWith('/photography') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/photography')}>
            {translations[language].photography}
          </HoverFillText>
        </Link>
        <Link href="/videos" className={pathname.startsWith('/videos') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/videos')}>
            {translations[language].videos}
          </HoverFillText>
        </Link>
        <Link href="/music" className={pathname.startsWith('/music') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/music')}>
            {translations[language].music}
          </HoverFillText>
        </Link>
        <Link href="/about" className={pathname.startsWith('/about') ? 'font-semibold' : ''}>
          <HoverFillText active={pathname.startsWith('/about')}>
            {translations[language].about}
          </HoverFillText>
        </Link>

        <div className="flex items-center space-x-4">
          <LanguageBtn />
          <ThemeBtn />
        </div>
      </nav>

      {/* Mobile burger */}
      <div className="flex items-center space-x-2 [@media(min-width:1050px)]:hidden">
        <LanguageBtn />
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-3xl space-y-8"
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 p-2"
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      >
        <X size={32} />
      </button>

      {/* Links with smooth stagger */}
      {[
        // { href: '/', label: 'Home' },
        { href: '/research', label: 'Research' },
        { href: '/photography', label: 'Photography' },
        { href: '/videos', label: 'Videos' },
        { href: '/music', label: 'Music' },
        { href: '/about', label: 'About' },
      ].map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Link
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="relative group"
          >
            <span className="transition-colors">{item.label}</span>
            {/* Subtle underline animation */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
}