'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CollectionsGrid from '../components/collectionsGrid';

type Collection = {
  folder: string;
  title: string;
  category: string;
  images: string[];
  thumbs: string[];
};

let collectionsCache: Collection[] | null = null;

export default function PhotographyPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (collectionsCache) {
      setCollections(collectionsCache);
    } else {
      fetch('/collections.json')
        .then((res) => res.json())
        .then((data) => {
          collectionsCache = data;
          setCollections(data);
        });
    }
  }, []);

  return (
    <CollectionsGrid
      title="Collections"
      data={collections}
      groupBy={(c) => c.category} // Group by category
      renderItem={(collection, index) => (
        <Link
          href={`/photography/gallery?collection=${encodeURIComponent(
            collection.folder
          )}`}
          scroll={false}
        >
          <div className="group cursor-pointer flex flex-col space-y-4">
            <div className="overflow-hidden w-full aspect-[3/2] bg-neutral-900">
              <Image
                src={collection.thumbs[0]}
                alt={`Preview of ${collection.title}`}
                width={1200}
                height={800}
                className="w-full h-full object-cover photo-hover"
                sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
                priority={index < 3}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </div>
            <h2 className="text-center text-xl font-medium group-hover:opacity-80 transition-opacity duration-300">
              {collection.title}
            </h2>
          </div>
        </Link>
      )}
    />
  );
}
