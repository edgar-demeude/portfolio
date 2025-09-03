// hoverFillText.tsx
import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
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

  const startHoverAnimation = useCallback(() => {
    if (active) return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.backgroundPositionX = '100%';
    void el.offsetHeight; // trigger reflow
    el.style.transition = 'background-position 0.4s ease-in-out';
    el.style.backgroundPositionX = '0%';
    setBackgroundPos('0%');
  }, [active]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (active) {
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
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (hovered) {
      startHoverAnimation();
    } else if (!active) {
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
  }, [hovered, active, mounted, startHoverAnimation]);

  if (!mounted) return <span style={{ opacity: 0 }}>{children}</span>;

  return (
    <span
      ref={ref}
      onMouseEnter={() => {
        if (!active) {
          if (timeoutId.current !== null) clearTimeout(timeoutId.current);
          startHoverAnimation();
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!active) {
          if (timeoutId.current !== null) clearTimeout(timeoutId.current);
          setHovered(false);
        }
      }}
      className={className}
      style={
        active
          ? {
              fontWeight: 500,
              color: currentTheme === 'dark' ? '#fff' : '#000',
              cursor: 'pointer',
              display: 'inline-block',
            }
          : {
              fontWeight: 500,
              backgroundImage: currentTheme === 'dark' ? backgroundImageDark : backgroundImageLight,
              backgroundSize: '300% 100%',
              backgroundPositionX: backgroundPos,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              display: 'inline-block',
              transition: mounted ? 'background-position 0.4s ease-in-out' : 'none',
            }
      }
    >
      {children}
    </span>
  );
}

const backgroundImageLight =
  'linear-gradient(to right, #000000 33.333%,#aaaaaa 33.333%,#aaaaaa 66.666%, #aaaaaa 100%)';
const backgroundImageDark =
  'linear-gradient(to right, #fafafa 33.333%,#3b3b3b 33.333%, #3b3b3b 66.666%, #3b3b3b 100%)';
