# NS CHOCOROOM — Next.js

This is a Next.js App Router project configured for a static export on Netlify. The original site content, styles, effects, and supplied media are included.

## Local preview

```bash
npm install
npm run dev
```

## Netlify deployment

Build command: `npm run build`  
Publish directory: `out` (also set in `netlify.toml`).

Connect this project folder to a Git repository and import that repository in Netlify, or deploy with the Netlify CLI.

## SEO and launch checklist

- Page title, description, keyword hints, robots directives, Open Graph and Twitter metadata, favicon, and LocalBusiness JSON-LD are configured.
- Generated `robots.txt` and `sitemap.xml` use the configured public URL.
- Set `NEXT_PUBLIC_SITE_URL` to your custom domain in Netlify if one is connected. Netlify’s site URL is used automatically when available; the example file is documentation only.
- Confirm business details and contact links before launch. The project currently includes Hyderabad service area, phone number, and Instagram from the original site.
- Run `npm install`, `npm run build`, then check the published site on mobile and desktop.
- Add the deployed domain to Google Search Console and submit its sitemap once a public URL exists.
