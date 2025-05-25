'use client';
import { useState, useEffect, useRef } from 'react';
import ThemeBtn from './themeBtn';
import HoverFillText from './hoverFillText';
import Link from 'next/link';

const SCROLL_THRESHOLD = 50

type HeaderProps = {
  collection: string;
  onSelect: (collection: string) => void;
  onTitleClick: () => void;
};

export default function Header({ collection, onSelect, onTitleClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);

  const formatted = collection === 'all' ? 'All' : collection[0].toUpperCase() + collection.slice(1);

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
        id="main-header"
        className={`
            flex items-center px-14 sticky top-0 z-20 text-2xl
            transition-padding duration-700 ease-out
            transition-bg-color duration-700 ease-out
            shadow-lg
            bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-80
            ${isScrolled ? 'pt-2 pb-1' : 'pt-10 pb-10'}
        `}
        style={{ backdropFilter: 'blur(10px)' }}
    >


      <div className="flex-1">
        <Link href="/" className="text-2xl font-medium inline-block">
          Edgar Demeude
        </Link>
      </div>
      <div className="flex-1 text-center">{formatted}</div>
      <div className="flex-1 flex justify-end items-center space-x-4">
        <nav className="space-x-6">
          {['Collections', 'About'].map((name) => (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className="capitalize"
            >
              <HoverFillText>{name}</HoverFillText>
            </button>
          ))}
        </nav>
        <ThemeBtn />
      </div>
    </header>
  );
}
