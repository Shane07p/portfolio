import { profile } from '../data/content';
import './NowBuilding.css';

export function NowBuilding() {
  return (
    <section className="now" aria-label="Now building">
      <div data-reveal="" className="now__inner">
        <div>
          <div className="now__label">
            <span className="now__dot" />
            Now building
          </div>
          <p className="now__title">
            Currently exploring
            <br />
            <span className="now__accent">agentic AI systems.</span>
          </p>
        </div>
        <a href={profile.github.url} target="_blank" rel="noreferrer" className="now__link">
          Follow on GitHub ↗
        </a>
      </div>
    </section>
  );
}
