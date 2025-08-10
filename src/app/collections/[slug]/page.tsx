'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PhotoGrid from '@/app/components/photoGrid';
import useLenisScroll from '@/app/hooks/useLenisScroll';

interface Collection {
  folder: string;
  title: string;
  previewImage: string;
  images: string[];
}

export default function CollectionPage() {
  const { slug } = useParams();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Charger toutes les collections au montage
  useEffect(() => {
    fetch('/collections.json')
      .then((res) => res.json())
      .then(setCollections);
  }, []);

  // Quand le slug ou collections changent, trouver la collection correspondante et mettre à jour photos
  useEffect(() => {
    if (!slug || collections.length === 0) return;
    const collection = collections.find((c) => c.folder === slug);
    if (collection) {
      setPhotos(collection.images);
    } else {
      setPhotos([]); // slug non trouvé
    }
  }, [slug, collections]);

  // Gestion bouton scroll top
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 px-6 py-12">
      <main>
        <PhotoGrid photos={photos} />
      </main>
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
    </div>
  );
}
