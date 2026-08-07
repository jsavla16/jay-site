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
  return { title: meta ? `${meta.title} — Jay Shah` : "Post — Jay Shah" };
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
    <article className="prose prose-neutral max-w-none">
      <h1>{meta.title}</h1>
      <p className="text-sm text-neutral-500">{meta.date}</p>
      <MDXRemote source={source} />
    </article>
  );
}
