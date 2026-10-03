'use client';
import { useState, useSyncExternalStore } from 'react';
const subscribe = () => () => {};
export function EmailAction({ email }: { email: string }) {
  const [feedback, setFeedback] = useState('');
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setFeedback('Email address copied.'); }
    catch { setFeedback(`Could not copy. Select and copy this address: ${email}`); }
  }
  return <div className="email-actions"><a className="text-link" href={`mailto:${email}`}>{email}</a>{hydrated && <button className="text-link" onClick={copy}>Copy email</button>}<p role="status" aria-live="polite">{feedback}</p></div>;
}
