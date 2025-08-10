'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeBtn from './themeBtn';
import HoverFillText from './hoverFillText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatCollectionName } from '../utils/formatCollectionName';

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

  return (
    <header
      id="navbar"
      className={`
        flex items-center px-14 sticky top-0 z-20 text-2xl
        transition-padding duration-700 ease-out
        transition-bg-color duration-700 ease-out
        ${isScrolled ? 'pt-2 pb-1' : 'pt-10 pb-9'}
      `}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="flex-1">
        <Link href="/" className="text-2xl font-medium inline-block">
          Edgar Demeude
        </Link>
      </div>

      <div className="flex-1 text-center">
        {currentCollection && (
          <span className="text-xl font-medium">
            {formatCollectionName(currentCollection)}
          </span>
        )}
      </div>

      <div className="flex-1 flex justify-end items-center space-x-4">
        <nav className="space-x-6">
          {pathname === '/collections' ? (
            <span className="font-medium capitalize">Collections</span>
          ) : (
            <Link href="/collections">
              <HoverFillText>Collections</HoverFillText>
            </Link>
          )}
          {pathname === '/about' ? (
            <span className="font-medium capitalize">About</span>
          ) : (
            <Link href="/about">
              <HoverFillText>About</HoverFillText>
            </Link>
          )}
        </nav>
        <ThemeBtn />
      </div>
    </header>
  );
}
