import Link from "next/link";

export type Tool = {
  name: string;
  category: string;
  description: string;
  href?: string; // absent = not built yet
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const body = (
    <>
      <div className="meta">{tool.category}</div>

      <h3 className="mt-3 font-sans text-lg font-medium tracking-tight text-bone">
        {tool.name}
      </h3>

      <p className="mt-2 font-serif text-[15px] leading-relaxed text-bone/85">
        {tool.description}
      </p>

      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em]">
        {tool.href ? (
          <span className="text-accent">
            Open <span aria-hidden="true">→</span>
          </span>
        ) : (
          <span className="text-bone/40">Planned</span>
        )}
      </div>
    </>
  );

  // Unbuilt tools render as a static panel — no hover affordance promising a
  // click that does nothing.
  if (!tool.href) {
    return <div className="card p-6 opacity-70">{body}</div>;
  }

  return (
    <Link href={tool.href} className="card-interactive group block p-6">
      {body}
    </Link>
  );
}
