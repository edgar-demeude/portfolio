'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/footer';
import useLenisScroll from '@/app/hooks/useLenisScroll';

type Video = {
  title: string;
  url: string;
  previewImage: string;
  category: string;
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

const videos: Video[] = [
  {
    title: 'YOASOBI「Biri-Biri」',
    url: 'https://youtu.be/hp4vhw2f-hs?si=7bpW5zI6Mr4ejkB7',
    previewImage: '/thumbnails/biribiri.jpg',
    category: 'Drums',
  },
  {
    title: 'Polyphia - Chimera (feat. Lil West)',
    url: 'https://youtu.be/U3PoLVVbgJo?si=GDsj2JVlT75ZG-Zg',
    previewImage: '/thumbnails/chimera.jpg',
    category: 'Drums',
  },
  {
    title: 'Yoasobi - Idol (Tim Henson version)',
    url: 'https://youtu.be/w4o8orJPgBc?si=qWds_k-bIF_33miz',
    previewImage: '/thumbnails/idol.jpg',
    category: 'Guitar',
  },
  {
    title: 'Polyphia - Playing God (Full band cover)',
    url: 'https://youtu.be/JisvyFn_46k?si=8SBa__RFFe4ZtqgN',
    previewImage: '/thumbnails/playinggod.jpg',
    category: 'Guitar',
  },
  {
    title: 'Liftoff solo',
    url: 'https://youtu.be/10SvhmvoObk?si=rOI6YBPBA1UaX7fS',
    previewImage: '/thumbnails/liftoff.jpg',
    category: 'Guitar',
  },
  {
    title: 'Polyphia - O.D. practice',
    url: 'https://youtu.be/53Eo-vqiaEU?si=M4ku3oTV68ZpalZy',
    previewImage: '/thumbnails/od-practice.jpg',
    category: 'Guitar',
  },
  {
    title: 'Tim Henson - Biggest Shred Collab',
    url: 'https://youtu.be/RI7sUlJ1Yl8?si=zMmVrulIMacthUhl',
    previewImage: '/thumbnails/jdbsc.jpg',
    category: 'Guitar',
  },
  {
    title: 'Unprocessed - Real (Tim Henson part)',
    url: 'https://youtu.be/O4x8TeomIMw?si=x23Nd6dk9ki14K3Q',
    previewImage: '/thumbnails/real.jpg',
    category: 'Guitar',
  },
  {
    title: 'Polyphia - Reverie outro',
    url: 'https://youtu.be/sTpwmtztKpg?si=xTpeoGocVqkeI0le',
    previewImage: '/thumbnails/reverie.jpg',
    category: 'Guitar',
  },
  {
    title: 'Tim Henson - Quintuplet Meditation',
    url: 'https://youtu.be/KSaSy9KbfyQ?si=oOJ1g9H73awJDw-a',
    previewImage: '/thumbnails/quintuplet.jpg',
    category: 'Guitar',
  },
  {
    title: 'Domestic na Kanojo OP「Kawaki wo Ameku」',
    url: 'https://youtu.be/F81BcNE1D28?si=_v1Ygf5ci_V_D57W',
    previewImage: '/thumbnails/kawaki.jpg',
    category: 'Piano',
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
        <span className="text-2xl font-medium capitalize">Music</span>
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
                    <img
                      src={video.previewImage}
                      alt={`Preview of ${video.title}`}
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
