'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

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

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('no-scroll');

    // Reenable scrolling when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24">
      <motion.section
        className="max-w-3xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl font-bold" variants={itemVariants}>
          About my work
        </motion.h1>

        <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
          Blablabla blabla blablabla bla blabla.
        </motion.p>

        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Bla Blablabla
          </motion.h2>
          <motion.p variants={itemVariants}>
            Blablabla blabla blablabla bla blabla.
          </motion.p>
        </motion.div>

        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Blabla blablabla
          </motion.h2>
          <motion.p variants={itemVariants}>
            Blablabla blabla blablabla bla blabla.
          </motion.p>
        </motion.div>
      </motion.section>
    </main>
  );
}
