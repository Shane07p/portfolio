import { codeforces, proof } from '../data/content';
import type { CfUser } from '../hooks/useLiveStats';
import './Proof.css';

export function Proof({ cf }: { cf: CfUser | null }) {
  const cfStat = {
    v: String(cf?.rating ?? codeforces.fallback.rating),
    l: cf ? 'Codeforces rating, live' : 'Codeforces peak rating, Expert',
  };
  const stats = [...proof.before, cfStat, ...proof.after];

  return (
    <section className="proof" aria-label="Highlights">
      <div className="proof__grid">
        {stats.map((s, i) => (
          <div key={s.l} data-reveal="" className="proof__cell" style={{ transitionDelay: `${i * 0.06}s` }}>
            <div className="proof__value">{s.v}</div>
            <div className="proof__label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
