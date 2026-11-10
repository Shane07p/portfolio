import { exploring, profile } from '../data/content';
import { Icon } from './Icon';
import './NowBuilding.css';

export function NowBuilding() {
  return (
    <section className="now" aria-label="What I’m exploring">
      <p className="now__title">
        {exploring.lead} <span className="now__accent">{exploring.accent}</span>
      </p>
      <a href={profile.github.url} target="_blank" rel="noreferrer" className="now__link">
        Follow on GitHub <Icon name="arrow-up-right" />
      </a>
    </section>
  );
}
