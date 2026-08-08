import ToolsIndex from "@/components/ToolsIndex";
import type { Tool } from "@/components/ToolCard";

export const metadata = {
  title: "Marketing Tools",
  description: "Copy, campaign, and design utilities for sales and marketing.",
};

const tools: Tool[] = [
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
];

export default function MarketingTools() {
  return (
    <ToolsIndex
      eyebrow="Sales & Marketing"
      title="Marketing Tools"
      intro="Utilities from real estate sales and design work — the repetitive parts of running campaigns and producing collateral."
      tools={tools}
    />
  );
}
