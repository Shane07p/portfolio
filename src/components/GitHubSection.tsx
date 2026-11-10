import { githubFallback, profile } from '../data/content';
import { toRepoCards, type GitHubStats } from '../hooks/useLiveStats';
import { DisplayHeading } from './DisplayHeading';
import { Icon } from './Icon';
import './GitHubSection.css';

export function GitHubSection({ github }: { github: GitHubStats | null }) {
  const stats = github ?? githubFallback;
  const repos = github?.repos ?? toRepoCards();
  const { user, url } = profile.github;

  return (
    <section id="github" className="section section--sm">
      <div className="section-head section-head--tight">
        <DisplayHeading size="md">GitHub</DisplayHeading>
        <dl className="gh__counts">
          <div>
            <dt className="gh__count-label">public repos</dt>
            <dd className="gh__count-value num">{stats.publicRepos}</dd>
          </div>
          <div>
            <dt className="gh__count-label">followers</dt>
            <dd className="gh__count-value num">{stats.followers}</dd>
          </div>
        </dl>
      </div>

      <div className="gh__chart">
        <div className="gh__chart-head">
          <span>Contributions, last 12 months</span>
          <a href={url} target="_blank" rel="noreferrer">
            @{user} <Icon name="arrow-up-right" />
          </a>
        </div>
        <img
          src={`https://ghchart.rshah.org/7C4DEB/${user}`}
          alt={`GitHub contribution chart for ${user}`}
          width="663"
          height="104"
          loading="lazy"
        />
      </div>

      <div className="gh__repos">
        {repos.map((r) => (
          <a key={r.name} href={r.url} target="_blank" rel="noreferrer" className="gh__repo">
            <div className="gh__repo-head">
              <span className="gh__repo-name">{r.name}</span>
              <span className="gh__repo-stars num" aria-label={`${r.stars} stars`}>
                <Icon name="star" /> {r.stars}
              </span>
            </div>
            <p className="gh__repo-desc">{r.desc}</p>
            <div className="gh__repo-foot">
              <span>{r.lang}</span>
              <span>{r.updated}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
