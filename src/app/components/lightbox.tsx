'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
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
  const [direction, setDirection] = useState(0); // swipe direction
  const imgCache = useRef<Record<string, HTMLImageElement>>({});

  // Preload surrounding images
  useEffect(() => {
    const preload = [
      photos[(index - 1 + photos.length) % photos.length],
      photos[(index + 1) % photos.length]
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

  const handlePrev = () => {
  setDirection(-1);
  onPrev();
  };

  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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
        key={photos[index]}
        initial={{ x: direction * 200 }}
        animate={{ x: 0 }}
        exit={{ x: -direction * 200 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="relative flex items-center justify-center"
        style={{ width, height }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(e, info) => {
          if (info.offset.x > 50) handlePrev();
          if (info.offset.x < -50) handleNext();
        }}
      >
        <Image
          src={photos[index]}
          alt={`Image ${index}`}
          width={width}
          height={height}
          className="object-contain"
          onLoadingComplete={(img) => setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight })}
          loading="eager"
        />
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
