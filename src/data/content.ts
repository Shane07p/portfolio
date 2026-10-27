// Site data: profile, projects, ratings, timeline, links. Images: drop files in /public/images and
// set the `image` paths (e.g. '/images/studspace.webp'). Anything without an image simply hides it.

export const profile = {
  name: 'Shane Christian',
  email: 'shanechristian777@gmail.com',
  // Google Drive link to the resume. The nav's Resume button stays hidden while this is empty.
  resume: 'https://drive.google.com/file/d/1J0jA4dMs5DYmk7uuvB6jjvBlBtl8aX6Y/view?usp=sharing',
  city: 'Ahmedabad',
  availability: 'Open to SDE internships · Summer 2027',
  roles: 'Backend engineer / Competitive programmer',
  pitch: 'I build REST APIs that stay fast under load, then load-test them until the numbers hold.',
  portrait: '/images/portrait.webp' as string | undefined,
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
  // Set for unfinished work: shown as a tag in place of the headline metric.
  status?: string;
  // Who/what it was built for, when that isn't just "me", e.g. a course team project.
  context?: string;
  tagline: string;
  metric?: string;
  metricLabel?: string;
  points: { head: string; body: string }[];
  stack: string;
  links: { label: string; href: string }[];
  image?: string;
};

export const projects: Project[] = [
  {
    name: 'StudSpace',
    tagline:
      'One place for PYQs, notes, playlists and the 75% attendance maths, plus an AI assistant that answers from your own course PDFs.',
    metric: '163→25ms',
    metricLabel: 'dashboard p95',
    points: [
      { head: 'Fast where it counts.', body: 'The dashboard was firing 17 queries per load because of an N+1. Restructuring it down to 6 cut p95 latency from 163ms to 25ms.' },
      { head: 'Load-tested, not guessed.', body: 'Under k6, Nginx upstream keepalive and a tuned HikariCP pool tripled throughput to 4,800 req/s at 0% errors.' },
      { head: 'Locked down.', body: 'Stateless JWT and Google OAuth2, Bucket4j rate limiting, per-user ownership checks, and uploads checked by their magic bytes rather than their file extension.' },
      { head: 'Reads your notes.', body: 'The assistant uses Groq’s LLaMA 3.3 70B and Google Gemini to answer from the PDFs students upload.' },
    ],
    stack: 'Java · Spring Boot · PostgreSQL 16 · React · Docker · Nginx · Azure',
    links: [
      { label: 'Live', href: 'https://studspace.shane07p.me/' },
      { label: 'Source', href: 'https://github.com/shane07p/StudSpace' },
    ],
    image: '/images/studspace.webp',
  },
  {
    name: 'UrbanServe',
    tagline:
      'The backend of a hyperlocal home-services marketplace: customers browse and book, providers get assigned, then payment and reviews close the loop.',
    metric: '22 tables',
    metricLabel: 'BCNF · RLS on all',
    points: [
      { head: 'The database does the heavy lifting.', body: 'Materialized views turn multi-table analytics JOINs into single-table lookups, and PL/pgSQL triggers keep provider ratings current with no application code.' },
      { head: 'All-or-nothing bookings.', body: 'One stored procedure commits the booking, its items and its status log atomically, so a failure never leaves half a booking behind.' },
      { head: 'Safe to expose.', body: 'Supabase auto-generates a public API from the schema, so Row-Level Security is enforced on every table.' },
      { head: 'Indexes earn their place.', body: '30+ indexes, each driven by a real query; speculative ones were pruned because they cost write throughput.' },
    ],
    stack: 'Java · Spring Boot · PostgreSQL · PL/pgSQL · Supabase · Docker · Render · Swagger',
    links: [
      { label: 'Live API', href: 'https://urbanserve.shane07p.me/swagger-ui/index.html' },
      { label: 'Source', href: 'https://github.com/shane07p/UrbanServe-Home-Services-Database-System' },
    ],
  },
  {
    name: 'GeoNav',
    tagline: 'A routing engine in Java: shortest paths, multi-stop trips and nearest-place lookups on a city-scale graph.',
    metric: '3× faster',
    metricLabel: 'A* vs Dijkstra, 100K nodes',
    points: [
      { head: 'A* vs Dijkstra, measured.', body: 'On a graph of 100K nodes and 400K edges, A* with a Haversine heuristic ran 3× faster than Dijkstra.' },
      { head: 'Nearest place in O(log n).', body: 'A QuadTree with branch-and-bound pruning answers nearest-neighbour queries 11.9× faster than a linear scan.' },
      { head: 'Swap algorithms live.', body: 'The Strategy pattern lets the console app switch algorithms at runtime, plan multi-stop routes and edit the map as it runs.' },
    ],
    stack: 'Java · Graph algorithms · A* · QuadTree · Strategy pattern',
    links: [{ label: 'Source', href: 'https://github.com/shane07p/GeoNav' }],
  },
  {
    name: 'Vulnpath',
    status: 'In progress',
    tagline:
      'Dependency triage for Python. Every scanner tells you which packages have CVEs; Vulnpath tells you which ones your code actually reaches, and what kind of fix each needs.',
    points: [
      { head: 'Most alerts are noise.', body: 'You can depend on a vulnerable package and never call the vulnerable code. Vulnpath builds a call graph from your source into the installed dependency code and marks each finding reachable, not reachable or unknown, printing the call path.' },
      { head: '“Just upgrade” often fails.', body: 'When the vulnerable package sits three levels deep under a parent’s pin, it classifies the shape of the fix and prints the exact command: a direct bump, an override or a lockfile refresh.' },
      { head: 'Reads what was installed.', body: 'It parses uv.lock rather than the manifest, queries OSV.dev, and merges advisories that arrive as both GHSA and PYSEC records.' },
      { head: 'What’s next.', body: 'Reachability is package-level today. Per-function reachability and SARIF output are next.' },
    ],
    stack: 'Python · uv · OSV.dev · Call-graph analysis',
    links: [{ label: 'Source', href: 'https://github.com/Shane07p/Vulnpath' }],
  },
  {
    name: 'Settle',
    status: 'In progress',
    context: 'IT314 team project · Project lead, team of 7',
    tagline:
      'A reliability platform for software teams: incident response in the style of incident.io, plus monitoring in the style of Better Stack.',
    points: [
      { head: 'Leading a team of 7.', body: 'I lead the project and have written most of its commits so far: 135 of about 170.' },
      { head: 'Production-shaped from day one.', body: 'A Spring Boot 4 API with Flyway migrations and Testcontainers tests, a React + TypeScript frontend, and CI that builds and tests both, with CodeQL and Dependabot.' },
      { head: 'Already deployed.', body: 'Frontend on Vercel, API on Render, PostgreSQL on Supabase, watched by UptimeRobot.' },
      { head: 'Where it stands.', body: 'Login and roles work. The service catalog and incidents API are in progress, and a FastAPI service is stubbed for AI suggestions.' },
    ],
    stack: 'Java · Spring Boot 4 · PostgreSQL 16 · React · TypeScript · FastAPI · Docker',
    links: [
      { label: 'API docs', href: 'https://incident-backend-f340.onrender.com/swagger-ui.html' },
      { label: 'Source', href: 'https://github.com/Shane07p/DevOps-Incident-Management-System' },
    ],
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
  { platform: 'LeetCode', handle: '_shane07_', href: 'https://leetcode.com/u/_shane07_/', rating: 2117, scale: 3200, title: 'Knight', note: 'Top 1.44% globally' },
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

export const timeline: { year: string; items: Milestone[] }[] = [
  {
    year: '2026',
    items: [
      { kind: 'Quant', title: 'AMS Derive’26, Posterior Round', detail: 'Top 50 finalist, invited to IIT Bombay.', stat: '#27', of: 'of 50 finalists', field: { rank: 27, total: 50, top: 'Finalist', label: '50 finalists' } },
      { kind: 'Quant', title: 'AMS Derive’26, Prior Round', detail: 'Qualified for the posterior round.', stat: '#45', of: 'of 2,500+', field: { rank: 45, total: 2500, top: 'Top 1.8%', label: '2,500+ participants' }, post: { url: 'https://lnkd.in/p/dSvbvueU' } },
    ],
  },
  {
    year: '2025',
    items: [
      { kind: 'ICPC', title: 'ICPC Asia Amritapuri Regionals', detail: 'Regional onsite round.', stat: '#64', of: 'of 307 teams', field: { rank: 64, total: 307, top: 'Top 21%', label: '307 qualifying teams' }, post: { url: 'https://lnkd.in/p/dvMYj9Ep' } },
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

// Repos in the GitHub grid, in order. Stars, language and "updated" come live from the API;
// titles and descriptions come from here so the wording matches the rest of the site.
export const featuredRepos = [
  { repo: 'WallStreet-C-Real-Time-Multithreaded-Stock-Exchange-Simulator', title: 'WallStreet-C', desc: 'Real-time stock exchange simulator in C over TCP, multithreaded with POSIX threads.', lang: 'C', stars: 1 },
  { repo: 'StudSpace', title: 'StudSpace', desc: 'Full-stack academic workspace: semesters, attendance, CGPA and an AI study assistant.', lang: 'Java', stars: 2 },
  { repo: 'Vulnpath', title: 'Vulnpath', desc: 'Reachability-aware dependency triage for Python: flags the CVEs your code actually reaches.', lang: 'Python', stars: 1 },
  { repo: 'DevOps-Incident-Management-System', title: 'Settle', desc: 'Incident response and monitoring platform for software teams. IT314 team project.', lang: 'TypeScript', stars: 2 },
  { repo: 'UrbanServe-Home-Services-Database-System', title: 'UrbanServe', desc: 'REST API and 22-table BCNF PostgreSQL schema for a home-services marketplace.', lang: 'Java', stars: 1 },
  { repo: 'GeoNav', title: 'GeoNav', desc: 'Geospatial routing engine: Dijkstra & A*, QuadTree spatial indexing.', lang: 'Java', stars: 2 },
];

// Shown until (or if) the live GitHub API responds.
export const githubFallback = { publicRepos: 17, followers: 36 };

export const showGallery = true;

// Captions are ready; each photo appears once its `image` is set.
export const gallery: { cap: string; width: string; tilt: string; image?: string }[] = [
  { cap: 'ICPC Asia Amritapuri Regionals, 2025', width: 'clamp(280px,36vw,560px)', tilt: '-1.2deg' },
  { cap: 'AMS Derive’26 finals, IIT Bombay', width: 'clamp(220px,24vw,360px)', tilt: '1deg' },
  { cap: 'Programming Club contest night', width: 'clamp(260px,30vw,460px)', tilt: '-.6deg' },
  { cap: 'Team', width: 'clamp(220px,22vw,340px)', tilt: '1.4deg' },
  { cap: 'Quant Club, founding team', width: 'clamp(280px,34vw,520px)', tilt: '-1deg' },
  { cap: 'DA-IICT campus', width: 'clamp(220px,26vw,400px)', tilt: '.8deg' },
];

export const about = {
  headline: 'Graphs and trees came first.',
  headlineAccent: 'Then the systems that serve them.',
  body: [
    'I’m a B.Tech ICT student at Dhirubhai Ambani University (formerly DA-IICT), Gandhinagar. Seniors there introduced me to competitive programming, and Codeforces became my practice ground: solving problems, entering contests and reading the community’s blogs.',
    'I learned topics from Errichto, Colin Galen, Vivek Gupta, Gaurav Sen and TLE Eliminators, and drilled them on CSES and the USACO Guide. The biggest lesson: the people around you matter as much as the problems. That’s why I joined the Programming Club and helped found the Quant Club.',
    'The same habit of measuring everything carries into my engineering. I design normalized schemas, profile queries and load-test APIs with k6 until the numbers hold.',
  ],
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
