'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import useLenisScroll from '../hooks/useLenisScroll';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, FileText } from 'lucide-react';

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

export default function ResearchPage() {
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

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">Research</span>
      </div>

      {/* Section: About Research */}
      <section className="mb-16 sm:mb-20 md:mb-24">
        <div className="flex items-center mb-8 sm:mb-10">
          <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
            About
          </span>
          <div className="flex-1 thin-separator" />
        </div>

        <motion.div
          className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image */}
          <motion.div variants={itemVariants} className="w-full overflow-hidden">
            <Image
              src="/thumbnails/research_4.jpg" // tu peux changer ce chemin
              alt="Research"
              width={1200}
              height={800}
              className="w-full h-full object-cover photo-hover"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     50vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div className="w-full max-w-3xl mx-auto" variants={itemVariants}>
            <p className="text-lg leading-loose text-justify">
              I am deeply interested in <strong>AI alignment</strong>, 
              <strong> security</strong>, and the <strong>ethical </strong> 
              development of emerging technologies. My long-term goal is to contribute 
              to research that ensures technological progress remains aligned 
              with human values.  
              <br /><br />
              This page will gradually showcase my research projects. 
              For now, you can connect with me or explore my work through 
              the links below.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Section: Links */}
      <section className="mb-16 sm:mb-20 md:mb-24">
        <div className="flex items-center mb-8 sm:mb-10">
          <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
            Links
          </span>
          <div className="flex-1 thin-separator" />
        </div>

        <motion.div
          className="flex justify-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link
              href="https://github.com/edgar-demeude"
              target="_blank"
              className="flex flex-col items-center gap-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
            >
              <Github className="w-8 h-8" />
              <span className="text-sm">GitHub</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="https://www.linkedin.com/in/edgar-demeude"
              target="_blank"
              className="flex flex-col items-center gap-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
            >
              <Linkedin className="w-8 h-8" />
              <span className="text-sm">LinkedIn</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/CV.pdf"
              target="_blank"
              className="flex flex-col items-center gap-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
            >
              <FileText className="w-8 h-8" />
              <span className="text-sm">CV</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Section: Projects Placeholder */}
      <section className="mb-16 sm:mb-20 md:mb-24">
        <div className="flex items-center mb-8 sm:mb-10">
          <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
            Projects
          </span>
          <div className="flex-1 thin-separator" />
        </div>

        <div className="text-center italic text-gray-500">
          🚧 Projects section coming soon...
        </div>
      </section>

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
