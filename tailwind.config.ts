import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas gradient endpoints. Both deliberately dark so off-white
        // body copy keeps 14:1+ contrast anywhere on the page.
        ink: "#0a0a0c",
        slate: "#1c1c22",
        // Warm off-white. Avoids the glare pure #fff produces on near-black.
        bone: "#EDEBE4",
        // Restrained teal. Reads "data" without terminal-green cliché, and
        // clears AA for inline links against both gradient ends.
        accent: "#5EC8BA",
      },
      fontFamily: {
        // Wired up in app/layout.tsx via next/font, exposed as CSS vars.
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      // Card surfaces: translucent rather than fixed colours, so panels lift
      // off the gradient consistently wherever they land on the diagonal.
      backgroundColor: {
        surface: "rgba(255,255,255,0.035)",
        "surface-hover": "rgba(255,255,255,0.05)",
        "accent-wash": "rgba(94,200,186,0.12)",
      },
      borderColor: {
        hairline: "rgba(255,255,255,0.08)",
        "accent-soft": "rgba(94,200,186,0.35)",
        "accent-faint": "rgba(94,200,186,0.4)",
      },
      boxShadow: {
        "accent-glow": "0 0 24px rgba(94,200,186,0.08)",
      },
      borderRadius: {
        card: "8px",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
