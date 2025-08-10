'use client';

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
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function CollectionMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="space-y-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {['Favourites', 'Japan 24', 'Japan 23', 'Lyon'].map((title) => (
          <motion.p
            key={title}
            className="text-3xl md:text-4xl font-medium cursor-pointer"
            variants={itemVariants}
            onClick={onClose}
          >
            {title}
          </motion.p>
        ))}
      </motion.section>
    </motion.div>
  );
}
