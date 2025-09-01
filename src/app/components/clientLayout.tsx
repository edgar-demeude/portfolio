'use client';

import { motion } from "framer-motion";
import { ReactNode, Suspense } from "react";
import Navbar from "./navbar";
import { ThemeProvider } from "next-themes";
import ScrollToTopOnRouteChange from "./ScrollToTopOnRouteChange";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Suspense fallback={null}>
        <ScrollToTopOnRouteChange />
      </Suspense>

      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </ThemeProvider>
  );
}
