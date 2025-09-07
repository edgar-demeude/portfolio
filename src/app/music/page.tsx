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
    title: 'YOASOBI「Biri-Biri」',
    url: 'https://youtu.be/hp4vhw2f-hs?si=7bpW5zI6Mr4ejkB7',
    previewImage: '/thumbnails/biribiri.jpg',
    category: 'Drums',
  },
  {
    title: 'Polyphia - Chimera (feat. Lil West)',
    url: 'https://youtu.be/U3PoLVVbgJo?si=GDsj2JVlT75ZG-Zg',
    previewImage: '/thumbnails/chimera.jpg',
    category: 'Drums',
  },
  {
    title: 'Yoasobi - Idol (Tim Henson version)',
    url: 'https://youtu.be/w4o8orJPgBc?si=qWds_k-bIF_33miz',
    previewImage: '/thumbnails/idol.jpg',
    category: 'Guitar',
  },
  {
    title: 'Polyphia - Playing God (Full band cover)',
    url: 'https://youtu.be/JisvyFn_46k?si=8SBa__RFFe4ZtqgN',
    previewImage: '/thumbnails/playinggod.jpg',
    category: 'Guitar',
  },
  {
    title: 'Liftoff solo',
    url: 'https://youtu.be/10SvhmvoObk?si=rOI6YBPBA1UaX7fS',
    previewImage: '/thumbnails/liftoff.jpg',
    category: 'Guitar',
  },
  {
    title: 'Polyphia - O.D. practice',
    url: 'https://youtu.be/53Eo-vqiaEU?si=M4ku3oTV68ZpalZy',
    previewImage: '/thumbnails/od-practice.jpg',
    category: 'Guitar',
  },
  {
    title: 'Tim Henson - Biggest Shred Collab',
    url: 'https://youtu.be/RI7sUlJ1Yl8?si=zMmVrulIMacthUhl',
    previewImage: '/thumbnails/jdbsc.jpg',
    category: 'Guitar',
  },
  {
    title: 'Unprocessed - Real (Tim Henson part)',
    url: 'https://youtu.be/O4x8TeomIMw?si=x23Nd6dk9ki14K3Q',
    previewImage: '/thumbnails/real.jpg',
    category: 'Guitar',
  },
  {
    title: 'Polyphia - Reverie outro',
    url: 'https://youtu.be/sTpwmtztKpg?si=xTpeoGocVqkeI0le',
    previewImage: '/thumbnails/reverie.jpg',
    category: 'Guitar',
  },
  {
    title: 'Tim Henson - Quintuplet Meditation',
    url: 'https://youtu.be/KSaSy9KbfyQ?si=oOJ1g9H73awJDw-a',
    previewImage: '/thumbnails/quintuplet.jpg',
    category: 'Guitar',
  },
  {
    title: 'Domestic na Kanojo OP「Kawaki wo Ameku」',
    url: 'https://youtu.be/F81BcNE1D28?si=_v1Ygf5ci_V_D57W',
    previewImage: '/thumbnails/kawaki.jpg',
    category: 'Piano',
  },
];

export default function VideosPage() {
  const { language } = useLanguage();

  const translateCategory = (category: string) => {
    const map: Record<string, string> = {
      Drums: translations[language].drums ?? 'Drums',
      Guitar: translations[language].guitar ?? 'Guitar',
      Piano: translations[language].piano ?? 'Piano',
    };
    return map[category] || category;
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
