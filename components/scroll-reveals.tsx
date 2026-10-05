'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Animate on entry without ever hiding content before JavaScript loads.
export function ScrollReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const selector = '.collection-heading, .work-card, .spotlight-grid > div, .journey-item, .education-card, .credential-group, .practice-strip, .closing-quote, .contact-grid';
    const observer = new IntersectionObserver(entries => {
      let order = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches || entry.target.contains(document.activeElement)) return;
        const animation = entry.target.animate([
          { opacity: 0.45, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 650, delay: Math.min(order++ * 60, 120), easing: 'cubic-bezier(.22,1,.36,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0, rootMargin: '0px 0px -28px 0px' });
    const register = () => document.querySelectorAll(selector).forEach(element => {
      if (seen.has(element)) return;
      seen.add(element);
      // Leave the initial viewport and restored scroll position undisturbed.
      if (element.getBoundingClientRect().top >= innerHeight) observer.observe(element);
    });
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
    const stopAnimations = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const onPreferenceChange = () => { if (preference.matches) stopAnimations(); };
    // Keyboard navigation should never have to wait for an entrance animation.
    document.addEventListener('focusin', stopAnimations);
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      observer.disconnect(); mutations.disconnect(); stopAnimations();
      document.removeEventListener('focusin', stopAnimations);
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [pathname]);
  return null;
}
