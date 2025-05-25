'use client';
import Image from 'next/image';

type PhotoGridProps = {
  photos: string[];
};

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 px-4 pb-4">
      {photos.map((src, idx) => (
        <div key={idx} className="overflow-hidden">
          <Image
            src={src}
            alt={`Photo ${idx}`}
            width={600}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
}
