'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useLenisScroll from '@/app/hooks/useLenisScroll';

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

export default function CollectionsPageClient() {
  const [collections, setCollections] = useState<
    { title: string; images: string[]; folder: string }[]
  >([]);
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    async function fetchCollections() {
      const res = await fetch('/api/collections');
      const data = await res.json();
      setCollections(data);
    }
    fetchCollections();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 transition-colors duration-300">
      <motion.div
        className="max-w-6xl mx-auto flex flex-wrap gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {collections.map((collection, index) => (
          <motion.a
            key={index}
            href={`/collections/${collection.folder}`}
            className="w-64 space-y-2 hover:opacity-100 transition-opacity duration-500 ease-in-out"
            variants={itemVariants}
          >
            {collection.images.length > 0 && (
              <motion.img
                src={collection.images[0]}
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
          </motion.a>
        ))}
      </motion.div>

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
