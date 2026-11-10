import { experience } from '../data/content';
import { DisplayHeading } from './DisplayHeading';
import './Roles.css';

export function Roles() {
  return (
    <section id="experience" className="section section--sm">
      <div className="section-head">
        <DisplayHeading size="md">Roles</DisplayHeading>
      </div>
      <div className="rule-top">
        {experience.map((e) => (
          <div key={e.org} className="roles__item">
            <div>
              <h3 className="roles__org">{e.org}</h3>
              <p className="roles__role">{e.role}</p>
              <p className="mono-label roles__when">
                {e.when} · {e.where}
              </p>
            </div>
            <ul className="arrow-list roles__bullets">
              {e.bullets.map((b) => (
                <li key={b} className="arrow-row">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
