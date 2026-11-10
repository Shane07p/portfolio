import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from './motion';

// The hero's full stop is a toy. Grab it and throw it: it flies with gravity, bounces off the hero's
// edges and squashes on impact. Anything marked [data-word] inside the hero is solid: the ball bounces
// off it (and can come to rest on top of it), and the word gets knocked, then springs back into place.
// A tap makes it hop. Left alone for a few seconds, it flies home and becomes the full stop again.
//
// `slot` is the full stop in the text (shown while the ball is home); `ball` is the free body that
// replaces it while in play. One rAF loop runs only while something moves; physics is sub-stepped and
// timers use real time, so a slow device stays correct rather than drifting into slow motion.
// Reduced motion: the full stop is plain text.

type Word = { el: HTMLElement; x: number; y: number; r: number; vx: number; vy: number; vr: number; live: boolean };
type Box = { l: number; t: number; w: number; h: number };
type Mode = 'home' | 'drag' | 'free' | 'return';

const GRAVITY = 2600; // px/s²
const EDGE_BOUNCE = 0.68; // restitution off the hero's edges
const WORD_BOUNCE = 0.5; // restitution off words
const SURFACE_GRIP = 6; // how quickly sliding along a floor or a word slows (per second)
const MAX_THROW = 4200; // px/s
const STILL_BEFORE_HOME = 2.6; // real seconds of near stillness before it flies home
const MAX_AWAY = 7; // real seconds in play before it flies home regardless
const STEP = 1 / 120; // physics sub-step

export function useFlingDot(
  heroRef: RefObject<HTMLElement | null>,
  slotRef: RefObject<HTMLElement | null>,
  ballRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current, slot = slotRef.current, ball = ballRef.current;
    if (!hero || !slot || !ball || prefersReducedMotion()) return;

    const words: Word[] = [...hero.querySelectorAll<HTMLElement>('[data-word]')].map((el) => ({
      el, x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, live: false,
    }));

    let mode: Mode = 'home';
    let x = 0, y = 0, vx = 0, vy = 0, R = 12;
    let px = 0, py = 0, moved = 0;
    let samples: { x: number; y: number; t: number }[] = [];
    let deform = 0, angle = 0; // >0 stretched along `angle`, <0 squashed against it
    let releasedAt = 0, stillSince = 0;
    let raf = 0, last = 0;

    const heroBox = () => hero.getBoundingClientRect();
    const slotCentre = () => {
      const h = heroBox(), s = slot.getBoundingClientRect();
      return { x: s.left - h.left + s.width / 2, y: s.top - h.top + s.height / 2, r: s.width / 2 };
    };

    const showBall = (on: boolean) => {
      ball.classList.toggle('is-active', on);
      slot.style.visibility = on ? 'hidden' : '';
    };

    const squash = (nx: number, ny: number, impact: number) => {
      deform = -Math.min(0.38, impact / 2800);
      angle = Math.atan2(ny, nx);
    };

    const knock = (w: Word, nx: number, ny: number, impact: number) => {
      w.vx -= nx * impact * 0.12;
      w.vy -= ny * impact * 0.12;
      w.vr += (Math.random() < 0.5 ? -1 : 1) * Math.min(impact * 0.015, 40);
      if (!w.live) {
        w.live = true;
        w.el.style.transition = 'none';
      }
    };

    // Sliding along a surface loses speed along it; `tx, ty` is the surface direction.
    const grip = (tx: number, ty: number, dt: number) => {
      const vt = vx * tx + vy * ty;
      const lose = vt * (1 - Math.exp(-SURFACE_GRIP * dt));
      vx -= lose * tx;
      vy -= lose * ty;
    };

    const edges = (W: number, H: number, dt: number) => {
      if (x < R) { x = R; if (vx < 0) { squash(1, 0, -vx); vx = -vx * EDGE_BOUNCE; } }
      if (x > W - R) { x = W - R; if (vx > 0) { squash(-1, 0, vx); vx = -vx * EDGE_BOUNCE; } }
      if (y < R) { y = R; if (vy < 0) { squash(0, 1, -vy); vy = -vy * EDGE_BOUNCE; } }
      if (y > H - R) {
        y = H - R;
        if (vy > 0) {
          if (vy > 160) squash(0, -1, vy);
          vy = vy < 120 ? 0 : -vy * EDGE_BOUNCE;
        }
        grip(1, 0, dt);
      }
    };

    // Words are solid: push the ball out, reflect it, knock the word, and add grip on contact.
    const collide = (w: Word, b: Box, dt: number) => {
      const bx = b.l + w.x, by = b.t + w.y;
      const cx = Math.max(bx, Math.min(x, bx + b.w)), cy = Math.max(by, Math.min(y, by + b.h));
      let nx = x - cx, ny = y - cy;
      let d = Math.hypot(nx, ny);
      if (d >= R) return;
      if (d < 0.001) {
        // Centre inside the box: leave along the shallowest side.
        const pens = [x - bx, bx + b.w - x, y - by, by + b.h - y];
        [nx, ny] = [[-1, 0], [1, 0], [0, -1], [0, 1]][pens.indexOf(Math.min(...pens))];
        d = 0;
      } else {
        nx /= d;
        ny /= d;
      }
      x += nx * (R - d);
      y += ny * (R - d);
      const vn = vx * nx + vy * ny;
      if (vn < 0) {
        vx -= (1 + WORD_BOUNCE) * vn * nx;
        vy -= (1 + WORD_BOUNCE) * vn * ny;
        if (-vn > 140) {
          knock(w, nx, ny, -vn);
          squash(nx, ny, -vn);
        } else if (-vn < 90) {
          // Resting contact: kill the tiny bounce so it can settle on the word.
          vx -= vn * nx * 0.5;
          vy -= vn * ny * 0.5;
        }
      }
      grip(-ny, nx, dt);
    };

    const freeStep = (dt: number, W: number, H: number, boxes: Box[]) => {
      vy += GRAVITY * dt;
      x += vx * dt;
      y += vy * dt;
      edges(W, H, dt);
      words.forEach((w, i) => collide(w, boxes[i], dt));
    };

    // A springy flight back to the full stop's place (which moves with the hero's parallax).
    const returnStep = (dt: number, home: { x: number; y: number; r: number }) => {
      const k = 140, c = 2 * Math.sqrt(k) * 0.9;
      vx += ((home.x - x) * k - vx * c) * dt;
      vy += ((home.y - y) * k - vy * c) * dt;
      x += vx * dt;
      y += vy * dt;
      R += (home.r - R) * Math.min(1, dt * 8);
    };

    const land = () => {
      mode = 'home';
      vx = vy = 0;
      showBall(false);
      slot.animate(
        [{ transform: 'scale(1.35, 0.7)' }, { transform: 'scale(0.9, 1.1)', offset: 0.6 }, { transform: 'none' }],
        { duration: 450, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
    };

    const springWords = (dt: number) => {
      let moving = false;
      for (const w of words) {
        if (!w.live) continue;
        w.vx += (-260 * w.x - 15 * w.vx) * dt;
        w.vy += (-260 * w.y - 15 * w.vy) * dt;
        w.vr += (-220 * w.r - 13 * w.vr) * dt;
        w.x += w.vx * dt;
        w.y += w.vy * dt;
        w.r += w.vr * dt;
        const settled = Math.abs(w.x) + Math.abs(w.y) + Math.abs(w.r) < 0.05 && Math.abs(w.vx) + Math.abs(w.vy) + Math.abs(w.vr) < 1;
        if (settled) {
          w.live = false;
          w.x = w.y = w.r = w.vx = w.vy = w.vr = 0;
          w.el.style.transform = '';
          w.el.style.transition = '';
        } else {
          moving = true;
        }
      }
      return moving;
    };

    const render = (dt: number) => {
      const speed = Math.hypot(vx, vy);
      const target = mode === 'free' || mode === 'return' ? Math.min(0.24, speed / 9000) : 0;
      deform += (target - deform) * Math.min(1, dt * 14);
      if (deform >= 0 && speed > 20) angle = Math.atan2(vy, vx);
      ball.style.width = ball.style.height = `${R * 2}px`;
      ball.style.transform = `translate(${x - R}px, ${y - R}px) rotate(${angle}rad) scale(${1 + deform}, ${1 - deform * 0.8})`;
      for (const w of words) {
        if (w.live) w.el.style.transform = `translate(${w.x.toFixed(2)}px, ${w.y.toFixed(2)}px) rotate(${w.r.toFixed(2)}deg)`;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const elapsed = Math.min(0.1, last ? (now - last) / 1000 : 1 / 60);
      last = now;
      const h = heroBox();
      // Read every word's box before writing any transform, so a frame lays out once.
      const boxes: Box[] = words.map((w) => {
        const b = w.el.getBoundingClientRect();
        return { l: b.left - h.left - w.x, t: b.top - h.top - w.y, w: b.width, h: b.height };
      });
      const home = mode === 'return' ? slotCentre() : null;

      let wordsMoving = false;
      const steps = Math.max(1, Math.ceil(elapsed / STEP));
      const dt = elapsed / steps;
      for (let i = 0; i < steps; i++) {
        if (mode === 'drag') {
          const k = Math.min(1, dt * 28);
          const nx = x + (px - x) * k, ny = y + (py - y) * k;
          vx = (nx - x) / dt;
          vy = (ny - y) / dt;
          x = nx;
          y = ny;
        } else if (mode === 'free') {
          freeStep(dt, h.width, h.height, boxes);
        } else if (mode === 'return' && home) {
          returnStep(dt, home);
        }
        wordsMoving = springWords(dt);
      }

      if (mode === 'free') {
        const t = performance.now();
        if (Math.hypot(vx, vy) > 60) stillSince = t;
        if (t - stillSince > STILL_BEFORE_HOME * 1000 || t - releasedAt > MAX_AWAY * 1000) mode = 'return';
      } else if (mode === 'return' && home && Math.hypot(home.x - x, home.y - y) < 1.2 && Math.hypot(vx, vy) < 30) {
        land();
      }

      render(elapsed);
      if (mode !== 'home' || wordsMoving) raf = requestAnimationFrame(frame);
    };

    const run = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const pointer = (e: PointerEvent) => {
      const h = heroBox();
      return { x: e.clientX - h.left, y: e.clientY - h.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = pointer(e);
      moved += Math.hypot(p.x - px, p.y - py);
      px = p.x;
      py = p.y;
      const t = performance.now();
      samples.push({ x: px, y: py, t });
      samples = samples.filter((s) => t - s.t < 100);
    };

    const release = () => {
      if (moved < 6) {
        // A tap: hop.
        vx = (Math.random() - 0.5) * 700;
        vy = -1500;
        return;
      }
      const a = samples[0], b = samples.at(-1);
      if (!a || !b || a === b) return;
      const span = Math.max(0.016, (b.t - a.t) / 1000);
      vx = (b.x - a.x) / span;
      vy = (b.y - a.y) / span;
      const s = Math.hypot(vx, vy);
      if (s > MAX_THROW) {
        vx *= MAX_THROW / s;
        vy *= MAX_THROW / s;
      }
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      release();
      mode = 'free';
      releasedAt = stillSince = performance.now();
      run();
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      slot.classList.add('is-touched'); // the idle hint stops for good
      const p = pointer(e);
      px = p.x;
      py = p.y;
      if (mode === 'home') {
        const s = slotCentre();
        x = s.x;
        y = s.y;
        // Big enough to grab on a phone, where the full stop itself is tiny.
        R = Math.max(s.r, window.matchMedia('(pointer: coarse)').matches ? 14 : 10);
        vx = vy = 0;
        showBall(true);
      }
      mode = 'drag';
      moved = 0;
      samples = [{ x: px, y: py, t: performance.now() }];
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      run();
    };

    slot.addEventListener('pointerdown', onDown);
    ball.addEventListener('pointerdown', onDown);

    return () => {
      cancelAnimationFrame(raf);
      slot.removeEventListener('pointerdown', onDown);
      ball.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      words.forEach((w) => {
        w.el.style.transform = '';
        w.el.style.transition = '';
      });
      showBall(false);
    };
  }, [heroRef, slotRef, ballRef]);
}
