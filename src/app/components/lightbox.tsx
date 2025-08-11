import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext]);

  useEffect(() => {
    setImageLoaded(false);
  }, [index]);

  function startClose() {
    setIsVisible(false);
  }

  const aspectRatio = naturalSize ? naturalSize.w / naturalSize.h : 1;
  const PORTRAIT_SCALE = 1.03;
  const LANDSCAPE_SCALE = 0.75;

  const containerStyle = naturalSize
    ? aspectRatio >= 1
      ? {
          width: `calc(90vw * ${LANDSCAPE_SCALE})`,
          height: `calc((90vw / ${aspectRatio}) * ${LANDSCAPE_SCALE})`,
        }
      : {
          width: `calc((90vh * ${aspectRatio}) * ${PORTRAIT_SCALE})`,
          height: `calc(90vh * ${PORTRAIT_SCALE})`,
        }
    : { maxWidth: "90vw", maxHeight: "90vh" };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (!isVisible) onClose();
      }}
    >
      {isVisible && (
        <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/97 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={startClose}
            >
            <div
                className="flex items-start space-x-4 mt-12"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                className="relative flex items-center justify-center shadow-xl"
                style={containerStyle}
                >
                <AnimatePresence mode="wait">
                    <motion.div
                    key={`image-wrapper-${photos[index]}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageLoaded ? 1 : 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full h-full"
                    >
                    <Image
                        key={photos[index]}
                        src={photos[index]}
                        alt={`Image ${index}`}
                        width={naturalSize?.w || 800}
                        height={naturalSize?.h || 600}
                        className="object-contain max-w-full max-h-full"
                        onLoadingComplete={(img) => {
                        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
                        setImageLoaded(true);
                        }}
                        priority
                        style={{ width: "100%", height: "100%" }}
                    />
                    </motion.div>
                </AnimatePresence>
                </div>
            </div>

            {/* Croix de fermeture fixe */}
            <motion.button
                onClick={(e) => {
                e.stopPropagation();
                startClose();
                }}
                className="fixed top-6 right-8 text-white font-bold text-4xl select-none focus:outline-none focus-visible:outline-none hover:text-gray-300 transition-colors
                        p-4 rounded-full bg-black/50 backdrop-blur-md"
                aria-label="Close lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                ✕
            </motion.button>

            {/* Boutons de navigation fixes, un peu plus éloignés des bords */}
            <motion.button
                onClick={(e) => {
                e.stopPropagation();
                onPrev();
                }}
                className="fixed top-1/2 left-8 -translate-y-1/2 text-white text-6xl select-none focus:outline-none focus-visible:outline-none hover:text-gray-300 transition-colors
                        p-6 inline-flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md"
                aria-label="Previous image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                ‹
            </motion.button>

            <motion.button
                onClick={(e) => {
                e.stopPropagation();
                onNext();
                }}
                className="fixed top-1/2 right-8 -translate-y-1/2 text-white text-6xl select-none focus:outline-none focus-visible:outline-none hover:text-gray-300 transition-colors
                        p-6 inline-flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md"
                aria-label="Next image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                ›
            </motion.button>
            </motion.div>



      )}
    </AnimatePresence>
  );
}
