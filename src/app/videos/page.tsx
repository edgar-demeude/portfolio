'use client';
import Image from 'next/image';
import CollectionsGrid from '../components/collectionsGrid';
import { useLanguage } from '../components/languageContext';
import { translations } from '../../../translations';

type Video = {
  title: string;
  url: string;
  previewImage: string;
  category: string;
};

const videos: Video[] = [
  {
    title: 'Finding myself',
    url: 'https://youtu.be/bR-Gu0Rx-c0?si=13ucmZF1yIyoKAKC',
    previewImage: '/thumbnails/finding.jpg',
    category: 'Shortfilms',
  },
  {
    title: 'Solitude',
    url: 'https://youtu.be/lK49cEUyGBs?si=sUJh4cmwhnFJaBla',
    previewImage: '/thumbnails/solitude.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'North of Europe',
    url: 'https://youtu.be/A95ptcbPvns?si=_R1YDXGAYrsXd2G1',
    previewImage: '/thumbnails/north.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'Turino',
    url: 'https://youtu.be/CS7krXX4GbY?si=ognEnaWEWxQGU2mD',
    previewImage: '/thumbnails/turino.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'Walk in the cemetery',
    url: 'https://youtu.be/KiCnaK_F0gc?si=na-9AfMDAEmHgelk',
    previewImage: '/thumbnails/cemetery.jpg',
    category: 'Moving postcards',
  },
  {
    title: 'Sunny winter',
    url: 'https://youtu.be/prOVrN-E0DE?si=zO0prUXEZkuYgBoz',
    previewImage: '/thumbnails/sunnywinter.jpg',
    category: 'Moving postcards',
  },
  {
    title: '25 days in Japan',
    url: 'https://youtu.be/LWOSKs3yeAU?si=fSRrSM1CsK5K1lnw',
    previewImage: '/thumbnails/25days.jpg',
    category: 'Documentaries',
  },
];

export default function VideosPage() {
  const { language } = useLanguage();

  const translateCategory = (category: string) => {
    const catMap: Record<string, string> = {
      'Shortfilms': translations[language].shortfilms ?? 'Shortfilms',
      'Moving postcards': translations[language].moving_postcards ?? 'Moving postcards',
      'Documentaries': translations[language].documentaries ?? 'Documentaries',
    };
    return catMap[category] || category;
  };

  return (
    <CollectionsGrid
      title={translations[language].videos}
      data={videos}
      groupBy={(v) => translateCategory(v.category)}
      renderItem={(video) => (
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer flex flex-col space-y-4"
        >
          <div className="overflow-hidden w-full aspect-[16/9] bg-neutral-900">
            <Image
              src={video.previewImage}
              alt={`Preview of ${video.title}`}
              width={1200}
              height={800}
              className="w-full h-full object-cover photo-hover"
            />
          </div>
          <h2 className="text-center text-xl font-medium group-hover:opacity-80 transition-opacity duration-300">
            {video.title}
          </h2>
        </a>
      )}
    />
  );
}
