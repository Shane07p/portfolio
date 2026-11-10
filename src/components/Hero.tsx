import { useEffect, useRef, useState } from 'react';
import { hero } from '../data/content';
import { prefersReducedMotion } from '../hooks/motion';
import { useFlingDot } from '../hooks/useFlingDot';
import { Icon } from './Icon';
import { MeshCanvas } from './MeshCanvas';
import './Hero.css';

const delay = (i: number) => ({ transitionDelay: `${(i * 0.06).toFixed(2)}s` });
const greetingWords = hero.greeting.split(' ');

// One word of the headline changes every 2.2s: the old word slides up out of its mask as the next
// rises in. Three rounds, then it rests on the first word. Phones and reduced motion keep the first
// word. All words share one grid cell, so the line never changes width while it turns.
function RotatingWord({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [{ on, out }, setState] = useState({ on: 0, out: -1 });

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length < 2 || prefersReducedMotion() || !window.matchMedia('(min-width: 640px)').matches) return;
    const total = words.length * 3;
    let shown = 0, timer = 0, visible = false;
    const step = () => {
      if (!visible || shown >= total) return;
      shown++;
      setState((s) => ({ on: (s.on + 1) % words.length, out: s.on }));
      if (shown < total) timer = window.setTimeout(step, 2200);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      clearTimeout(timer);
      if (visible && shown < total) timer = window.setTimeout(step, 2200);
    });
    io.observe(el);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [words]);

  return (
    <span ref={ref} className="rotor" aria-hidden="true">
      {words.map((w, i) => (
        <span key={w} className={i === on ? 'rotor__w is-on' : i === out ? 'rotor__w is-out' : 'rotor__w'}>
          {w}.
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useFlingDot(heroRef, slotRef, ballRef);

  // Once the words have risen in, the lines stop clipping so knocked words can move freely.
  useEffect(() => {
    const t = window.setTimeout(() => setLive(true), 1700);
    return () => clearTimeout(t);
  }, []);

  // Parallax: the statement drifts down and fades, the mesh drifts slower and zooms.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY, vh = window.innerHeight;
      if (y > vh * 1.3) return;
      if (topRef.current) {
        topRef.current.style.transform = `translate3d(0,${y * 0.32}px,0)`;
        topRef.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.85)));
      }
      if (meshRef.current) {
        meshRef.current.style.transform = `translate3d(0,${y * 0.18}px,0) scale(${1 + (y / vh) * 0.08})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const n = greetingWords.length;

  return (
    <section id="top" ref={heroRef} className="hero">
      <div ref={meshRef} className="hero__mesh">
        <MeshCanvas />
      </div>
      <div className="hero__shade" />

      <div ref={topRef} className="hero__top">
        <h1 className={live ? 'hero__title is-live' : 'hero__title'}>
          <span className="hero__line">
            {greetingWords.map((w, i) =>
              i < n - 1 ? (
                <span key={w} data-rise="" data-word="" style={delay(i)}>
                  {w}
                </span>
              ) : (
                // The last word's full stop is the toy: drawn as a dot, read as a full stop.
                <span key={w} data-rise="" data-word="" style={delay(i)}>
                  {w.replace(/\.$/, '')}
                  <span className="sr-only">.</span>
                  <span ref={slotRef} className="hero__dot" data-cursor="Fling" aria-hidden="true" />
                </span>
              ),
            )}
          </span>
          <span className="hero__line">
            <span data-rise="" data-word="" style={delay(n)}>
              {hero.lead}
            </span>
          </span>
          <span className="hero__line hero__line--accent">
            <span data-rise="" data-word="" style={delay(n + 1)}>
              <span className="sr-only">{hero.words[0]}.</span>
              <RotatingWord words={hero.words} />
            </span>
          </span>
        </h1>
      </div>

      <div className="hero__bottom">
        <p className="hero__pitch">{hero.line}</p>
        <div className="hero__ctas">
          <a href="#work" className="btn btn--solid" data-word="">
            See the work <Icon name="arrow-down" />
          </a>
          <a href="#contact" className="btn btn--ghost" data-word="">
            Get in touch
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="hero__scroll">
        Scroll
      </div>
      <div ref={ballRef} className="hero__ball" data-cursor="Fling" aria-hidden="true" />
    </section>
  );
}
