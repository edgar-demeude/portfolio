'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname?.split('/').filter(Boolean) || [];

  // Only show breadcrumb if exactly two segments (e.g., /Photography/Gallery)
  if (segments.length !== 2) return null;

  const [firstSegment, lastSegment] = segments;

  const formatName = (segment: string) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="mb-8 px-2 sm:px-6 md:px-12 lg:px-24 flex items-center gap-4">
      {/* Breadcrumb on the left */}
      <nav className="text-gray-400 text-sm flex items-center gap-1">
        <Link href={`/${firstSegment}`} className="hover:text-white transition-colors">
          {formatName(firstSegment)}
        </Link>
        <span>/</span>
        <span className="text-white">{formatName(lastSegment)}</span>
      </nav>

      {/* Main title: last segment, acts as collection title */}
      <h1 className="text-2xl font-medium capitalize text-white">
        {formatName(lastSegment)}
      </h1>
    </div>
  );
}
