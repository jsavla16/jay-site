import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — Jay Shah",
};

export default function BlogIndex() {
  const posts = getSortedPosts();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-lg font-medium underline">
              {post.title}
            </Link>
            <p className="text-sm text-neutral-500">{post.date}</p>
            <p className="text-neutral-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
