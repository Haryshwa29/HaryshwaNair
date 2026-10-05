'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// A shared scroll timeline keeps the entrance and recession of every tile in sync.
export function ScrollReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const items = new Map<HTMLElement, Animation>();
    const selector = '.collection-heading, .work-card, .spotlight-grid > div, .journey-item, .education-card, .credential-group, .practice-strip, .closing-quote, .contact-grid';
    let frame = 0;
    const update = () => {
      frame = 0;
      items.forEach((animation, element) => {
        if (!element.isConnected) { animation.cancel(); items.delete(element); return; }
        // Layout offsets are unaffected by the animated transform: no feedback jitter.
        let top = 0;
        let parent: HTMLElement | null = element;
        while (parent) { top += parent.offsetTop; parent = parent.offsetParent as HTMLElement | null; }
        const progress = Math.max(0, Math.min(1, (innerHeight - (top - scrollY)) / (innerHeight + element.offsetHeight)));
        animation.currentTime = element.contains(document.activeElement) ? 500 : progress * 1000;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const register = () => {
      if (preference.matches) return;
      document.querySelectorAll<HTMLElement>(selector).forEach(element => {
        if (items.has(element)) return;
        const tile = element.matches('.work-card, .education-card, .journey-item, .credential-group');
        const compact = innerWidth < 760;
        const distance = compact ? 30 : 58;
        const animation = element.animate([
          { offset: 0, opacity: 0.3, transform: `perspective(1200px) translateY(${distance}px) scale(.94) rotateX(${tile ? 6 : 0}deg)` },
          { offset: 0.24, opacity: 1, transform: 'perspective(1200px) translateY(0) scale(1) rotateX(0deg)' },
          { offset: 0.78, opacity: 1, transform: 'perspective(1200px) translateY(0) scale(1) rotateX(0deg)' },
          { offset: 1, opacity: 0.45, transform: `perspective(1200px) translateY(-18px) translateZ(-${tile ? 100 : 40}px) rotateX(-3deg)` },
        ], { duration: 1000, fill: 'both', easing: 'linear' });
        animation.pause();
        items.set(element, animation);
      });
      schedule();
    };
    const reset = () => { items.forEach(animation => animation.cancel()); items.clear(); register(); };
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    preference.addEventListener('change', reset);
    return () => {
      mutations.disconnect(); resize.disconnect(); cancelAnimationFrame(frame);
      items.forEach(animation => animation.cancel());
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      document.removeEventListener('focusin', schedule); document.removeEventListener('focusout', schedule);
      preference.removeEventListener('change', reset);
    };
  }, [pathname]);
  return null;
}
