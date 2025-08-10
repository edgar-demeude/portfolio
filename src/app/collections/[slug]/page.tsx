'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PhotoGrid from '@/app/components/photoGrid';
import useLenisScroll from '@/app/hooks/useLenisScroll';

export default function CollectionPage() {
    const { slug } = useParams();
    const [photos, setPhotos] = useState<string[]>([]);
    const { scrollToTop } = useLenisScroll();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/photos?collection=${slug}`)
            .then((res) => res.json())
            .then(setPhotos);
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen transition-colors duration-300">
            <main>
                <PhotoGrid photos={photos} />
            </main>
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`
                    fixed bottom-12 left-1/2 -translate-x-1/2
                    w-12 h-12
                    flex items-center justify-center
                    rounded-full
                    bg-black/70
                    text-white
                    backdrop-blur
                    shadow-lg
                    transition-all duration-500 ease-in-out
                    ${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                    hover:bg-black hover:w-20 hover:scale-105
                `}
            >
                ↑
            </button>
        </div>
    );
}
