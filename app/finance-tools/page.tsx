import ToolsIndex from "@/components/ToolsIndex";
import type { Tool } from "@/components/ToolCard";

export const metadata = {
  title: "Finance Tools",
  description: "Calculators and models for finance and real estate work.",
};

// Placeholder set — replace as each tool gets built. Cards without an href
// render as "Planned" rather than dead links.
const tools: Tool[] = [
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
];

export default function FinanceTools() {
  return (
    <ToolsIndex
      eyebrow="Finance"
      title="Finance Tools"
      intro="Calculators and small models from finance and real estate work — the ones worth building once rather than rebuilding in a spreadsheet each time."
      tools={tools}
    />
  );
}
