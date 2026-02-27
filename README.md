# TrendLoopUSA.net

Personal Style Guides for Every Woman — Expert styling, curated outfits, and fashion advice.

## Quick Start

```bash
npm install
npm run dev        # → localhost:3000
npm run build      # Production build
npm run pages:build && npm run pages:deploy  # Deploy to Cloudflare
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── guides/               # Style guide directory + detail pages
│   ├── compare/              # Retailer comparisons (Nordstrom vs ASOS)
│   ├── blog/                 # Blog listing
│   ├── style-quiz/           # Interactive style personality quiz
│   ├── about/privacy/contact # Legal pages
│   └── layout.tsx            # Root layout
├── components/
│   ├── Header.tsx            # Navigation
│   ├── Footer.tsx            # Footer
│   ├── GuideCard.tsx         # Style guide card
│   ├── ShopTheLook.tsx       # Affiliate product display
│   └── NewsletterCTA.tsx     # Email signup
├── lib/
│   └── guides-data.ts        # Content database
└── styles/
    └── globals.css            # Tailwind + design system
```

## Adding Content

### New Style Guide
Add to `src/lib/guides-data.ts` → page auto-generates at `/guides/[slug]`

### New Comparison
Create folder `src/app/compare/[brand-a-vs-brand-b]/page.tsx`

## Monetization

- **Affiliate**: Edit URLs in `guides-data.ts` (Nordstrom 5-11%, ASOS 5-7%, H&M 7-10.5%)
- **AdSense**: Apply after 15+ articles, add code to layout
- **Newsletter**: Connect ConvertKit/Beehiiv API

## Tech Stack

Next.js 14 + TypeScript + Tailwind CSS + Cloudflare Pages
