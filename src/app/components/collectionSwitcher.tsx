'use client';

import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type CollectionSwitcherProps = {
  collection?: string;
  onClick?: () => void;
};

function CollectionSwitcher({ collection, onClick }: CollectionSwitcherProps) {
  const [isHovered, setIsHovered] = useState(false);
  const label = collection ?? 'All';

  return (
    <button
      onClick={onClick}
      className="relative text-xl font-medium capitalize transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isHovered ? (
          <motion.div
            key="icon"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <Menu className="w-6 h-6 mx-auto" />
          </motion.div>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default CollectionSwitcher;
