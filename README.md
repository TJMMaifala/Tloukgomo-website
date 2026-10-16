# Tloukgomo Trading & Projects — Corporate Website

React 18 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + Lucide React.
All photographs are real project photos taken from the company business profile.

## Project structure

```
tloukgomo-website/
├── index.html                 # SEO, Open Graph, JSON-LD structured data
├── public/
│   ├── favicon.png            # from the company logo
│   ├── robots.txt
│   └── images/                # optimised real project photos + logo
├── src/
│   ├── main.tsx · App.tsx · index.css
│   ├── data/
│   │   ├── company.ts         # ALL company details (phone, email, address, reg no.)
│   │   ├── images.ts          # ALL image paths (hero, services, industries, projects)
│   │   ├── projects.ts        # the 16 referenced projects
│   │   ├── services.ts        # 5 core services
│   │   └── industries.ts      # 6 target markets
│   ├── hooks/useCountUp.ts
│   └── components/
│       Navbar · Hero · About · Services · Projects · Industries · Stats
│       WhyChooseUs · CTA · Contact · Footer · FloatingQuote
│       ScrollProgress · Reveal · SectionHeading
├── netlify.toml · vercel.json · .env.example
```

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript check
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

Requires Node 18+.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_FORM_ENDPOINT` | Yes | Form endpoint that receives the enquiry form as a JSON `POST`. Set the Formspree notification recipient to `pontshooxtail@gmail.com`. |

Set `VITE_FORM_ENDPOINT` in `.env.local` for local development and in your hosting provider's environment settings for production. Form submissions are sent to the configured endpoint; if it is missing or rejects the submission, the form reports an error and provides the business email as a fallback contact.

## Deployment

**Vercel**: push to GitHub, then vercel.com → *Add New Project* → import the repo. Framework preset: Vite (auto-detected). Build `npm run build`, output `dist`. Add `VITE_FORM_ENDPOINT` under *Settings → Environment Variables*. Or use the CLI: `npx vercel --prod`.

**Netlify**: push to GitHub, then app.netlify.com → *Add new site → Import an existing project*. `netlify.toml` already sets the build command and publish directory. Add `VITE_FORM_ENDPOINT` under *Site configuration → Environment variables*. Or drag the `dist/` folder onto app.netlify.com/drop after `npm run build`.

**Cloudflare Pages**: in the Cloudflare dashboard, open the Pages project and add `VITE_FORM_ENDPOINT` with the Formspree URL under *Settings → Variables and Secrets* for the Production environment. Set it for Preview too if preview deployments should accept enquiries. Save the variable and trigger a new deployment so Vite includes it in the built site.

After you have a domain, update `og:image` / `twitter:image` in `index.html` to absolute URLs (e.g. `https://yourdomain.co.za/images/hero-foundation.jpg`) so link previews work on WhatsApp, LinkedIn and Facebook, and add `<link rel="canonical" href="https://yourdomain.co.za/" />`.

## Replacing images

1. Drop the new file into `public/images/` (landscape, ideally 1600px wide or more, JPG/WebP, under ~300 KB).
2. Open `src/data/images.ts` and change the filename for that slot, or paste any full `https://…` URL.
   - `siteImages` — hero, about, CTA, stats background, logo
   - `serviceImages` — the five service cards
   - `industryImages` — the six industry cards
   - `projectImages` — one per project (keys match `src/data/projects.ts`)
3. Update the matching `imageAlt` text in `src/data/projects.ts` for projects.

Project photos were matched to projects on a best-fit basis from the profile collage. Please check each pairing and swap any that are wrong.

## Changing company information

- Contact details, address, registration number, B-BBEE level, mission, vision, tagline → `src/data/company.ts`
- Projects (add, edit, reorder) → `src/data/projects.ts`; filters and gallery update automatically. The "16+" stat in `src/components/Stats.tsx` is a fixed number, so update it when you add projects.
- Services → `src/data/services.ts`; industries → `src/data/industries.ts`
- Footer copyright year → `src/components/Footer.tsx`
- Page title and meta description → `index.html`
