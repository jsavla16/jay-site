import ToolCard, { type Tool } from "@/components/ToolCard";

export type ToolGroup = {
  label: string;
  /** Sits under the group heading. One line — not a second intro. */
  blurb: string;
  tools: Tool[];
};

// Takes groups rather than a flat list because the three tools pages were
// merged into one route. The grouping is what carried the information those
// three separate pages used to carry.
export default function ToolsIndex({
  eyebrow,
  title,
  intro,
  groups,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  groups: ToolGroup[];
}) {
  return (
    <div>
      <p className="meta">{eyebrow}</p>
      <h1 className="mt-4 font-sans text-4xl font-medium tracking-tight text-bone">
        {title}
      </h1>
      <p className="mt-4 max-w-prose font-serif text-lg leading-relaxed text-bone/85">
        {intro}
      </p>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="font-sans text-2xl font-medium tracking-tight text-bone">
              {group.label}
            </h2>
            <p className="mt-2 max-w-prose font-serif text-[15px] leading-relaxed text-bone/70">
              {group.blurb}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {group.tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
