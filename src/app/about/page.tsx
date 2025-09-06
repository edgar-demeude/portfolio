'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import useLenisScroll from '../hooks/useLenisScroll';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function AboutPage() {
    const { scrollToTop } = useLenisScroll();
    const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      key: 'Photography',
      text: `I tend to follow light. Sometimes, it takes me exactly where I expect.
      Other times, it surprises me with something far more interesting than I could have planned.
      I shoot everything with a Fujifilm X-T4, mainly with a 23mm lens. 
      I appreciate how natural this focal length feels, it forces me to slow down, to pay attention and to keep the frame balanced. 
      Also, I like green.`,
      img: '/photos/japan_5_japan23/22_japan23.JPG',
    },
    {
      key: 'Research',
      text: `I aim to become a research scientist focusing on AI alignment, security, and explainable AI.
      I believe it is crucial to provide guidance and oversight for emerging technologies,
      and that research in this field is essential to ensure that technological progress remains
      ethical and aligned with human values and morals.`,
      img: '/thumbnails/research_0.jpg',
    },
    {
      key: 'Music',
      text: `I started as a drummer, then moved to piano, and later to guitar.
      Each instrument opened a different perspective, and I enjoy exploring both the similarities and differences between them.
      I am especially drawn to technically challenging pieces, with Polyphia being one of my main inspirations.`,
      img: '/thumbnails/music_1.JPG',
    },
  ];

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">About</span>
      </div>

      {sections.map((section, index) => (
        <section key={section.key} className="mb-16 sm:mb-20 md:mb-24">
          {/* Section label with separator */}
          <div className="flex items-center mb-8 sm:mb-10">
            <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
              {section.key}
            </span>
            <div className="flex-1 thin-separator" />
          </div>

          {/* Content */}
          <motion.div
            className={`max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Image */}
            <motion.div variants={itemVariants} className="w-full overflow-hidden">
              <Image
                src={section.img}
                alt={section.key}
                width={1200}
                height={800}
                className="w-full h-full object-cover photo-hover"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       50vw"
              />
            </motion.div>

            {/* Text */}
            <motion.div className="w-full max-w-3xl mx-auto">
              <p className="text-lg leading-loose whitespace-pre-line">
                {section.text}
              </p>
            </motion.div>
          </motion.div>
        </section>
      ))}

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
    </main>
  );
}
