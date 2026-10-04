'use client';
import { useEffect, useState } from 'react';
export const closingQuotes = [
  'Curiosity asks the question. Discipline builds the answer.',
  'Good security begins with understanding what matters.',
  'Build with purpose. Test with curiosity. Improve with evidence.',
  'The most useful thing to build is something people can trust.',
  'Learning becomes meaningful when it turns into something useful.',
  'Progress begins with a better question and the patience to follow it.'
];
export function ClosingQuote() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let previous = -1;
      try { previous = Number(sessionStorage.getItem('portfolio-quote') ?? '-1'); } catch {}
      const choices = closingQuotes.map((_, i) => i).filter(i => i !== previous);
      const next = choices[Math.floor(Math.random() * choices.length)];
      try { sessionStorage.setItem('portfolio-quote', String(next)); } catch {}
      setIndex(next);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return <section className="closing-quote wrap" aria-label="A thought to leave with"><span className="quote-mark" aria-hidden="true">“</span><blockquote><p>{closingQuotes[index]}</p></blockquote></section>;
}
