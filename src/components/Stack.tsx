import { skills } from '../data/content';
import { DisplayHeading } from './DisplayHeading';
import './Stack.css';

export function Stack() {
  return (
    <section id="stack" className="section section--sm">
      <div className="section-head">
        <DisplayHeading size="md">Stack</DisplayHeading>
      </div>
      <ul className="stack__list">
        {skills.map((s) => (
          <li key={s} className="stack__chip">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
