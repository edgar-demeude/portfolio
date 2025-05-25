'use client';

import { useEffect, useState } from 'react';
import useLenisScroll from '../hooks/useLenisScroll';
import PhotoGrid from '../components/photoGrid';

export default function Home() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [collection, setCollection] = useState('all');
    const { scrollToTop } = useLenisScroll();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        fetch(`/api/photos?collection=${collection}`)
        .then((res) => res.json())
        .then(setPhotos);
    }, [collection]);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setShowScrollTop(scrolled > 300);
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
