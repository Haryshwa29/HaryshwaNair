'use client';
import { useEffect, useRef } from 'react';
export function MotionLayer() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(pointer: fine)');
    let cleanup = () => {};
    function setup() {
      cleanup();
      if (motion.matches || !pointer.matches) return;
      let frame = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (ring.current) { ring.current.style.transform = `translate3d(${e.clientX - 19}px,${e.clientY - 19}px,0)`; ring.current.style.opacity = '1'; ring.current.dataset.active = String(Boolean((e.target as Element)?.closest('a,button,summary'))); }
          const art = document.querySelector<HTMLElement>('.portrait-stage');
          if (art) { const b = art.getBoundingClientRect(); const x = Math.max(-1,Math.min(1,(e.clientX - b.left - b.width/2)/b.width)); const y = Math.max(-1,Math.min(1,(e.clientY-b.top-b.height/2)/b.height)); art.style.setProperty('--shift-x', `${x * 12}px`); art.style.setProperty('--shift-y', `${y * 12}px`); }
        });
      };
      const leave = () => { if(ring.current) ring.current.style.opacity = '0'; };
      window.addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', leave);
      cleanup = () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame); leave(); const art = document.querySelector<HTMLElement>('.portrait-stage'); art?.style.removeProperty('--shift-x'); art?.style.removeProperty('--shift-y'); };
    }
    setup(); motion.addEventListener('change', setup); pointer.addEventListener('change', setup);
    return () => { cleanup(); motion.removeEventListener('change', setup); pointer.removeEventListener('change', setup); };
  }, []);
  return <div className="cursor-ring" ref={ring} aria-hidden="true" />;
}
