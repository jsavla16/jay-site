import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card-interactive group block p-6">
      <div className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
        <time dateTime={post.date}>{post.date}</time>
        {post.readTime && (
          <>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </>
        )}
      </div>

      <h2 className="mt-3 font-sans text-xl font-medium tracking-tight text-bone transition-colors group-hover:text-accent">
        {post.title}
      </h2>

      <p className="mt-2 font-serif text-[15px] leading-relaxed text-bone/85">
        {post.excerpt}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
