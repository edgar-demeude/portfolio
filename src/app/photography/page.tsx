'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '../components/footer';

type Collection = {
  folder: string;
  title: string;
  previewImage: string;
};

// Container variant for cascade effect
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }, // delay between items
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

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Page Title */}
      <div className="text-center mb-8">
        <span className="text-2xl font-medium capitalize">Collections</span>
      </div>

      {/* Collections Grid with animation */}
      <motion.div
        className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {collections.map((collection, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="w-full"
          >
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

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
