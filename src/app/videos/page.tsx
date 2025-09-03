'use client';

import { useState, useEffect } from 'react';
import { motion, Variants, easeOut } from 'framer-motion';
import Footer from '../components/footer';
import useLenisScroll from '@/app/hooks/useLenisScroll';
import Image from 'next/image';

type Video = {
  title: string;
  url: string;
  previewImage: string;
  category: string;
};

// Container variant for cascade animation
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Each item fade-in + slight scale
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

const videos: Video[] = [
  {
    title: 'Finding myself',
    url: 'https://youtu.be/bR-Gu0Rx-c0?si=13ucmZF1yIyoKAKC',
    previewImage: '/thumbnails/finding.jpg',
    category: 'Shortfilms',
  },
  
  {
    title: 'Solitude',
    url: 'https://youtu.be/lK49cEUyGBs?si=sUJh4cmwhnFJaBla',
    previewImage: '/thumbnails/solitude.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'North of Europe',
    url: 'https://youtu.be/A95ptcbPvns?si=_R1YDXGAYrsXd2G1',
    previewImage: '/thumbnails/north.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'Turino',
    url: 'https://youtu.be/CS7krXX4GbY?si=ognEnaWEWxQGU2mD',
    previewImage: '/thumbnails/turino.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'Walk in the cemetery',
    url: 'https://youtu.be/KiCnaK_F0gc?si=na-9AfMDAEmHgelk',
    previewImage: '/thumbnails/cemetery.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'Sunny winter',
    url: 'https://youtu.be/prOVrN-E0DE?si=zO0prUXEZkuYgBoz',
    previewImage: '/thumbnails/sunnywinter.jpg',
    category: 'Moving postcards',
  },
  {
    title: '25 days in Japan',
    url: 'https://youtu.be/LWOSKs3yeAU?si=fSRrSM1CsK5K1lnw',
    previewImage: '/thumbnails/25days.jpg',
    category: 'Documentaries',
  },
];

export default function VideosPage() {
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Group videos by category
  const videosByCategory: Record<string, Video[]> = {};
  videos.forEach(v => {
    const cat = v.category || 'Other';
    if (!videosByCategory[cat]) videosByCategory[cat] = [];
    videosByCategory[cat].push(v);
  });

  const sortedCategories = Object.keys(videosByCategory);

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">Videos</span>
      </div>

      {sortedCategories.map(category => (
        <section key={category} className="mb-16 sm:mb-20 md:mb-24">
          {/* Category Divider */}
          <div className="flex items-center mb-8 sm:mb-10">
            <span className="text-base sm:text-sm italic text-gray-800 dark:text-gray-300 pr-4 whitespace-nowrap">
              {category}
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-neutral-700" />
          </div>

          {/* Videos Grid */}
          <motion.div
            className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {videosByCategory[category].map((video, index) => (
              <motion.div key={index} variants={itemVariants} className="w-full">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer flex flex-col space-y-4"
                >
                  <div className="overflow-hidden w-full aspect-[16/9] bg-neutral-900">
                    <Image 
                      src={video.previewImage}
                      alt={`Preview of ${video.title}`}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover photo-hover"
                    />
                  </div>
                  <h2 className="text-center text-xl font-medium group-hover:opacity-80 transition-opacity duration-300">
                    {video.title}
                  </h2>
                </a>
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
