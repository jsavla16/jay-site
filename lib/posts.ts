export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD — a future date keeps the post unpublished
  excerpt: string;
  readTime?: string;
  tags?: string[];
};

// Metadata lives here; body content lives in /content/posts/<slug>.mdx
export const posts: PostMeta[] = [
  {
    slug: "umojah-how-we-got-here",
    title: "Umojah: How We Got Here",
    date: "2026-08-13",
    excerpt:
      "A beach in Goa, a friend who spent the 2000s as a system engineer in Nottingham, and ten years of building bass bins by hand — and why, in 2026, a sound system needed a website.",
    readTime: "6 min",
    tags: ["Building Umojah"],
  },
  {
    slug: "choosing-a-stack",
    title: "Choosing a Stack When You're Not a Developer",
    date: "2026-08-20",
    excerpt:
      "Canva got the look right and never actually broke. What it couldn't do was carry a hire business, a record label, and a growing event archive — so the decision became which code to pick up instead.",
    readTime: "7 min",
    tags: ["Building Umojah", "Stack"],
  },
  {
    slug: "design-handoff",
    title: "Design Handoff: Turning a Canva Artboard Into Code",
    date: "2026-08-28",
    excerpt:
      "A medallion's beaded tassels, about to spill into the next section, forced a fraction system called --stage into existence: every length on the site measured off one shared value, pulled straight from the Canva artboard itself.",
    readTime: "6 min",
    tags: ["Building Umojah", "Design"],
  },
];

function isPublished(post: PostMeta, now: Date): boolean {
  // Compare date-only strings so a post goes live at the start of its date
  // in whatever timezone the build runs in, rather than 00:00 UTC.
  const today = now.toISOString().slice(0, 10);
  return post.date <= today;
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Published posts only, newest first. Scheduled posts are hidden. */
export function getSortedPosts(): PostMeta[] {
  const now = new Date();
  return posts
    .filter((p) => isPublished(p, now))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
