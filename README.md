# shane. — portfolio

Personal site for Shane Christian. Vite + React 19 + TypeScript, plain CSS, no backend.

Live numbers (Codeforces rating, GitHub repos/followers, contribution chart) are fetched in the
browser from public CORS-enabled APIs, with fallbacks in `src/data/content.ts` if a call fails.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

## Edit content

Everything you'd normally change is in [`src/data/content.ts`](src/data/content.ts): projects,
ratings, milestones, roles, skills, gallery, about text and links.

Images: put files in `public/images/` and set the matching field, e.g.

- project screenshot → `projects[i].image = '/images/studspace.png'`
- portrait → `profile.portrait`
- LinkedIn post preview → `timeline[..].items[..].post.image`
- gallery photo → `gallery[i].image`

Unset images render as labelled placeholders. Replace the resume at `public/Shane_Christian_Resume.pdf`.

## Layout

```
src/
  data/content.ts        site data
  hooks/                 live stats, scroll reveals, theme toggle, motion helpers
  components/            one component + one CSS file per section
  styles/global.css      tokens (light/dark), base styles, reveal animations
```

## Deploy

Every push to `main` builds and deploys to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), served at
[shane07p.me](https://shane07p.me) (`public/CNAME`). Pages source must be set to **GitHub Actions**.
