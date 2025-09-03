'use client';

import { useEffect } from 'react';
import { motion, Variants, easeOut } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 transition-colors duration-700">
      <motion.section
        className="max-w-3xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1 className="text-4xl font-bold text-center" variants={itemVariants}>
          About me
        </motion.h1>

        {/* Research */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Research
          </motion.h2>
          <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
            I aim to become a research scientist focusing on AI alignment and security. 
            I believe it is crucial to provide guidance and oversight for emerging technologies, and that research in this field is essential to ensure that technological progress remains ethical and aligned with human values and morals.
          </motion.p>
        </motion.div>

        {/* Photography */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Photography
          </motion.h2>
          <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
            I tend to follow light. Sometimes, it takes me exactly where I expect. Other times, it surprises me with something far more interesting than I could have planned. 
            I shoot everything with a Fujifilm X-T4, mainly with a 23mm lens. I love the natural feel of this focal length, it forces me to focus on composition so the frame doesn’t become messy.
          </motion.p>
        </motion.div>

        {/* Music */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            Music
          </motion.h2>
          <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
            I started as a drummer, then moved to piano, and later to guitar. I enjoy exploring both the similarities and differences between instruments. 
            I am especially drawn to technically challenging pieces, with Polyphia being one of my main inspirations.
          </motion.p>
        </motion.div>
      </motion.section>
    </main>
  );
}
