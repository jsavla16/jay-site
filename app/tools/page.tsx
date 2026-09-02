import ToolsIndex, { type ToolGroup } from "@/components/ToolsIndex";

export const metadata = {
  title: "Tools",
  description:
    "Calculators, utilities and small models from finance, LLM and marketing work.",
};

// Merged from /finance-tools, /prompting-tools and /marketing-tools. Three
// nav slots holding nine cards that all read "Planned" advertised absence
// three times over; one page with three sections says the same thing once.
// The old routes redirect here — see next.config.mjs.
const groups: ToolGroup[] = [
  {
    label: "Finance",
    blurb:
      "Calculators and small models from finance and real estate work — the ones worth building once rather than rebuilding in a spreadsheet each time.",
    tools: [
      {
        name: "Mortgage & amortisation",
        category: "Calculator",
        description:
          "Repayment schedule with rate, term, and lump-sum overpayment inputs.",
      },
      {
        name: "Property yield",
        category: "Real estate",
        description:
          "Gross and net rental yield, with service charge and void assumptions.",
      },
      {
        name: "DCF valuation",
        category: "Model",
        description:
          "Discounted cash flow with adjustable WACC and terminal growth.",
      },
    ],
  },
  {
    label: "LLMs",
    blurb:
      "Templates, patterns, and small utilities for getting useful work out of language models — collected from actual use rather than theory.",
    tools: [
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
    ],
  },
  {
    label: "Sales & Marketing",
    blurb:
      "Utilities from real estate sales and design work — the repetitive parts of running campaigns and producing collateral.",
    tools: [
      {
        name: "Listing copy generator",
        category: "Real estate",
        description:
          "Property details in, structured listing copy out — headline, body, and highlights.",
      },
      {
        name: "UTM builder",
        category: "Campaigns",
        description:
          "Consistent campaign URLs with a saved naming convention, so reporting stays clean.",
      },
      {
        name: "Social post sizer",
        category: "Design",
        description:
          "Current dimensions and safe areas per platform, for laying out artwork in Canva.",
      },
    ],
  },
];

export default function Tools() {
  return (
    <ToolsIndex
      eyebrow="Utilities"
      title="Tools"
      intro="Small things built to solve a problem more than once. Anything marked Planned isn't built yet — shipped tools appear on the Projects page too."
      groups={groups}
    />
  );
}
