import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { profile } from '../data/content';
import { toggleTheme } from '../hooks/theme';
import { Icon } from './Icon';
import './Nav.css';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#scoreboard', label: 'Scoreboard' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pendingTarget = useRef<string | null>(null);

  // The native modal dialog traps focus, makes the page inert and closes on Escape.
  // Here we only lock page scroll, restore focus, and scroll to a link chosen in the menu.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const onClose = () => {
      setOpen(false);
      document.body.style.overflow = '';
      menuButton.current?.focus();
      if (pendingTarget.current) {
        document.querySelector(pendingTarget.current)?.scrollIntoView();
        history.replaceState(null, '', pendingTarget.current);
        pendingTarget.current = null;
      }
    };
    el.addEventListener('close', onClose);
    return () => el.removeEventListener('close', onClose);
  }, []);

  const openMenu = () => {
    menu.current?.showModal();
    document.body.style.overflow = 'hidden';
    setOpen(true);
  };

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    pendingTarget.current = href;
    menu.current?.close();
  };

  return (
    <>
      <nav className="nav" aria-label="Main">
        <a href="#top" className="nav__logo">
          shane.
        </a>
        <div className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="nav__icon-btn"
            aria-label="Switch colour theme"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
          >
            <Icon name="moon" />
          </button>
          {profile.resume && (
            <a href={profile.resume} target="_blank" rel="noreferrer" className="nav__resume">
              Resume <Icon name="arrow-up-right" />
            </a>
          )}
          <button
            ref={menuButton}
            type="button"
            className="nav__icon-btn nav__menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={openMenu}
          >
            <Icon name="menu" />
          </button>
        </div>
      </nav>

      <dialog ref={menu} id="site-menu" className="menu" aria-label="Menu">
        <div className="menu__bar">
          <a href="#top" className="menu__logo" onClick={(e) => goTo(e, '#top')}>
            shane.
          </a>
          <button type="button" className="menu__close" aria-label="Close menu" onClick={() => menu.current?.close()}>
            <Icon name="close" />
          </button>
        </div>
        <ul className="menu__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => goTo(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {profile.resume && (
          <a href={profile.resume} target="_blank" rel="noreferrer" className="menu__resume">
            Resume <Icon name="arrow-up-right" />
          </a>
        )}
      </dialog>
    </>
  );
}
