'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type HoverFillTextProps = {
  children: ReactNode;
  className?: string;
};

export default function HoverFillText({ children, className }: HoverFillTextProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const timeoutId = useRef<number | null>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : null;

  // Fonction pour lancer l'animation hover sans délai
  function startHoverAnimation() {
    const el = ref.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPositionX = '100%';

    void el.offsetHeight;

    el.style.transition = 'background-position 0.4s ease-in-out';
    el.style.backgroundPositionX = '0%';
  }

  const backgroundImageLight = 'linear-gradient(to right, #000000 33.333%,#aaaaaa 33.333%,#aaaaaa 66.666%, #aaaaaa 100%)';
  const backgroundImageDark = 'linear-gradient(to right, #fafafa 33.333%,#3b3b3b 33.333%, #3b3b3b 66.666%, #3b3b3b 100%)';

  // Le second useEffect est appelé à chaque rendu, jamais conditionnellement
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (hovered) {
      startHoverAnimation();
    } else {
      el.style.transition = 'background-position 0.6s ease-in-out';
      el.style.backgroundPositionX = '-100%';

      timeoutId.current = window.setTimeout(() => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.backgroundPositionX = '100%';
        timeoutId.current = null;
      }, 500);
    }
  }, [hovered]);

  // Ici on retourne un placeholder transparent pendant le montage (mounted === false)
  if (!mounted) {
    return <span style={{ opacity: 0 }}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      onMouseEnter={() => {
        startHoverAnimation();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        fontWeight: 500,
        backgroundImage: currentTheme === 'dark' ? backgroundImageDark : backgroundImageLight,
        backgroundSize: '300% 100%',
        backgroundPositionX: '100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
