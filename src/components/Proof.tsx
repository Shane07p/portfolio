import { codeforces, proof } from '../data/content';
import type { CfUser } from '../hooks/useLiveStats';
import './Proof.css';

export function Proof({ cf }: { cf: CfUser | null }) {
  const rank = cf?.rank || codeforces.fallback.rank;
  const cfStat = {
    v: String(cf?.rating ?? codeforces.fallback.rating),
    l: `Codeforces rating (${rank.charAt(0).toUpperCase()}${rank.slice(1)})`,
  };
  const stats = [...proof.before, cfStat, ...proof.after];

  return (
    <section className="proof" aria-label="Highlights">
      <dl className="proof__grid">
        {stats.map((s) => (
          <div key={s.l} className="proof__cell">
            <dt className="proof__label">{s.l}</dt>
            <dd className="proof__value num">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
