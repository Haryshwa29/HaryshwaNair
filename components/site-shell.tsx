import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Menu, Download } from 'lucide-react';
import { profile } from '@/content/profile';
import { EmailAction } from './email-action';
const links = [['Work', '/#work'], ['Experience', '/#experience'], ['About', '/#about'], ['Contact', '/#contact']];
function NavLinks() { return <>{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}{profile.resume && <a href={profile.resume.url} download={profile.resume.filename}>Resume <ArrowUpRight size={14} aria-hidden="true" /></a>}</>; }
export function Header() {
  return <header className="site-header wrap" id="top"><Link href="/" className="wordmark" aria-label="HN. — Haryshwa Nair home">HN<span>.</span></Link><nav className="desktop-nav" aria-label="Main navigation"><NavLinks /></nav><details className="mobile-menu"><summary aria-label="Menu"><span>Menu</span><Menu size={20} aria-hidden="true" /></summary><nav aria-label="Mobile navigation"><NavLinks /></nav></details></header>;
}
export function Contact() {
  return <section className="contact wrap" id="contact" aria-labelledby="contact-title"><div className="eyebrow" aria-hidden="true">&nbsp;</div><div className="contact-grid"><h2 id="contact-title">Let’s build something<br /><em>worth protecting.</em></h2><div><p aria-hidden="true"><br /><br /><br /></p><blockquote className="connection-quote">“A thoughtful conversation can be the beginning of something worth building.”</blockquote><a className="button button-gold" href={profile.linkedin}>Connect on LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a>{profile.email && <EmailAction email={profile.email} />}{profile.resume && <div className="resume-actions"><a className="button button-resume" href={profile.resume.url} download={profile.resume.filename}>Download Resume <Download size={17} aria-hidden="true" /></a></div>}</div></div></section>;
}
export function Footer() { return <footer className="footer wrap"><span>© 2026 Haryshwa Nair</span><div><a href={profile.github}>GitHub <ArrowUpRight size={13} aria-hidden="true" /></a><Link href="/privacy">Privacy</Link><a href="#top">Back to top <ArrowUp size={13} aria-hidden="true" /></a></div><span className="footer-note">Built with care. Open to possibility.</span></footer>; }


