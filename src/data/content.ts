// Site data: profile, projects, ratings, timeline, links. Images: drop files in /public/images and
// set the `image` paths (e.g. '/images/studspace.png'). Unset images render as labelled placeholders.

export const profile = {
  name: 'Shane Christian',
  email: 'shanechristian777@gmail.com',
  resume: '/Shane_Christian_Resume.pdf',
  city: 'Ahmedabad',
  availability: 'Open to SDE internships · Summer 2027',
  roles: 'Backend engineer / Competitive programmer',
  pitch: 'I build REST APIs that stay fast under load, then load-test them until the numbers hold.',
  portrait: undefined as string | undefined,
  github: { user: 'Shane07p', url: 'https://github.com/Shane07p' },
  linkedin: 'https://www.linkedin.com/in/shane-christian-7a928031a/',
  discord: 'soulvenom6772',
};

export const marquee = [
  'Backend engineer',
  'Competitive programmer',
  'Codeforces Expert',
  'ICPC Regionalist',
  'Spring Boot',
  'PostgreSQL',
  'LeetCode Knight',
  'DA-IICT ’28',
];

export type Project = {
  name: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  bullets: string[];
  stack: string;
  links: { label: string; href: string }[];
  image?: string;
};

export const projects: Project[] = [
  {
    name: 'StudSpace',
    tagline:
      'An academic workspace for university students, with semesters, attendance, a CGPA calculator and a PDF-aware AI study assistant.',
    metric: '163→25ms',
    metricLabel: 'dashboard p95',
    bullets: [
      '44-endpoint Spring Boot REST API across 11 modules over a 9-table PostgreSQL 16 schema, on Docker Compose and Azure behind Nginx with HTTPS.',
      'Cut dashboard p95 from 163ms to 25ms by collapsing an N+1 (17 to 6 queries). Nginx upstream keepalive and HikariCP tuning tripled throughput to 4,800 req/s at 0% errors on k6.',
      'Stateless JWT and Google OAuth2, Bucket4j rate limiting, magic-byte upload validation; Groq LLaMA 3.3 70B and Google Gemini power the study assistant.',
    ],
    stack: 'Java · Spring Boot · PostgreSQL · Docker · Azure · JWT · OAuth2 · LLM APIs',
    links: [
      { label: 'Live', href: 'https://studspace.shane07p.me/' },
      { label: 'Source', href: 'https://github.com/shane07p/StudSpace' },
    ],
  },
  {
    name: 'UrbanServe',
    tagline:
      'The REST API and database behind a hyperlocal home-services marketplace: browse, book, assign, pay, review.',
    metric: '22 tables',
    metricLabel: 'BCNF · RLS on all',
    bullets: [
      '22-table BCNF PostgreSQL schema across 7 modules, containerized with Docker and deployed on Render with managed Supabase.',
      'Materialized views and PL/pgSQL triggers replaced multi-table analytics JOINs with single-table lookups and keep ratings current; 30+ query-driven indexes.',
      'Booking stored procedure commits booking, item and status log atomically; Row-Level Security on every table locks the auto-generated public API.',
    ],
    stack: 'Java · Spring Boot · PostgreSQL · PL/pgSQL · Supabase · Render · Swagger',
    links: [
      { label: 'Live API', href: 'https://urbanserve.shane07p.me/swagger-ui/index.html' },
      { label: 'Source', href: 'https://github.com/shane07p/UrbanServe-Home-Services-Database-System' },
    ],
  },
  {
    name: 'GeoNav',
    tagline: 'A geospatial routing engine in Java with Dijkstra, A* and a QuadTree spatial index.',
    metric: '3× faster',
    metricLabel: 'A* vs Dijkstra, 100K nodes',
    bullets: [
      'Dijkstra and A* with a Haversine heuristic; on 100K nodes and 400K edges, A* ran 3× faster.',
      'QuadTree spatial index with branch-and-bound pruning for O(log n) nearest-neighbor queries, 11.9× faster than a linear scan.',
      'Console app with runtime algorithm switching, multi-stop routing and live map editing from validated seed files.',
    ],
    stack: 'Java · OOP · Graph algorithms · A* · QuadTree · Strategy pattern',
    links: [{ label: 'Source', href: 'https://github.com/shane07p/GeoNav' }],
  },
];

export const proof = {
  before: [
    { v: '25ms', l: 'StudSpace dashboard p95, down from 163ms' },
    { v: '4.8K', l: 'req/s sustained at 0% errors on k6' },
  ],
  // The live Codeforces rating sits between these two groups.
  after: [{ v: '#64', l: 'ICPC Asia Amritapuri Regionals 2025' }],
};

export const codeforces = {
  handle: 'Raze07',
  url: 'https://codeforces.com/profile/Raze07',
  note: 'Top 350 in India',
  scale: 3000,
  // Shown until (or if) the live API responds.
  fallback: { rating: 1840, rank: 'expert', maxRating: 1840 },
};

export const platforms = [
  { platform: 'LeetCode', handle: 'shane07', href: 'https://leetcode.com/u/shane07/', rating: 2117, scale: 3200, title: 'Knight', note: 'Top 1.44% globally' },
  { platform: 'CodeChef', handle: 'valve_truth_33', href: 'https://www.codechef.com/users/valve_truth_33', rating: 1911, scale: 3000, title: '4 Star', note: 'Peak rating' },
];

export type Milestone = {
  kind: string;
  title: string;
  detail: string;
  stat: string;
  of: string;
  // Placement within the field: rank / total drives the marker position.
  field?: { rank: number; total: number; top: string; label: string };
  post?: { url: string; image?: string };
};

// TODO: swap LINKEDIN_ACTIVITY for the direct URL of each post.
const LINKEDIN_ACTIVITY = 'https://www.linkedin.com/in/shane-christian-7a928031a/recent-activity/all/';

export const timeline: { year: string; items: Milestone[] }[] = [
  {
    year: '2026',
    items: [
      { kind: 'Quant', title: 'AMS Derive’26, Posterior Round', detail: 'Top 50 finalist, invited to IIT Bombay.', stat: '#27', of: 'of 50 finalists', field: { rank: 27, total: 50, top: 'Finalist', label: '50 finalists' }, post: { url: LINKEDIN_ACTIVITY } },
      { kind: 'Quant', title: 'AMS Derive’26, Prior Round', detail: 'Qualified for the posterior round.', stat: '#45', of: 'of 2,500+', field: { rank: 45, total: 2500, top: 'Top 1.8%', label: '2,500+ participants' } },
    ],
  },
  {
    year: '2025',
    items: [
      { kind: 'ICPC', title: 'ICPC Asia Amritapuri Regionals', detail: 'Regional onsite round.', stat: '#64', of: 'of 307 teams', field: { rank: 64, total: 307, top: 'Top 21%', label: '307 qualifying teams' }, post: { url: LINKEDIN_ACTIVITY } },
      { kind: 'ICPC', title: 'ICPC Online Preliminary Round', detail: 'Qualified for regionals.', stat: '#110', of: 'of 2,500+ teams', field: { rank: 110, total: 2500, top: 'Top 4.4%', label: '2,500+ teams' } },
    ],
  },
  {
    year: '2024',
    items: [
      { kind: 'Entrance', title: 'JEE Advanced 2024', detail: 'All India Rank.', stat: '5594', of: 'of 250,000', field: { rank: 5594, total: 250000, top: 'Top 2.2%', label: '250,000 candidates' } },
      { kind: 'Entrance', title: 'JEE Mains 2024', detail: '99.56 percentile, All India Rank.', stat: '7166', of: 'of 1.5 million', field: { rank: 7166, total: 1500000, top: 'Top 0.5%', label: '1.5M candidates' } },
    ],
  },
  {
    year: 'Ever',
    items: [
      { kind: 'Campus', title: 'Winner of 3 institute CP contests', detail: 'Blitz Cup, Robin Relay and Inter-Wing.', stat: '3', of: 'contest wins' },
    ],
  },
];

export const experience = [
  {
    org: 'Programming Club',
    role: 'Core Member · Problem Setter, Contest Organizer & Mentor',
    when: 'Apr 2026 – Now',
    where: 'DA-IICT',
    bullets: [
      'Co-organized 5 CP contests; handled problem setting, testing, and mentored juniors.',
      'Designed pre-placement DSA assessments for 250+ students.',
      'Coordinated Synapse’26 Codemutant and i.Fest’25 iRelay for 100+ participants.',
    ],
  },
  {
    org: 'Quant Club',
    role: 'Founding Core Member',
    when: 'Oct 2026 – Now',
    where: 'DA-IICT',
    bullets: ['Part of the founding team of the institute’s new quant club, started this academic year.'],
  },
];

export const skills = [
  { group: 'Languages', items: ['C', 'C++', 'Java', 'Python', 'SQL'] },
  { group: 'Frameworks', items: ['Spring Boot', 'Spring Data JPA', 'Hibernate', 'Spring Security'] },
  { group: 'Data & Cloud', items: ['PostgreSQL', 'Supabase', 'Azure', 'DigitalOcean', 'Render', 'Cloudinary'] },
  { group: 'Tools', items: ['Git', 'GitHub Actions', 'Linux', 'Docker', 'Maven', 'Nginx', 'Postman', 'Swagger', 'k6', 'PgAdmin'] },
  { group: 'Core CS', items: ['DSA', 'OOP', 'DBMS', 'Operating Systems'] },
];

// Shown until (or if) the live GitHub API responds.
export const githubFallback = {
  publicRepos: 16,
  followers: 36,
  repos: [
    { name: 'StudSpace', desc: 'Full-stack academic workspace: semesters, attendance, CGPA and an AI study assistant.', lang: 'JavaScript', stars: 2, url: 'https://github.com/Shane07p/StudSpace', updated: '' },
    { name: 'GeoNav', desc: 'Geospatial routing engine: Dijkstra & A*, QuadTree spatial indexing.', lang: 'Java', stars: 2, url: 'https://github.com/Shane07p/GeoNav', updated: '' },
    { name: 'UrbanServe-Home-Services-Database-System', desc: 'PostgreSQL database for an on-demand home services marketplace.', lang: 'Java', stars: 1, url: 'https://github.com/Shane07p/UrbanServe-Home-Services-Database-System', updated: '' },
  ],
};

export const showGallery = true;

export const gallery: { cap: string; placeholder: string; width: string; tilt: string; image?: string }[] = [
  { cap: 'ICPC Asia Amritapuri Regionals, 2025', placeholder: 'ICPC Asia Amritapuri Regionals', width: 'clamp(280px,36vw,560px)', tilt: '-1.2deg' },
  { cap: 'AMS Derive’26 finals, IIT Bombay', placeholder: 'AMS Derive finals, IIT Bombay', width: 'clamp(220px,24vw,360px)', tilt: '1deg' },
  { cap: 'Programming Club contest night', placeholder: 'Programming Club contest', width: 'clamp(260px,30vw,460px)', tilt: '-.6deg' },
  { cap: 'Team', placeholder: 'Team photo', width: 'clamp(220px,22vw,340px)', tilt: '1.4deg' },
  { cap: 'Quant Club, founding team', placeholder: 'Quant Club', width: 'clamp(280px,34vw,520px)', tilt: '-1deg' },
  { cap: 'DA-IICT campus', placeholder: 'Campus', width: 'clamp(220px,26vw,400px)', tilt: '.8deg' },
];

export const about = {
  headline: 'Graphs and trees came first.',
  headlineAccent: 'Then the systems that serve them.',
  body: 'I’m a B.Tech ICT student at Dhirubhai Ambani University (formerly DA-IICT), Gandhinagar. Competitive programming got me into engineering; now I design normalized schemas, profile queries and load-test APIs with k6 until the numbers hold.',
  stats: [
    { v: '9.16', l: 'CGPA' },
    { v: '1.5K+', l: 'problems solved' },
    { v: '2', l: 'clubs, core team' },
  ],
  badge: 'DA-IICT · B.TECH ICT · CLASS OF 2028 ·',
  now: [
    'Exploring agentic AI, building on the LLM features in StudSpace',
    'Setting and testing problems for Programming Club contests',
    'Helping start the Quant Club as a founding core member',
  ],
};
