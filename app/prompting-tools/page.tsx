import ToolsIndex from "@/components/ToolsIndex";
import type { Tool } from "@/components/ToolCard";

export const metadata = {
  title: "Prompting Tools",
  description: "Prompt templates, patterns, and utilities for working with LLMs.",
};

const tools: Tool[] = [
  {
    name: "Prompt library",
    category: "Reference",
    description:
      "Reusable prompts by task — analysis, drafting, code review — with notes on what each one gets wrong.",
  },
  {
    name: "Token counter",
    category: "Utility",
    description:
      "Paste text, see token count and rough cost across common model pricing.",
  },
  {
    name: "Structured output builder",
    category: "Utility",
    description:
      "Compose a JSON schema and get a prompt that reliably returns it.",
  },
];

export default function PromptingTools() {
  return (
    <ToolsIndex
      eyebrow="LLMs"
      title="Prompting Tools"
      intro="Templates, patterns, and small utilities for getting useful work out of language models — collected from actual use rather than theory."
      tools={tools}
    />
  );
}
