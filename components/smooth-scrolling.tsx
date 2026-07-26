"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

function AnchorScrolling() {
  const lenis = useLenis();

  useEffect(() => {
    const handleHashChange = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.includes('#')) {
        const id = href.split('#')[1];
        if (!id) return;
        
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          // Scroll smoothly with a -80px offset for the sticky navbar
          lenis?.scrollTo(element, { offset: -80, duration: 1.5, lerp: 0.05 });
          window.history.pushState(null, '', `#${id}`);
        }
      }
    };

    document.documentElement.addEventListener('click', handleHashChange);
    return () => document.documentElement.removeEventListener('click', handleHashChange);
  }, [lenis]);

  return null;
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.04, smoothWheel: true, wheelMultiplier: 0.8 }}>
      <AnchorScrolling />
      {children}
    </ReactLenis>
  );
}
