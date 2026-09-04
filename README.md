# People's Media Record — Demo Frontend

Demo prototype for the PMR headless WordPress + custom frontend direction. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, using mock data and a retro cassette-inspired design system.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo pages

- **Home** — hero, featured records, collections, stories
- **Archive search** — keyword search + filters
- **Record detail** — media player, metadata, transcript, access CTA
- **Collections** — listing and detail
- **Stories** — exhibitions with rich content
- **Resources**, **Events**, **Glossary**
- **Build With Us**, **Access Request**, **Contact**, **Donate**, **About**

## Architecture

- `lib/types.ts` — content models aligned with future WordPress CPT/ACF fields
- `lib/mock-data.ts` — static demo content (22 records, 5 collections, etc.)
- `components/` — layout, archive, collections, stories, shared UI
- App Router with server components by default; client components for search, filters, forms

## Deploy

Deploy to Vercel or any Node host:

```bash
npm run build
npm start
```

## Note

Most forms are **demo only** and do not submit data. Images use placeholder URLs from picsum.photos.

**Camp registration** (`/camp/register`) is wired for production when
`GOOGLE_SHEETS_WEBHOOK_URL` is set. That URL should point to a Google Apps
Script web app that appends a Sheet row and emails the registrant. See
`scripts/camp-registration-apps-script.js` for the script and deploy steps.
