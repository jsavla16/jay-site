import PostCard from "@/components/PostCard";
import { getSortedPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Build notes and write-ups from Jay Shah.",
};

// Scheduled posts go live on their date without needing a manual redeploy.
// Without this the page is built once and a future-dated post never appears.
export const revalidate = 3600;

export default function BlogIndex() {
  const posts = getSortedPosts();

  return (
    <div>
      <p className="meta">{posts.length} {posts.length === 1 ? "post" : "posts"}</p>
      <h1 className="mt-4 font-sans text-4xl font-medium tracking-tight text-bone">
        Blog
      </h1>
      <p className="mt-4 max-w-prose font-serif text-lg leading-relaxed text-bone/85">
        Notes written when something breaks and gets fixed, expanded into posts.
      </p>

      <div className="mt-10 grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
