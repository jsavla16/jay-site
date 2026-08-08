import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostMeta, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = getPostMeta(params.slug);
  if (!meta) return { title: "Post" };
  return { title: meta.title, description: meta.excerpt };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const meta = getPostMeta(params.slug);
  if (!meta) notFound();

  const filePath = path.join(process.cwd(), "content", "posts", `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();
  const source = fs.readFileSync(filePath, "utf8");

  return (
    <article className="mx-auto max-w-prose">
      <Link
        href="/blog"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone/60 hover:text-accent"
      >
        <span aria-hidden="true">←</span> Blog
      </Link>

      <header className="mt-8">
        <div className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
          <time dateTime={meta.date}>{meta.date}</time>
          {meta.readTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{meta.readTime}</span>
            </>
          )}
        </div>
        <h1 className="mt-4 font-sans text-3xl font-medium leading-tight tracking-tight text-bone sm:text-4xl">
          {meta.title}
        </h1>
        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Type scale tuned for a dark ground: body in Source Serif, headings in
          Space Grotesk, code and blockquote attribution in Space Mono. */}
      <div
        className="
          prose prose-invert mt-10 max-w-none
          prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-bone/85
          prose-li:font-serif prose-li:text-[17px] prose-li:text-bone/85
          prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-bone
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-bone
          prose-code:font-mono prose-code:text-[0.85em] prose-code:text-accent prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-card prose-pre:border prose-pre:border-hairline prose-pre:bg-white/[0.035]
          prose-blockquote:border-l-2 prose-blockquote:border-accent-soft prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:text-bone
          prose-hr:border-hairline
          prose-th:font-mono prose-th:text-[11px] prose-th:uppercase prose-th:tracking-[0.14em] prose-th:text-bone/60
          prose-td:font-serif prose-td:text-bone/85
        "
      >
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
