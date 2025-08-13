'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type PhotoGridProps = {
  photos: string[];
  onPhotoClick?: (index: number) => void;
};

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  // Distribuer les images dans 3 colonnes de façon fixe
  const distributePhotos = () => {
    const columns: { src: string; originalIndex: number }[][] = [[], [], []];
    
    photos.forEach((src, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push({ src, originalIndex: index });
    });
    
    return columns;
  };

  const columns = distributePhotos();

  return (
    <div className="flex gap-4 px-4 pb-4">
      {/* Colonne 1 */}
      <div className="flex-1 space-y-4 hidden md:block">
        {columns[0].map(({ src, originalIndex }) => (
          <div
            key={originalIndex}
            className="overflow-hidden cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(originalIndex)}
          >
            <FadeInImage
              src={src}
              alt={`Photo ${originalIndex}`}
              width={600}
              height={800}
              index={originalIndex}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Colonne 2 */}
      <div className="flex-1 space-y-4 hidden sm:block">
        {columns[1].map(({ src, originalIndex }) => (
          <div
            key={originalIndex}
            className="overflow-hidden cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(originalIndex)}
          >
            <FadeInImage
              src={src}
              alt={`Photo ${originalIndex}`}
              width={600}
              height={800}
              index={originalIndex}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Colonne 3 */}
      <div className="flex-1 space-y-4">
        {columns[2].map(({ src, originalIndex }) => (
          <div
            key={originalIndex}
            className="overflow-hidden cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(originalIndex)}
          >
            <FadeInImage
              src={src}
              alt={`Photo ${originalIndex}`}
              width={600}
              height={800}
              index={originalIndex}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Version mobile - colonne unique avec toutes les images */}
      <div className="flex-1 space-y-4 sm:hidden">
        {photos.map((src, idx) => (
          <div
            key={idx}
            className="overflow-hidden cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(idx)}
          >
            <FadeInImage
              src={src}
              alt={`Photo ${idx}`}
              width={600}
              height={800}
              index={idx}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type FadeInImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  className?: string;
};

function FadeInImage({ src, alt, width, height, className, index }: FadeInImageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 15);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`
        ${className}
        transform transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
      `}
    />
  );
}