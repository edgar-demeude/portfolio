'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

type LightboxProps = {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext]);

  useEffect(() => setImageLoaded(false), [index]);

  function startClose() {
    setIsVisible(false);
  }

  // Swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchEndX.current - touchStartX.current;
      if (delta > 50) onPrev(); // swipe right
      else if (delta < -50) onNext(); // swipe left
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const aspectRatio = naturalSize ? naturalSize.w / naturalSize.h : 1;
  const maxWidth = window.innerWidth * 0.9;
  const maxHeight = window.innerHeight * 0.9;
  let width: number, height: number;

  if (aspectRatio >= 1) {
    width = Math.min(maxWidth, maxHeight * aspectRatio);
    height = width / aspectRatio;
  } else {
    height = Math.min(maxHeight, maxWidth / aspectRatio);
    width = height * aspectRatio;
  }

  return (
    <AnimatePresence onExitComplete={() => { if (!isVisible) onClose(); }}>
      {isVisible && (
        <motion.div
          key="overlay"
          className="fixed inset-0 bg-black/97 flex items-center justify-center z-50 p-2 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Click outside to close */}
          <div
            className="absolute inset-0"
            onClick={startClose}
          />

          {/* Image container */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center"
            style={{ width, height, zIndex: 50 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-wrapper-${photos[index]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  key={photos[index]}
                  src={photos[index]}
                  alt={`Image ${index}`}
                  width={width}
                  height={height}
                  className="object-contain"
                  onLoadingComplete={(img) => {
                    setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
                    setImageLoaded(true);
                  }}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Close button */}
          <motion.button
            onClick={startClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-8 text-white text-3xl sm:text-4xl p-2 sm:p-4 rounded-full hover:text-gray-300 transition-colors z-50"
            aria-label="Close lightbox"
          >
            ✕
          </motion.button>

          {/* Navigation minimaliste */}
          <motion.button
            onClick={onPrev}
            className="fixed top-1/2 left-2 sm:left-8 -translate-y-1/2 text-white text-4xl sm:text-6xl p-2 sm:p-6 rounded-full hover:text-gray-300 transition-colors z-50"
            aria-label="Previous image"
          >
            ‹
          </motion.button>

          <motion.button
            onClick={onNext}
            className="fixed top-1/2 right-2 sm:right-8 -translate-y-1/2 text-white text-4xl sm:text-6xl p-2 sm:p-6 rounded-full hover:text-gray-300 transition-colors z-50"
            aria-label="Next image"
          >
            ›
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
