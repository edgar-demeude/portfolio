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

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 bg-white text-gray-900 dark:bg-black dark:text-white">
      <motion.section
        className="max-w-3xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1 className="text-4xl font-bold text-center" variants={itemVariants}>
          About my work
        </motion.h1>

        {/* Intro */}
        {/* <motion.p className="text-lg font-medium leading-relaxed  " variants={itemVariants}>
          Photography and video started as a hobby, but quickly became a way for me to slow down and truly look around.  
          It helped me see the beauty in the little things we usually pass by without noticing.
        </motion.p> */}

        {/* Chasing Light */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Chasing light
          </motion.h2>
          <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
            I tend to follow light. Sometimes, it leads me somewhere I expected; other times, it surprises me with something far more interesting than I could have planned.
          </motion.p>
        </motion.div>

        {/* Gear */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Gear
          </motion.h2>
          <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
            I shoot everything on a Fujifilm X-T4, mostly with a 23 mm lens (35 mm full-frame equivalent). I love how it captures enough of the surroundings to tell a story through context, but still demands careful composition so things don’t get too chaotic.
          </motion.p>
        </motion.div>
      </motion.section>
    </main>
  );
}
