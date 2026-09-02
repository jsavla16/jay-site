import Link from "next/link";
import type { Project, ProjectStatus } from "@/lib/projects";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  planned: "Planned",
};

// Live earns the accent. Everything else stays quiet — a promise shouldn't
// draw the eye as hard as a thing that exists.
const STATUS_CLASS: Record<ProjectStatus, string> = {
  live: "text-accent",
  "in-progress": "text-bone/60",
  planned: "text-bone/40",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="meta">{label}</div>
      <p className="mt-2 font-serif text-[15px] leading-relaxed text-bone/85">
        {children}
      </p>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const { status, links } = project;

  // Unlike ToolCard, the whole card is never a link: a project has several
  // destinations (live site, repo, write-up) and picking one to own the
  // click would bury the other two.
  const isStub = !project.whatItIs;

  return (
    <article className={`card p-6 sm:p-7 ${isStub ? "opacity-70" : ""}`}>
      <div className={`meta ${STATUS_CLASS[status]}`}>{STATUS_LABEL[status]}</div>

      <h2 className="mt-3 font-sans text-xl font-medium tracking-tight text-bone">
        {project.name}
      </h2>

      {project.tagline && (
        <p className="mt-2 max-w-prose font-serif text-[15px] leading-relaxed text-bone/70">
          {project.tagline}
        </p>
      )}

      {!isStub && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {project.whatItIs && <Field label="What it is">{project.whatItIs}</Field>}
          {project.whoUsesIt && <Field label="Who uses it">{project.whoUsesIt}</Field>}
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className="mt-6">
          <div className="meta">Stack</div>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="tag-pill">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.hardThing && (
        <div className="mt-6 border-l border-accent-faint pl-4">
          <div className="meta">What was hard</div>
          <p className="mt-2 max-w-prose font-serif text-[15px] leading-relaxed text-bone/85">
            {project.hardThing.symptom}
          </p>
          <p className="mt-3 max-w-prose font-serif text-[15px] leading-relaxed text-bone/85">
            {project.hardThing.rootCause}
          </p>
        </div>
      )}

      {links && links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {link.label} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-accent hover:underline"
              >
                {link.label} <span aria-hidden="true">→</span>
              </Link>
            )
          )}
        </div>
      )}
    </article>
  );
}
