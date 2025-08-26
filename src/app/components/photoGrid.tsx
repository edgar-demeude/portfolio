'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type PhotoGridProps = {
  photos: string[];
  onPhotoClick?: (index: number) => void;
  className?: string;
};

export default function PhotoGrid({ photos, onPhotoClick, className }: PhotoGridProps) {
  // Desktop : 3 columns
  const distributeDesktop = () => {
    const columns: { src: string; originalIndex: number }[][] = [[], [], []];
    photos.forEach((src, index) => {
      columns[index % 3].push({ src, originalIndex: index });
    });
    return columns;
  };

  // Mobile : 2 columns
  const distributeMobile = () => {
    const columns: { src: string; originalIndex: number }[][] = [[], []];
    photos.forEach((src, index) => {
      columns[index % 2].push({ src, originalIndex: index });
    });
    return columns;
  };

  const desktopColumns = distributeDesktop();
  const mobileColumns = distributeMobile();

  return (
    <div className={`w-full flex ${className || ''}`}>
      {/* Desktop / Tablet */}
      <div className="hidden md:flex gap-4 w-full">
        {desktopColumns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 space-y-4">
            {col.map(({ src, originalIndex }) => (
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
        ))}
      </div>

      {/* Mobile - 2 columns with minimal horizontal padding */}
      <div className="flex md:hidden gap-2 w-full">
        {mobileColumns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 space-y-2">
            {col.map(({ src, originalIndex }) => (
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
