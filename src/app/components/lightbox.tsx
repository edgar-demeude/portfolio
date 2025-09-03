'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

type LightboxProps = {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const imgCache = useRef<Record<string, HTMLImageElement>>({});
  const [direction, setDirection] = useState(0);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    setDirection(1);
    onNext();
  }, [onNext]);


  // Preload surrounding images
  useEffect(() => {
    const preload = [
      photos[(index - 1 + photos.length) % photos.length],
      photos[(index + 1) % photos.length],
    ];
    preload.forEach(src => {
      if (!imgCache.current[src]) {
        const img = new window.Image();
        img.src = src;
        imgCache.current[src] = img;
      }
    });
  }, [index, photos]);

  useEffect(() => setNaturalSize(null), [index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlePrev, handleNext, onClose]);

  const maxWidth = window.innerWidth * 0.9;
  const maxHeight = window.innerHeight * 0.9;
  const aspectRatio = naturalSize ? naturalSize.w / naturalSize.h : 1;
  let width: number, height: number;
  if (aspectRatio >= 1) {
    width = Math.min(maxWidth, maxHeight * aspectRatio);
    height = width / aspectRatio;
  } else {
    height = Math.min(maxHeight, maxWidth / aspectRatio);
    width = height * aspectRatio;
  }

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-8">
      {/* Click outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Swipeable image */}
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={false}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.35,
        }}
        className="relative flex items-center justify-center"
        style={{ width, height }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, info) => {
          if (info.offset.x > 50) handlePrev();
          if (info.offset.x < -50) handleNext();
        }}
      >
        <motion.div
          key={photos[index]}
          initial={{ x: direction * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={photos[index]}
            alt={`Image ${index}`}
            width={width}
            height={height}
            className="object-contain"
            onLoadingComplete={(img) =>
              setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight })
            }
            loading="eager"
          />
        </motion.div>
      </motion.div>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="fixed top-1/2 left-2 -translate-y-1/2 text-white text-4xl sm:text-6xl p-2 rounded-full hover:text-gray-300 z-50"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="fixed top-1/2 right-2 -translate-y-1/2 text-white text-4xl sm:text-6xl p-2 rounded-full hover:text-gray-300 z-50"
      >
        ›
      </button>
      <button
        onClick={onClose}
        className="fixed top-4 right-4 text-white text-3xl sm:text-4xl p-2 rounded-full hover:text-gray-300 z-50"
      >
        ✕
      </button>
    </div>
  );
}
