import { skills } from '../data/content';
import { DisplayHeading } from './DisplayHeading';
import './Stack.css';

export function Stack() {
  return (
    <section id="stack" className="section">
      <div className="section-head">
        <DisplayHeading>Stack</DisplayHeading>
      </div>
      <div className="rule-top">
        {skills.map((s) => (
          <div key={s.group} data-reveal="" className="stack__row">
            <h3 className="mono-label stack__group">{s.group}</h3>
            <ul className="stack__items">
              {s.items.map((item) => (
                <li key={item} className="stack__item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
