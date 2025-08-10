'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhotoGrid from '@/app/components/photoGrid';
import useLenisScroll from '@/app/hooks/useLenisScroll';

interface Collection {
  folder: string;
  title: string;
  previewImage: string;
  images: string[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetch('/collections.json')
      .then((res) => res.json())
      .then(setCollections);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedCollection = collections.find(c => c.folder === selectedFolder);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 transition-colors duration-300 relative">

      {/* Bouton croix pour revenir à la liste */}
      {selectedCollection && (
        <button
          onClick={() => setSelectedFolder(null)}
          aria-label="Back to collections"
          className="
            fixed top-20 left-1/2 -translate-x-1/2 z-50
            w-16 h-16
            rounded-full
            bg-black/80
            flex items-center justify-center
            text-white
            text-4xl
            hover:bg-black
            shadow-lg
            transition-colors duration-300
          "
          type="button"
        >
          x
        </button>
      )}

      {/* Affichage liste collections */}
      {!selectedCollection && (
        <motion.div
          className="max-w-6xl mx-auto flex flex-wrap gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedFolder(collection.folder)}
              className="cursor-pointer w-64 space-y-2 hover:opacity-100 transition-opacity duration-500 ease-in-out"
              variants={itemVariants}
            >
              {collection.previewImage && (
                <motion.img
                  src={collection.previewImage}
                  alt={`Preview of ${collection.title}`}
                  className="h-48 w-full rounded-lg object-cover"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
              <motion.h2 className="text-lg font-medium" variants={itemVariants}>
                {collection.title}
              </motion.h2>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Affichage photos de la collection sélectionnée */}
      {selectedCollection && (
        <div className=" mx-auto mt-6">
          <PhotoGrid photos={selectedCollection.images} />
        </div>
      )}

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
