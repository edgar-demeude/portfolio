'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import useLenisScroll from '@/app/hooks/useLenisScroll';
import PhotoGrid from '../../components/photoGrid';
import Lightbox from '../../components/lightbox';
import Footer from '@/app/components/footer';
import { formatFolderName } from '@/app/utils/formatFolderName';

type Collection = {
  folder: string;
  images: string[];
  thumbs: string[];
};

// In-memory cache for collections
let galleryCache: Record<string, Collection> = {};

function GalleryContent() {
  const params = useSearchParams();
  const collectionName = params.get('collection');
  const [collection, setCollection] = useState<Collection | null>(null);
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    if (galleryCache[collectionName]) {
      // use cached data
      setCollection(galleryCache[collectionName]);
    } else {
      fetch('/collections.json')
        .then((res) => res.json())
        .then((data: Collection[]) => {
          const found = data.find(c => c.folder === collectionName);
          if (found) {
            galleryCache[collectionName] = found; // save to cache
            setCollection(found);
          }
        });
    }
  }, [collectionName]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!collectionName) return <p className="text-center mt-10">No collection selected.</p>;
  if (!collection) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen px-2 sm:px-6 md:px-12 lg:px-24">
      <div className="flex-1 text-center mb-12">
        <span className="text-2xl font-medium capitalize">
          {formatFolderName(collection.folder)}
        </span>
      </div>

      <PhotoGrid
        photos={collection.thumbs}
        onPhotoClick={setSelectedIndex}
        className=""
      />

      {selectedIndex !== null && (
        <Lightbox
          photos={collection.images}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() =>
            setSelectedIndex(i => (i! - 1 + collection.images.length) % collection.images.length)
          }
          onNext={() => setSelectedIndex(i => (i! + 1) % collection.images.length)}
        />
      )}

      {/* Scroll top button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`
          fixed bottom-6 left-1/2 -translate-x-1/2
          w-16 h-16 sm:w-12 sm:h-12 flex items-center justify-center rounded-full
          bg-black/70 text-white backdrop-blur shadow-lg
          transition-all duration-500 ease-in-out
          ${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          hover:bg-black hover:scale-105 hover:w-20
        `}
      >
        ↑
      </button>

      <Footer />
    </main>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
