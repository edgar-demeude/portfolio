'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {children}
        <Footer />
      </motion.div>
    </>
  );
}
