# CyberSecurity Roadmap

An interactive full-stack cybersecurity learning roadmap built with TanStack Start and deployed on Netlify. The app guides learners from zero to security professional across 7 structured phases, with curated YouTube video resources available for each phase.

## Features

- **7-phase roadmap** covering Foundations → Core Skills → Offensive → Defensive → Advanced → Certifications → Career Paths
- **YouTube integration** — each phase has a "Watch YouTube Videos" button that fetches curated (or live, if `YOUTUBE_API_KEY` is set) video resources from the backend
- **Cyberpunk UI** — animated grid background, scan-line effect, phase-colored cards with hover states
- **Fully responsive** — auto-fill grid layouts adapt to any screen size

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Language | TypeScript (strict mode) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000` (or via Netlify CLI at port 8888).

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `YOUTUBE_API_KEY` | *(Optional)* YouTube Data API v3 key for live video search. If not set, curated fallback videos are shown. |

## API

`GET /api/youtube-videos?phase=<1-7>` — Returns 4 video objects for the given phase number. Uses YouTube Data API v3 if `YOUTUBE_API_KEY` is set, otherwise returns curated educational videos.
