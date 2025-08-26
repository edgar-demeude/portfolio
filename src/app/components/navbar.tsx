'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeBtn from './themeBtn';
import HoverFillText from './hoverFillText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatCollectionName } from '../utils/formatCollectionName';
import { Menu, X } from 'lucide-react';

const SCROLL_THRESHOLD = 50;

function getCurrentCollection(pathname: string): string | undefined {
  const parts = pathname.split('/');
  if (parts[1] === 'collections' && parts[2]) {
    return decodeURIComponent(parts[2]);
  }
  return undefined;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const currentCollection = getCurrentCollection(pathname);

  const isCollectionsActive =
    pathname === '/collections' || pathname.startsWith('/collections/');
  const isAboutActive = pathname === '/about' || pathname.startsWith('/about/');

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

      {/* Center (desktop only) */}
      <div className="hidden md:flex flex-1 justify-center">
        {currentCollection && (
          <span className="text-2xl font-medium">
            {formatCollectionName(currentCollection)}
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4 z-40">
        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6">
          {isCollectionsActive ? (
            <HoverFillText active className="font-medium">
              Collections
            </HoverFillText>
          ) : (
            <Link href="/collections">
              <HoverFillText className="font-medium">Collections</HoverFillText>
            </Link>
          )}

          {isAboutActive ? (
            <HoverFillText active className="font-medium">
              About
            </HoverFillText>
          ) : (
            <Link href="/about">
              <HoverFillText className="font-medium">About</HoverFillText>
            </Link>
          )}
        </nav>

        <ThemeBtn />

        {/* Burger mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Full-screen mobile menu*/}
      <div
        className={`
          fixed inset-0 min-h-screen min-w-full
          flex flex-col items-center justify-center
          text-3xl space-y-10
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible z-50' : 'opacity-0 invisible'}
        `}
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <button
          className="absolute top-6 right-6 p-2"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        <Link href="/collections" onClick={() => setIsOpen(false)}>
          Collections
        </Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
      </div>
    </header>
  );
}
