'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="w-full text-center text-sm text-neutral-500 dark:text-neutral-400 py-6"
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <p className="px-4">
        © {new Date().getFullYear()} Edgar Demeude — All rights reserved.  
        <Link href="/legal-notice" className="underline hover:opacity-70 ml-1">
          Legal notice
        </Link>
      </p>
    </footer>
  );
}
