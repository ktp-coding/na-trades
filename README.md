# N|A TRADES Web

Landing page for the course **Understand The Logic of Time & Price** (ICT · Quarterly Theory · Fractal Model).

Built with Nuxt 4 and Tailwind CSS 4.

## Requirements

- Node.js >= 22.12
- pnpm 10

## Setup

```bash
pnpm install
cp .env.example .env   # fill in links
pnpm dev               # http://localhost:3000
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_COURSE_LINK` | Whop link used by every "สมัครเรียน" button |
| `NUXT_PUBLIC_SHOW_BUY_COURSE` | `true` to show the 2026 promo images in the gallery |
| `NUXT_PUBLIC_PRIVATE_COURSE_LINK` / `NUXT_PUBLIC_SHOW_BUY_PRIVATE_COURSE` | Private course section (`true` to show) |
| `NUXT_PUBLIC_BLOB_BASE_URL` | Vercel Blob base URL for course images (also added to the CSP `img-src`) |
| `NUXT_PUBLIC_YOUTUBE_LINK`, `_FB_LINK`, `_IG_LINK`, `_TIKTOK_LINK`, `_DISCORD_LINK`, `_TELEGRAM_LINK` | Footer socials (empty = hidden) |

Only `http(s)` links are accepted; anything else is ignored.

### Enrollment form (`/enroll`)

3-step form (details → bank transfer → slip). Data goes to a Google Sheet and the slip to a Drive folder per plan, through a Google Apps Script web app.
Setup guide (Thai): [`google-apps-script/README.md`](google-apps-script/README.md). Form questions live in `shared/enroll.ts`.

## Security

- Security headers (CSP, HSTS, X-Frame-Options, etc.) are set in `nuxt.config.ts` → `routeRules`.
- Run `pnpm audit` before deploying.
