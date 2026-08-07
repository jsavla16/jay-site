export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
};

// Metadata lives here; body content lives in /content/posts/<slug>.mdx
export const posts: PostMeta[] = [
  {
    slug: "welcome",
    title: "Starting the build log",
    date: "2026-08-07",
    excerpt:
      "Why this site exists, and the plan to turn raw build notes into posts.",
  },
];

export function getPostMeta(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getSortedPosts(): PostMeta[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
