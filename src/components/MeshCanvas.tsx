import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/motion';

// Slowly drifting radial blobs behind the hero. Drawn at quarter resolution and blurred in CSS, so it
// stays cheap; pauses while off-screen. The pointer belongs to the hero's spotlight, not to this.
const BLOBS = [
  { c: '#8B5CF6', x: 0.2, y: 0.3, r: 0.55, sx: 0.13, sy: 0.17, p: 0 },
  { c: '#5B3DF5', x: 0.75, y: 0.2, r: 0.5, sx: 0.11, sy: 0.09, p: 2 },
  { c: '#E05CC8', x: 0.6, y: 0.75, r: 0.45, sx: 0.15, sy: 0.12, p: 4 },
  { c: '#3FA7FF', x: 0.9, y: 0.6, r: 0.4, sx: 0.09, sy: 0.14, p: 1 },
  { c: '#C4B5FD', x: 0.35, y: 0.85, r: 0.35, sx: 0.17, sy: 0.1, p: 3 },
  { c: '#2A1466', x: 0.05, y: 0.9, r: 0.5, sx: 0.08, sy: 0.08, p: 5 },
];

export function MeshCanvas({ speed = 1 }: { speed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = prefersReducedMotion();
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const draw = (now: number) => {
      raf = 0;
      const t = ((now - t0) / 1000) * speed;
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = '#3B1E9E';
      ctx.fillRect(0, 0, w, h);
      for (const b of BLOBS) {
        const x = (b.x + Math.sin(t * b.sx + b.p) * 0.18) * w;
        const y = (b.y + Math.cos(t * b.sy + b.p) * 0.2) * h;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r * Math.max(w, h));
        g.addColorStop(0, b.c);
        g.addColorStop(1, `${b.c}00`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = Math.max(200, canvas.offsetWidth / 4);
      canvas.height = Math.max(120, canvas.offsetHeight / 4);
      kick();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });

    resize();
    io.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [speed]);

  return <canvas ref={ref} />;
}
