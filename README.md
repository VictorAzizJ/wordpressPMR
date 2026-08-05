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

This is a **client demo** only. Forms do not submit data. Images use placeholder URLs from picsum.photos.
