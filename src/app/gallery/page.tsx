'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLenisScroll from '@/app/hooks/useLenisScroll';
import PhotoGrid from '../components/photoGrid';
import { formatCollectionName } from '../utils/formatCollectionName';

type Collection = {
  folder: string;
  images: string[];
};

export default function GalleryPage() {
  const params = useSearchParams();
  const collectionName = params.get('collection');
  const [collection, setCollection] = useState<Collection | null>(null);

  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (collectionName) {
      fetch('/collections.json')
        .then((res) => res.json())
        .then((data: Collection[]) => {
          const found = data.find(c => c.folder === collectionName);
          if (found) setCollection(found);
        });
    }
  }, [collectionName]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!collectionName) {
    return <p className="text-center mt-10">No collection selected.</p>;
  }

  if (!collection) {
    return <p className="text-center mt-10"></p>;
  }

  return (
    <main className="min-h-screen px-6 pb-12 md:px-12 lg:px-24">
      <div className="flex-1 text-center mb-8">
        {collection.folder && (
            <span className="text-2xl font-medium capitalize">
            {formatCollectionName(collection.folder)}
            </span>
        )}
        </div>
      <PhotoGrid photos={collection.images} />

      {/* Bouton scroll top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-12 left-1/2 -translate-x-1/2
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-black/70
          text-white
          backdrop-blur
          shadow-lg
          transition-all duration-500 ease-in-out
          ${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          hover:bg-black hover:w-20 hover:scale-105
        `}
      >
        ↑
      </button>
    </main>
  );
}
