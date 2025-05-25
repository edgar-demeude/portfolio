'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ThemeBtn from './components/themeBtn';
import Lenis from 'lenis';

export default function Home() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [collection, setCollection] = useState('all');

    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        fetch(`/api/photos?collection=${collection}`)
        .then(res => res.json())
        .then(setPhotos);
    }, [collection]);

    useEffect(() => {
        const scroller = new Lenis();
        lenisRef.current = scroller;

        const raf = (time: number) => {
            scroller.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
            scroller.destroy();
        };
    }, []);

    const scrollToTop = () => {
        lenisRef.current?.scrollTo(0, {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    };

    return (
            <div
            className="min-h-screen transition-colors duration-300"
            >
            <header className="flex items-center px-14 pt-10 pb-6 sticky top-0 z-10 text-2xl bg-black/70 backdrop-blur shadow-lg">
            <div className="flex-1 flex items-center">
                    <button
                        onClick={scrollToTop}
                        className="hover:opacity-70 transition-all duration-300"
                    >
                        Edgar Demeude
                    </button>
                </div>
            <div className="flex-1 flex justify-center">
                {collection === 'all' ? 'All' : collection.charAt(0).toUpperCase() + collection.slice(1)}
            </div>
            <div className="flex-1 flex items-center justify-end space-x-4">
                <nav className="space-x-6">
                <button className="hover:opacity-70 transition-all duration-300" onClick={() => setCollection('all')}>All</button>
                <button className="hover:opacity-70 transition-all duration-300" onClick={() => setCollection('japan')}>Japan</button>
                <button className="hover:opacity-70 transition-all duration-300" onClick={() => setCollection('france')}>France</button>
                </nav>
                <ThemeBtn />
            </div>
            </header>
            <main className="p-4">
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
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
            </main>
            </div>
    );
}
