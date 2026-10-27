import { about, profile } from '../data/content';
import { ImageSlot } from './ImageSlot';
import './About.css';

export function About() {
  return (
    <section id="about" className="section">
      <div className="about__grid">
        <div data-reveal="" className="about__photo">
          <div aria-hidden="true" className="about__shadow" />
          <div className="about__frame">
            <ImageSlot src={profile.portrait} alt={`Portrait of ${profile.name}`} placeholder="Drop your photo" />
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
          <div data-reveal="" className="about__label">
            About
          </div>
          <h2 data-reveal="" className="about__headline">
            {about.headline} <span>{about.headlineAccent}</span>
          </h2>
          <p data-reveal="" className="about__body">
            {about.body}
          </p>
          <div data-reveal="" className="about__stats">
            {about.stats.map((s) => (
              <div key={s.l} className="about__stat">
                <div className="about__stat-value">{s.v}</div>
                <div className="about__stat-label">{s.l}</div>
              </div>
            ))}
          </div>
          <div data-reveal="">
            <div className="about__now-label">Right now</div>
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
