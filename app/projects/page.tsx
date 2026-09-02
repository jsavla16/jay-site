import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description:
    "Things built and shipped — what each one is, who uses it, and the problem that took longest to find.",
};

export default function Projects() {
  return (
    <div>
      <p className="meta">Built &amp; shipped</p>
      <h1 className="mt-4 font-sans text-4xl font-medium tracking-tight text-bone">
        Projects
      </h1>
      <p className="mt-4 max-w-prose font-serif text-lg leading-relaxed text-bone/85">
        Things that exist, rather than things I know about. Each one gets the
        same four questions: what it is, who uses it, what it&apos;s built with,
        and the one problem that took longest to find.
      </p>

      {/* Single column, not the two-up grid the tools pages use. These cards
          carry paragraphs; side by side they'd force a measure too narrow to
          read comfortably. */}
      <div className="mt-10 space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
