'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '../components/footer';

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

  useEffect(() => {
    fetch('/collections.json')
      .then((res) => res.json())
      .then(setCollections);
  }, []);

  // Group collections by year
  const collectionsByYear: Record<string, Collection[]> = {};
  collections.forEach((c) => {
    const year = c.year?.toString() || 'Unknown';
    if (!collectionsByYear[year]) collectionsByYear[year] = [];
    collectionsByYear[year].push(c);
  });

  // Sort years: "On going" first, then descending numeric years
  const sortedYears = Object.keys(collectionsByYear).sort((a, b) => {
    if (a.toLowerCase() === 'on going') return -1;
    if (b.toLowerCase() === 'on going') return 1;
    return Number(b) - Number(a);
  });

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">Collections</span>
      </div>

      {sortedYears.map((year) => (
        <section
          key={year}
          className="mb-16 sm:mb-20 md:mb-24" // larger separation between years
        >
          {/* Year Divider (Left-aligned, responsive) */}
          <div className="flex items-center mb-8 sm:mb-10">
            <span className="text-base sm:text-sm italic text-gray-800 dark:text-gray-300 pr-4 whitespace-nowrap">
              {year}
            </span>
            <div
              className="flex-1 h-px bg-gray-300 dark:bg-neutral-700"
              style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            />
          </div>

          {/* Collections grid for this year */}
          <motion.div
            className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {collectionsByYear[year].map((collection, index) => (
              <motion.div key={index} variants={itemVariants} className="w-full">
                <Link
                  href={`/photography/gallery?collection=${encodeURIComponent(collection.folder)}`}
                >
                  <div className="group cursor-pointer flex flex-col space-y-4">
                    <div className="overflow-hidden w-full aspect-[3/2] bg-neutral-900">
                      <img
                        src={collection.previewImage}
                        alt={`Preview of ${collection.title}`}
                        className="w-full h-full object-cover photo-hover"
                      />
                    </div>
                    <h2 className="text-center text-xl font-medium tracking-wide group-hover:opacity-80 transition-opacity duration-300">
                      {collection.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}

      {/* Footer */}
      <Footer />
    </main>
  );
}
