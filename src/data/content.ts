// Site data: profile, projects, ratings, timeline, links. Images: drop files in /public/images and
// set the `image` paths (e.g. '/images/studspace.webp'). Anything without an image simply hides it.

export const profile = {
  name: 'Shane Christian',
  email: 'shanechristian777@gmail.com',
  // Google Drive link to the resume. The nav's Resume button stays hidden while this is empty.
  resume: 'https://drive.google.com/file/d/1J0jA4dMs5DYmk7uuvB6jjvBlBtl8aX6Y/view?usp=sharing',
  city: 'Ahmedabad',
  pitch: 'I build backend systems and solve competitive programming problems. Third-year student at DA-IICT.',
  portrait: '/images/portrait.webp' as string | undefined,
  github: { user: 'Shane07p', url: 'https://github.com/Shane07p' },
  linkedin: 'https://www.linkedin.com/in/shane-christian-7a928031a/',
  discord: 'soulvenom6772',
};

export const problemsSolved = '2,000+';

export const marquee = [
  'Software developer',
  'Competitive programmer',
  'Codeforces Expert',
  'ICPC Regionalist',
  'Spring Boot',
  'PostgreSQL',
  'LeetCode Knight',
  'DA-IICT ’28',
];

export const exploring = {
  lead: 'Currently exploring',
  accent: 'reliable systems, backend development and agentic AI.',
};

export type Project = {
  name: string;
  // Shown on the right of the collapsed row.
  kind: string;
  year: string;
  status?: string;
  // What it is, in a sentence or two.
  summary: string;
  // Who it's for and why it exists.
  purpose: string;
  features: string[];
  // How it's built, in plain words.
  build: string;
  stack: string[];
  links: { label: string; href: string }[];
  image?: string;
};

export const projects: Project[] = [
  {
    name: 'StudSpace',
    kind: 'Web app',
    year: '2026',
    summary: 'A study workspace for university students. Courses, notes, attendance and an AI assistant, all in one place.',
    purpose:
      'Students usually keep their PYQs, notes and playlists spread across group chats and drives, and work out the 75% attendance rule by hand. StudSpace keeps all of that together, semester by semester.',
    features: [
      'Add your semesters and courses, and attach notes, links and PDFs to each course.',
      'Mark attendance every day and see how many classes you can skip, or still need to attend, to stay above 75%.',
      'Work out your CGPA from the actual credits of your courses.',
      'Ask the AI assistant about your own PDFs. It remembers the conversation and shows maths properly.',
      'Share a semester with friends through a public link. They don’t need an account to see it.',
      'Sign in with Google or with email.',
    ],
    build:
      'The backend is a Spring Boot REST API on PostgreSQL, with JWT and Google OAuth for sign-in and rate limiting on login. The frontend is React with Vite and Tailwind. PDFs are stored on Cloudinary, and the assistant reads them with Google Gemini, falling back to Groq’s LLaMA 3.3 70B for text. It all runs in Docker on Azure behind Nginx. I also load-tested it with k6 and fixed a slow dashboard query that the tests turned up.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'React', 'Tailwind CSS', 'Docker', 'Nginx', 'Azure', 'Gemini API'],
    links: [
      { label: 'Live', href: 'https://studspace.shane07p.me/' },
      { label: 'Source', href: 'https://github.com/shane07p/StudSpace' },
    ],
    image: '/images/studspace.webp',
  },
  {
    name: 'UrbanServe',
    kind: 'Backend & database',
    year: '2026',
    summary:
      'The database and REST API behind a home-services marketplace, where people book local professionals for plumbing, electrical work, AC servicing, cleaning and repairs.',
    purpose:
      'It’s for customers who need someone at their door for a repair or a service, and for the professionals who take those jobs. Most of the work went into the database, so that bookings, payments and reviews stay consistent even if the app on top gets something wrong.',
    features: [
      'Customers browse services by category and area, book one or more of them, apply coupons and pay.',
      'Providers set when they’re available and upload documents to get verified.',
      'Each booking keeps a history of its status, from the request to completion or cancellation.',
      'Customers can review the provider and the service separately, or raise a complaint.',
    ],
    build:
      'The schema has 22 tables across 7 modules, all normalised to BCNF. A booking and its items are saved by one stored procedure, so they go through together or not at all. Triggers keep ratings up to date and materialised views serve the reporting queries. The REST API is Spring Boot on plain JDBC, documented with Swagger, and Row-Level Security protects every table on Supabase. It’s deployed on Render.',
    stack: ['Java', 'Spring Boot', 'JDBC', 'PostgreSQL', 'PL/pgSQL', 'Supabase', 'Docker', 'Render', 'Swagger'],
    links: [
      { label: 'Live API', href: 'https://urbanserve.shane07p.me/swagger-ui/index.html' },
      { label: 'Source', href: 'https://github.com/shane07p/UrbanServe-Home-Services-Database-System' },
    ],
  },
  {
    name: 'GeoNav',
    kind: 'Routing engine',
    year: '2026',
    summary: 'A route planner that runs in the terminal. Give it a city map and it finds routes between places, and what’s nearby.',
    purpose:
      'It’s a small version of what a map app does underneath: graph search to find a route, and a spatial index to find the closest places quickly.',
    features: [
      'Find the shortest route by distance with Dijkstra, or the fastest one by time with A*, and compare the two.',
      'Plan a trip with several stops.',
      'Find the nearest point on the map, or the closest places of a given type.',
      'Add places and roads while it runs. Maps load from seed files that are checked as they load.',
    ],
    build:
      'Plain Java, no libraries. Each routing algorithm is a separate strategy, so you can switch between them while the program runs. A QuadTree handles the nearest-place searches in O(log n), which came out about 12 times faster than checking every point. On a test map with 100,000 points and 400,000 roads, A* was about 3 times faster than Dijkstra.',
    stack: ['Java', 'Graph algorithms', 'A* search', 'QuadTree', 'OOP'],
    links: [{ label: 'Source', href: 'https://github.com/shane07p/GeoNav' }],
  },
  {
    name: 'Vulnpath',
    kind: 'Security tool',
    year: '2026',
    status: 'In progress',
    summary: 'A command-line tool that checks a Python project for vulnerable dependencies and tells you which ones actually affect your code.',
    purpose:
      'Most scanners list every package with a known CVE, even when your code never touches the vulnerable part. And “just upgrade” often doesn’t work when the package sits deep in the dependency tree. Vulnpath is for developers who want a shorter list of real problems, and a clear way to fix each one.',
    features: [
      'Reads uv.lock to see exactly which versions are installed, including indirect dependencies.',
      'Looks up advisories on OSV.dev and merges duplicate records of the same CVE.',
      'Traces calls from your code into the installed packages and marks each finding as reachable, not reachable or unknown, with the call path.',
      'Works out what kind of fix each finding needs and prints the command to run.',
    ],
    build:
      'Written in Python, with networkx for the call graph, Typer and Rich for the command line, and pydantic for the data. It’s tested with pytest and type-checked with mypy in CI. Right now it checks reachability per package. Checking down to individual functions is next.',
    stack: ['Python', 'networkx', 'Typer', 'OSV.dev', 'pytest', 'GitHub Actions'],
    links: [{ label: 'Source', href: 'https://github.com/Shane07p/Vulnpath' }],
  },
  {
    name: 'Settle',
    kind: 'Web platform',
    year: '2026',
    status: 'In progress',
    summary: 'An incident management platform for software teams. It helps a team respond when something breaks, and watches their services the rest of the time.',
    purpose:
      'When a service goes down, a team needs one place to see what’s affected, who’s on it and what has been tried. Settle puts that kind of incident response, in the style of incident.io, together with uptime monitoring in the style of Better Stack.',
    features: [
      'Sign in with roles for admins, engineers and viewers.',
      'Keep a catalogue of the services a team runs. (Being built.)',
      'Open and track incidents from the first alert to the fix. (Being built.)',
      'Get suggestions from an AI service during an incident. (Early stage.)',
    ],
    build:
      'A Spring Boot 4 API with Flyway migrations, tested against a real PostgreSQL database using Testcontainers, and a React and TypeScript frontend. Every push is built and tested in GitHub Actions, with CodeQL scanning. The AI service is a separate FastAPI app. It’s deployed on Vercel and Render, with the database on Supabase.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Testcontainers', 'React', 'TypeScript', 'FastAPI', 'GitHub Actions'],
    links: [
      { label: 'API docs', href: 'https://incident-backend-f340.onrender.com/swagger-ui.html' },
      { label: 'Source', href: 'https://github.com/Shane07p/DevOps-Incident-Management-System' },
    ],
  },
];

export const proof = {
  before: [{ v: problemsSolved, l: 'problems solved across competitive programming sites' }],
  // The live Codeforces rating sits between these two groups.
  after: [
    { v: '#64', l: 'at ICPC Asia Amritapuri Regionals 2025' },
    { v: 'Top 50', l: 'at AMS Derive’26, invited to IIT Bombay' },
  ],
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
    year: 'Campus',
    items: [
      { kind: 'Contests', title: 'Won 3 institute CP contests', detail: 'Blitz Cup, Robin Relay and Inter-Wing.', stat: '3', of: 'contest wins' },
    ],
  },
];

export const experience = [
  {
    org: 'Programming Club',
    role: 'Core member: problem setter, contest organiser and mentor',
    when: 'Apr 2026 – Now',
    where: 'DA-IICT',
    bullets: [
      'Co-organised 5 competitive programming contests, setting and testing the problems.',
      'Designed the pre-placement DSA tests that 250+ students took.',
      'Helped run Synapse’26 Codemutant and i.Fest’25 iRelay, with more than 100 participants.',
      'Mentor juniors who are just starting out with competitive programming.',
    ],
  },
  {
    org: 'Quant Club',
    role: 'Founding core member',
    when: 'Oct 2026 – Now',
    where: 'DA-IICT',
    bullets: ['One of the people who started DA-IICT’s quant club this year.'],
  },
];

// Everything here is used in at least one of my repositories.
export const skills = [
  { group: 'Languages', items: ['Java', 'C++', 'Python', 'C', 'SQL', 'TypeScript'] },
  { group: 'Backend', items: ['Spring Boot', 'Spring Security', 'Hibernate', 'FastAPI'] },
  { group: 'Frontend', items: ['React', 'Tailwind CSS'] },
  { group: 'Databases', items: ['PostgreSQL', 'Supabase'] },
  { group: 'DevOps & Cloud', items: ['Docker', 'Nginx', 'GitHub Actions', 'Linux', 'Azure'] },
  { group: 'AI', items: ['LangGraph', 'RAG', 'LLM APIs'] },
  { group: 'Core CS', items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'] },
];

// Repos in the GitHub grid, in order. Stars, language and "updated" come live from the API;
// titles and descriptions come from here so the wording matches the rest of the site.
export const featuredRepos = [
  { repo: 'WallStreet-C-Real-Time-Multithreaded-Stock-Exchange-Simulator', title: 'WallStreet-C', desc: 'A stock exchange simulator in C. Traders connect over TCP and buy and sell in real time, or let a bot trade for them.', lang: 'C', stars: 1 },
  { repo: 'StudSpace', title: 'StudSpace', desc: 'A study workspace for university students, with courses, attendance, notes and an AI assistant.', lang: 'Java', stars: 2 },
  { repo: 'Vulnpath', title: 'Vulnpath', desc: 'Finds which vulnerable dependencies a Python project actually uses, and how to fix them.', lang: 'Python', stars: 1 },
  { repo: 'DevOps-Incident-Management-System', title: 'Settle', desc: 'An incident management and monitoring platform for software teams.', lang: 'TypeScript', stars: 2 },
  { repo: 'UrbanServe-Home-Services-Database-System', title: 'UrbanServe', desc: 'The database and REST API behind a home-services marketplace.', lang: 'Java', stars: 1 },
  { repo: 'GeoNav', title: 'GeoNav', desc: 'A terminal route planner using Dijkstra, A* and a QuadTree.', lang: 'Java', stars: 2 },
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
  headline: 'Hi, I’m Shane.',
  headlineAccent: 'Software developer and competitive programmer.',
  body: [
    'I’m a third-year B.Tech ICT student at Dhirubhai Ambani University (formerly DA-IICT) in Gandhinagar. Most of what I build is backend work: APIs, databases, and getting them deployed and running properly.',
    'I got into programming through competitive programming. A few seniors introduced me to it, and I started practising on Codeforces and taking part in contests. Most of what I know came from Codeforces blogs, YouTube channels like Errichto, Colin Galen, Vivek Gupta, Gaurav Sen and TLE Eliminators, and problem sets like CSES and the USACO Guide.',
    'Something I learned early is how much it helps to be around people who like the same things. That’s why I joined the Programming Club, where I now set problems and help juniors, and why I helped start the Quant Club this year.',
  ],
  stats: [
    { v: '9.16', l: 'CGPA' },
    { v: '2K+', l: 'problems solved' },
    { v: '2', l: 'clubs, core team' },
  ],
  badge: 'DA-IICT · B.TECH ICT · CLASS OF 2028 ·',
  now: [
    'Building Vulnpath and Settle',
    'Setting problems for Programming Club contests',
    'Helping get the Quant Club off the ground',
  ],
};
