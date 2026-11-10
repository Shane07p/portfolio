import { about, profile } from '../data/content';
import './About.css';

export function About() {
  return (
    <section id="about" className="section">
      <div className="about__grid">
        <div className="about__photo">
          <div aria-hidden="true" className="about__shadow" />
          <div className="about__frame">
            {profile.portrait && (
              <img className="cover-img" src={profile.portrait} alt={`Portrait of ${profile.name}`} width="1000" height="1250" loading="lazy" />
            )}
          </div>
          <div aria-hidden="true" className="about__badge">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="about-ring" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text fontSize="10.5" letterSpacing="2.6">
                <textPath href="#about-ring">{about.badge}</textPath>
              </text>
            </svg>
            <span className="about__badge-year">’28</span>
          </div>
        </div>

        <div className="about__text">
          <h2 className="about__headline">
            {about.headline}
            <span className="about__headline-sub">{about.headlineAccent}</span>
          </h2>
          <div className="about__body">
            {about.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <dl className="about__stats">
            {about.stats.map((s) => (
              <div key={s.l} className="about__stat">
                <dt className="about__stat-label">{s.l}</dt>
                <dd className="about__stat-value num">{s.v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="about__now-label">Right now</h3>
            <ul className="arrow-list">
              {about.now.map((w) => (
                <li key={w} className="arrow-row about__now-item">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
