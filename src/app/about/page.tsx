'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import useLenisScroll from '../hooks/useLenisScroll';
import { translations } from '../../../translations';
import { useLanguage } from '../components/languageContext';
import { SiYoutube, SiInstagram, SiGithub } from 'react-icons/si';

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
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = React.useMemo(
    () => [
      {
        key: translations[language].photography,
        text: translations[language].about_photography,
        img: '/photos/japan_5_japan23/22_japan23.JPG',
      },
      {
        key: translations[language].research,
        text: translations[language].about_research,
        img: '/thumbnails/research_0.jpg',
      },
      {
        key: translations[language].music,
        text: translations[language].about_music,
        img: '/thumbnails/music_1.JPG',
      },
    ],
    [language]
  );

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">{translations[language].about}</span>
      </div>

      {sections.map((section, index) => (
        <section key={section.key} className="mb-16 sm:mb-20 md:mb-24">
          {/* Section label with separator */}
          <div className="flex items-center mb-8 sm:mb-10">
            <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">{section.key}</span>
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
              <p className="text-lg leading-loose whitespace-pre-line">{section.text}</p>
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* About the site */}
      <section className="mb-12 sm:mb-16 md:mb-20">
        <div className="flex items-center mb-8 sm:mb-10">
          <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
            {translations[language].about_website_title}
          </span>
          <div className="flex-1 thin-separator" />
        </div>

        <motion.div
          className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-lg leading-loose mb-4 whitespace-pre-line">
            {translations[language].about_website}
          </motion.p>

          <motion.a
            href="https://github.com/edgar-demeude/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
            variants={itemVariants}
          >
            <SiGithub className="w-8 h-8" />
            <span className="text-sm">{language === 'fr' ? 'GitHub' : 'GitHub'}</span>
          </motion.a>
        </motion.div>
      </section>

      {/* Social links section */}
      <section className="mb-16 sm:mb-20 md:mb-24">
        <div className="flex items-center mb-8 sm:mb-10">
          <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
            {translations[language].social_media}
          </span>
          <div className="flex-1 thin-separator" />
        </div>

        <motion.div
          className="flex justify-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* YouTube */}
          <motion.div variants={itemVariants}>
            <a
              href="https://www.youtube.com/c/Nysek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
            >
              <SiYoutube className="w-8 h-8" />
              <span className="text-sm">YouTube</span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <a
              href="https://www.instagram.com/nysek.1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
            >
              <SiInstagram className="w-8 h-8" />
              <span className="text-sm">Instagram</span>
            </a>
          </motion.div>
        </motion.div>
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
