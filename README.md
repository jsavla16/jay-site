# jay-shah-site

Personal site: Next.js 14 (App Router) + TypeScript + Tailwind, MDX blog.

## Local dev

```bash
npm install
npm run dev
```

## Structure

- `app/` — pages (home, `/blog`, `/blog/[slug]`, `/tools`)
- `content/posts/*.mdx` — blog post bodies
- `lib/posts.ts` — post metadata (title, date, excerpt) — add an entry here for each new post
- `NOTES.md` — raw build log; source material for blog posts

## Deploy

Pushed to GitHub, deployed on Vercel (import the repo at vercel.com/new). No custom domain yet — using the `*.vercel.app` URL Vercel assigns.
