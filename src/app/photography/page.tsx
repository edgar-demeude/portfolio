'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Collection = {
  folder: string;
  title: string;
  previewImage: string;
};

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

  useEffect(() => {
    fetch('/collections.json')
      .then((res) => res.json())
      .then(setCollections);
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24">
      <motion.div
        className="
          max-w-6xl mx-auto
          grid grid-cols-1 sm:grid-cols-2 gap-6
          md:flex md:flex-wrap md:justify-start md:gap-6
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {collections.map((collection, index) => (
          <motion.div
            key={index}
            className="
              cursor-pointer
              w-full sm:w-auto md:w-64
              space-y-2
              hover:opacity-100 transition-opacity duration-500 ease-in-out
              active:scale-95
            "
            variants={itemVariants}
          >
            <Link href={`/photography/gallery?collection=${encodeURIComponent(collection.folder)}`}>
              {collection.previewImage && (
                <motion.img
                  src={collection.previewImage}
                  alt={`Preview of ${collection.title}`}
                  className="w-full rounded-lg object-cover aspect-w-4 aspect-h-3"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                />
              )}
              <motion.h2 className="text-lg font-medium" variants={itemVariants}>
                {collection.title}
              </motion.h2>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
