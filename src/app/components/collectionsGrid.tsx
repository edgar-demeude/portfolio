'use client';
import { useState, useEffect, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import useLenisScroll from '@/app/hooks/useLenisScroll';
import { useLanguage } from './languageContext';
import { translations } from '../../../translations';

type GroupedGridProps<T> = {
  title: string;
  data: T[];
  groupBy: (item: T) => string;        // how to group (e.g. year, category)
  renderItem: (item: T, index: number) => ReactNode; // how each card looks
  renderGroupLabel?: (label: string) => ReactNode;   // how to display section labels
  aspectRatio?: string;                // e.g. "3/2" or "16/9"
};

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

function translateCountry(key: string, language: keyof typeof translations) {
  const mapping: Record<string, string> = {
    france: translations[language].france,
    japan: translations[language].japan,
    italia: translations[language].Italia,
    netherlands: translations[language].Netherlands,
  };

  return mapping[key.toLowerCase()] || key;
}

export default function CollectionsGrid<T>({
  title,
  data,
  groupBy,
  renderItem,
  renderGroupLabel,
}: GroupedGridProps<T>) {
  const { scrollToTop } = useLenisScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language } = useLanguage();

  // Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Group data
  const grouped: Record<string, T[]> = {};
  data.forEach((item) => {
    const key = groupBy(item);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const categoryPriority: { [key: string]: number } = {
      France: 1,
      Japan: 2,
      Italia: 3,
      Netherlands: 4,
    };
    return (categoryPriority[a] || 99) - (categoryPriority[b] || 99);
  });

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-2xl font-medium capitalize">{title}</span>
      </div>

      {sortedKeys.map((key) => {
        const translatedKey = translateCountry(key, language);
        return (
          <section key={key} className="mb-16 sm:mb-20 md:mb-24">
            {/* Group label */}
            <div className="flex items-center mb-8 sm:mb-10">
              {renderGroupLabel ? (
                renderGroupLabel(key)
              ) : (
                <>
                  <span className="text-base sm:text-sm italic pr-4 whitespace-nowrap">
                    {translatedKey}
                  </span>
                  <div className="flex-1 thin-separator" />
                </>
              )}
            </div>

            {/* Items grid */}
            <motion.div
              className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {grouped[key].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="w-full">
                  {renderItem(item, index)}
                </motion.div>
              ))}
            </motion.div>
          </section>
        );
      })}

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
    </main>
  );
}