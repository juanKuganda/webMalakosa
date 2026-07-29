"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function AnchorScrolling() {
  const lenis = useLenis(ScrollTrigger.update);

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
          window.history.replaceState(null, '', `#${id}`);
        }
      }
    };

    document.documentElement.addEventListener('click', handleHashChange);
    return () => document.documentElement.removeEventListener('click', handleHashChange);
  }, [lenis]);

  return null;
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
  
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0, 0); // Important for Lenis + GSAP sync

    // Refresh ScrollTrigger after a slight delay to account for CMS data and image loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  
    return () => {
      gsap.ticker.remove(update);
      clearTimeout(timer);
    };
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root options={{ lerp: 0.04, smoothWheel: true, wheelMultiplier: 0.8 }}>
      <AnchorScrolling />
      {children}
    </ReactLenis>
  );
}
