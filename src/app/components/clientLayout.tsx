'use client';
import { motion } from "framer-motion";
import { ReactNode, Suspense } from "react";
import Navbar from "./navbar";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./ScrollToTopOnRouteChange";
import { LanguageProvider } from "./languageContext";
import Footer from "./footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>
        <Suspense fallback={null}>
          <ScrollToTop />
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
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
