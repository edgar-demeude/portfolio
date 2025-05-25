import { useState, useEffect, useRef, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type HoverFillTextProps = {
  children: ReactNode;
  className?: string;
  active?: boolean;
};

export default function HoverFillText({ children, className, active = false }: HoverFillTextProps) {
  const [hovered, setHovered] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState(active ? '0%' : '100%');
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const timeoutId = useRef<number | null>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : null;

  function startHoverAnimation() {
    if (active) return;

    const el = ref.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPositionX = '100%';

    void el.offsetHeight; // trigger reflow

    el.style.transition = 'background-position 0.4s ease-in-out';
    el.style.backgroundPositionX = '0%';

    setBackgroundPos('0%');
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nettoyer l'ancien timeout
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (active) {
      setHovered(true);
      setBackgroundPos('0%');
      el.style.transition = 'none';
      el.style.backgroundPositionX = '0%';
    } else {
      setHovered(false);
      setBackgroundPos('100%');
      el.style.transition = 'none';
      el.style.backgroundPositionX = '100%';
    }
  }, [active]);

  useEffect(() => {
    if (!mounted) return; // PAS d'animation avant le montage

    const el = ref.current;
    if (!el) return;

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (hovered) {
      startHoverAnimation();
    } else {
      if (active) {
        el.style.transition = 'none';
        el.style.backgroundPositionX = '0%';
        setBackgroundPos('0%');
        return;
      }

      el.style.transition = 'background-position 0.6s ease-in-out';
      el.style.backgroundPositionX = '-100%';

      timeoutId.current = window.setTimeout(() => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.backgroundPositionX = '100%';
        setBackgroundPos('100%');
        timeoutId.current = null;
      }, 500);
    }
  }, [hovered, active, mounted]);

  if (!mounted) {
    return <span style={{ opacity: 0 }}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      onMouseEnter={() => {
        if (!active) {
          if (timeoutId.current !== null) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
          }
          startHoverAnimation();
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!active) {
          if (timeoutId.current !== null) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
          }
          setHovered(false);
        }
      }}
      className={className}
      style={{
        fontWeight: 500,
        backgroundImage: currentTheme === 'dark' ? backgroundImageDark : backgroundImageLight,
        backgroundSize: '300% 100%',
        backgroundPositionX: backgroundPos,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'pointer',
        display: 'inline-block',
        // la transition CSS n'existe que si monté (évite flash)
        transition: mounted && !active ? 'background-position 0.4s ease-in-out' : 'none',
      }}
    >
      {children}
    </span>
  );
}

const backgroundImageLight =
  'linear-gradient(to right, #000000 33.333%,#aaaaaa 33.333%,#aaaaaa 66.666%, #aaaaaa 100%)';
const backgroundImageDark =
  'linear-gradient(to right, #fafafa 33.333%,#3b3b3b 33.333%, #3b3b3b 66.666%, #3b3b3b 100%)';
