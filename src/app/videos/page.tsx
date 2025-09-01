'use client';

import Link from 'next/link';

export default function UnderConstructionPage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] bg-black text-white">
      {/* Adjust min-h based on your navbar height (here 80px) */}
      <h1 className="text-4xl font-medium mb-4">Page Under Construction</h1>
      <p className="mb-6 text-center text-gray-400">
        This page is not ready yet. Please check back later.
      </p>
      <Link
        href="/"
        className="text-white underline hover:opacity-70 transition-opacity duration-300"
      >
        Go back home
      </Link>
    </main>
  );
}
