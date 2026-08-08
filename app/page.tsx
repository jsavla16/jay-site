import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getSortedPosts } from "@/lib/posts";

export default function Home() {
  const recent = getSortedPosts().slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section>
        <p className="meta">Nairobi, Kenya</p>
        <h1 className="mt-4 font-sans text-4xl font-medium tracking-tight text-bone sm:text-5xl">
          Jay Shah
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Finance <span className="text-bone/30">|</span> Data{" "}
          <span className="text-bone/30">|</span> AI
        </p>
        <p className="mt-6 max-w-prose font-serif text-lg leading-relaxed text-bone/85">
          Chartered Accountant (ICAEW) turned builder. I spent a decade in
          finance and commercial sales — PwC, Deutsche Bank, private wealth
          management, then real estate sales leadership at Tilisi Developments —
          and now spend most of my time building with data and machine learning.
        </p>
        <p className="mt-4 max-w-prose font-serif text-lg leading-relaxed text-bone/85">
          This site is where the work gets written down: build notes from
          shipping things, and small tools that came out of problems worth
          solving twice.
        </p>
      </section>

      {/* About */}
      <section>
        <h2 className="font-sans text-2xl font-medium tracking-tight text-bone">
          What I work on
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Finance",
              body: "Chartered Accountant, non-practising. Audit and private wealth background, plus commercial real estate sales leadership.",
            },
            {
              label: "Data & ML",
              body: "Python, scikit-learn, PyTorch, TensorFlow, fastai. Completed Practical Deep Learning and the ZTM AI & ML bootcamp.",
            },
            {
              label: "Ventures",
              body: "Founder and co-founder across Safi Safi, Zambezi Farms, and Umojah Sound System — a reggae dub sound system in Kenya.",
            },
          ].map((item) => (
            <div key={item.label} className="card p-5">
              <div className="meta">{item.label}</div>
              <p className="mt-3 font-serif text-[15px] leading-relaxed text-bone/85">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent writing */}
      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-2xl font-medium tracking-tight text-bone">
            Recent writing
          </h2>
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
          >
            All posts <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-6 grid gap-4">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="font-sans text-2xl font-medium tracking-tight text-bone">
          Get in touch
        </h2>
        <p className="mt-4 max-w-prose font-serif text-lg leading-relaxed text-bone/85">
          Open to conversations about data and ML work, finance, or anything
          being built in Nairobi.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:j.a.savla@gmail.com"
            className="rounded-card bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-opacity hover:opacity-90"
          >
            Email
          </a>
          <a
            href="https://github.com/jsavla16"
            target="_blank"
            rel="noreferrer"
            className="rounded-card border border-hairline px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/80 transition-colors hover:border-accent-soft hover:text-bone"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
