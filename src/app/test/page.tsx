'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ThemeBtn from '../themeBtn';

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [collection, setCollection] = useState('all');

  useEffect(() => {
    fetch(`/api/photos?collection=${collection}`)
      .then(res => res.json())
      .then(setPhotos);
  }, [collection]);

  return (
        <div
        className="min-h-screen transition-colors duration-300"
        style={{
            background: 'var(--background)',
            color: 'var(--foreground)',
        }}
        >
        <header className="flex items-center px-4 pt-10 pb-6 sticky top-0 z-10">
        <div className="flex-1 flex items-center font-semibold">
            Edgar Demeude
        </div>

        <div className="flex-1 flex justify-center font-semibold">
            {collection === 'all' ? 'All' : collection.charAt(0).toUpperCase() + collection.slice(1)}
        </div>

        <div className="flex-1 flex items-center justify-end space-x-4">
            <nav className="space-x-6 font-semibold">
            <button onClick={() => setCollection('all')}>All</button>
            <button onClick={() => setCollection('japan')}>Japan</button>
            <button onClick={() => setCollection('france')}>France</button>
            </nav>
            <ThemeBtn />
        </div>
        </header>
        <main className="p-4">
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((src, idx) => (
                <div key={idx} className="overflow-hidden">
                <Image
                    src={src}
                    alt={`Photo ${idx}`}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                />
                </div>
            ))}
            </div>
        </main>
        </div>
  );
}
