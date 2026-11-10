import { useState } from 'react';
import { projects } from '../data/content';
import { DisplayHeading } from './DisplayHeading';
import { Icon } from './Icon';
import './Work.css';

// Accordion: each project name is a button inside its heading. Hover, click, Enter or Space opens it.
export function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="section section--lg">
      <div className="section-head">
        <DisplayHeading>
          Work<sup>({String(projects.length).padStart(2, '0')})</sup>
        </DisplayHeading>
        <p className="mono-label work__hint">Hover or tap a project to open it</p>
      </div>

      <div className="rule-top">
        {projects.map((p, i) => {
          const open = i === active;
          const panelId = `project-${i}`;
          return (
            <article key={p.name} className={open ? 'work__item is-open' : 'work__item'}>
              <h3 className="work__heading">
                <button
                  type="button"
                  className="work__row"
                  data-cursor="Open"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="work__num num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="work__name">{p.name}</span>
                  <span className="work__meta">
                    <span className="work__kind">{p.kind}</span>
                    {p.status ? <span className="work__status">{p.status}</span> : <span className="work__year num">{p.year}</span>}
                  </span>
                </button>
              </h3>

              <div className="work__expand" id={panelId} inert={!open}>
                <div className="work__expand-inner">
                  <div className="work__body">
                    <div className="work__text">
                      <p className="work__summary">{p.summary}</p>
                      <div className="work__block">
                        <h4 className="work__label">What it’s for</h4>
                        <p>{p.purpose}</p>
                      </div>
                      <div className="work__block">
                        <h4 className="work__label">What it does</h4>
                        <ul className="arrow-list work__features">
                          {p.features.map((f) => (
                            <li key={f} className="arrow-row">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="work__block">
                        <h4 className="work__label">How it’s built</h4>
                        <p>{p.build}</p>
                      </div>
                      <ul className="work__stack" aria-label="Built with">
                        {p.stack.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <div className="work__links">
                        {p.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="work__link">
                            {l.label} <Icon name="arrow-up-right" />
                          </a>
                        ))}
                      </div>
                    </div>
                    {p.image && (
                      <div className="work__shot">
                        <img className="cover-img" src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                      </div>
                    )}
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
