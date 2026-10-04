'use client';
import Image from 'next/image';
import { useState } from 'react';
import { profile } from '@/content/profile';
export function Portrait() {
  const [failed, setFailed] = useState(false);
  return <figure className="portrait-stage"><div className="portrait-outer-ring" aria-hidden="true" /><div className="portrait-frame">{profile.portrait && !failed ? <Image src={profile.portrait.src} alt={profile.portrait.alt} unoptimized fill sizes="(max-width: 760px) 80vw, 420px" priority onError={() => setFailed(true)} /> : <div className="portrait-monogram" role="img" aria-label="Haryshwa Nair typographic portrait"><span>h<span className="portrait-n">n</span><i>.</i></span><small>Curiosity. Discipline. Intent.</small></div>}<span className="portrait-corner top-left" aria-hidden="true" /><span className="portrait-corner bottom-right" aria-hidden="true" /></div><figcaption><span>Haryshwa Nair</span><span>Builder by curiosity.</span></figcaption><span className="portrait-side" aria-hidden="true">SECURITY × HUMAN INTENT</span><div className="portrait-note"><span className="note-line" />A little curiosity.<br />A lot of follow-through.</div></figure>;
}
