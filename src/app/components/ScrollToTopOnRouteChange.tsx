'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // useLayoutEffect s'exécute de manière synchrone avant le paint
  useLayoutEffect(() => {
    // Force le scroll immédiatement, de manière synchrone
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, searchParams]);

  useEffect(() => {
    // Méthode agressive avec plusieurs tentatives
    const forceScrollToTop = () => {
      // Désactiver temporairement le smooth scroll
      const originalBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Multiple méthodes de scroll
      window.scrollTo(0, 0);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Si ça ne marche toujours pas, forcer avec du CSS
      if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
        document.documentElement.style.transform = 'translateY(0)';
        document.body.style.transform = 'translateY(0)';
        window.scrollTo(0, 0);
      }
      
      // Restaurer le comportement original
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = originalBehavior;
      }, 1);
    };

    // Exécution immédiate
    forceScrollToTop();

    // Tentatives supplémentaires avec des délais
    const timeouts = [0, 1, 10, 50, 100].map(delay => 
      setTimeout(forceScrollToTop, delay)
    );

    // Nettoyage
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [pathname, searchParams]);

  return null;
}