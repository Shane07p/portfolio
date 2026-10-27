import { useEffect, useRef, useState } from 'react';
import { codeforces, profile } from '../data/content';
import './Contact.css';

const socials = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github.url },
  { label: 'Codeforces', href: codeforces.url },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(profile.email)
      .then(() => {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  return (
    <section id="contact" className="contact">
      <div data-reveal="" className="contact__label">
        Contact · Open to SDE internships, Summer 2027
      </div>
      <h2 className="contact__title">
        <span className="contact__line">
          <span data-rise="">Let’s build</span>
        </span>
        <span className="contact__line contact__line--last">
          <span data-rise="" style={{ transitionDelay: '.1s' }}>
            something <span className="contact__accent">fast.</span>
          </span>
        </span>
      </h2>

      <div data-reveal="" className="contact__email-row">
        <a href={`mailto:${profile.email}`} className="contact__email">
          {profile.email}
        </a>
        <button type="button" className="contact__copy" onClick={copyEmail}>
          {copied ? 'Copied ✓' : 'Copy email'}
        </button>
        <span className="sr-only" role="status">
          {copied ? 'Email address copied' : ''}
        </span>
      </div>

      <div data-reveal="" className="contact__links">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="contact__link">
            {s.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
        <div className="contact__link">
          Discord <span className="contact__discord">{profile.discord}</span>
        </div>
      </div>

      <div aria-hidden="true" className="contact__wordmark">
        shane.
      </div>

      <footer className="contact__footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.city}, India</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
