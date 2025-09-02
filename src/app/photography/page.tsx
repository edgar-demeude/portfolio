'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '../components/footer';
import useLenisScroll from '@/app/hooks/useLenisScroll';

type Collection = {
  folder: string;
  title: string;
  previewImage: string;
  year: string | number;
  images: string[];
};

// Container variant for cascade animation
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Each item fade-in + slight scale
const itemVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetch('/collections.json')
      .then(res => res.json())
      .then(setCollections);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Group collections by year
  const collectionsByYear: Record<string, Collection[]> = {};
  collections.forEach(c => {
    const year = c.year?.toString() || 'Unknown';
    if (!collectionsByYear[year]) collectionsByYear[year] = [];
    collectionsByYear[year].push(c);
  });

  // Sort years: "ongoing" first, then descending numeric years
  const sortedYears = Object.keys(collectionsByYear).sort((a, b) => {
    if (a.toLowerCase() === 'ongoing') return -1;
    if (b.toLowerCase() === 'ongoing') return 1;
    return Number(b) - Number(a);
  });

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">Collections</span>
      </div>

      {sortedYears.map(year => (
        <section key={year} className="mb-16 sm:mb-20 md:mb-24">
          {/* Year Divider */}
          <div className="flex items-center mb-8 sm:mb-10">
            <span className="text-base sm:text-sm italic year-text pr-4 whitespace-nowrap">{year}</span>
            <div className="flex-1 thin-separator" />
          </div>

          {/* Collections Grid */}
          <motion.div
            className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {collectionsByYear[year].map((collection, index) => (
              <motion.div key={index} variants={itemVariants} className="w-full">
                <Link href={`/photography/gallery?collection=${encodeURIComponent(collection.folder)}`}>
                  <div className="group cursor-pointer flex flex-col space-y-4">
                    <div className="overflow-hidden w-full aspect-[3/2] bg-neutral-900">
                      <img
                        src={collection.previewImage}
                        alt={`Preview of ${collection.title}`}
                        className="w-full h-full object-cover photo-hover"
                      />
                    </div>
                    <h2 className="text-center text-xl font-medium group-hover:opacity-80 transition-opacity duration-300">
                      {collection.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}

      {/* Scroll to top button */}
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
