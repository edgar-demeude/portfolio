'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type PhotoGridProps = {
  photos: string[];
};

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 px-4 pb-4">
      {photos.map((src, idx) => (
        <div key={idx} className="overflow-hidden">
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
