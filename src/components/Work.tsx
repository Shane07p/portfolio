import { useState } from 'react';
import { projects } from '../data/content';
import { DisplayHeading } from './DisplayHeading';
import { ImageSlot } from './ImageSlot';
import './Work.css';

// Accordion: hovering, clicking or keyboard-activating a row opens that project.
export function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="section section--lg">
      <div className="section-head">
        <DisplayHeading>
          Work<sup>({String(projects.length).padStart(2, '0')})</sup>
        </DisplayHeading>
        <div data-reveal="" className="mono-label work__hint">
          Hover or tap a project to open it
        </div>
      </div>

      <div className="rule-top">
        {projects.map((p, i) => {
          const open = i === active;
          const panelId = `project-${i}`;
          return (
            <article
              key={p.name}
              data-reveal=""
              data-cursor="Open"
              className={open ? 'work__item is-open' : 'work__item'}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <div
                className="work__row"
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-controls={panelId}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <span className="work__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="work__name">{p.name}</h3>
                <div className="work__metric">
                  <div className="work__metric-value">{p.metric}</div>
                  <div className="work__metric-label">{p.metricLabel}</div>
                </div>
              </div>

              <div className="work__expand" id={panelId} inert={!open}>
                <div className="work__expand-inner">
                  <div className="work__body">
                    <div className="work__text">
                      <p className="work__tagline">{p.tagline}</p>
                      <ul className="arrow-list work__bullets">
                        {p.bullets.map((b) => (
                          <li key={b} className="arrow-row">
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="work__stack">{p.stack}</div>
                      <div className="work__links">
                        {p.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="work__link">
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="work__shot">
                      <ImageSlot src={p.image} alt={`${p.name} screenshot`} placeholder={`Drop a ${p.name} screenshot`} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
