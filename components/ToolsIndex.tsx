import ToolCard, { type Tool } from "@/components/ToolCard";

export default function ToolsIndex({
  eyebrow,
  title,
  intro,
  tools,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  tools: Tool[];
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

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </div>
  );
}
