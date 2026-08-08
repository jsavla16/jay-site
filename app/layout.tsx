import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Source_Serif_4 } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jay-site-a085kvd2r-umojah.vercel.app"),
  title: {
    default: "Jay Shah — Finance | Data | AI",
    template: "%s — Jay Shah",
  },
  description:
    "Chartered Accountant turned builder. Finance, data science, and machine learning — plus the tools and notes that come out of the work.",
  icons: { icon: "/favicon.ico", apple: "/icon.png" },
  openGraph: {
    title: "Jay Shah — Finance | Data | AI",
    description:
      "Chartered Accountant turned builder. Finance, data science, and machine learning.",
    images: ["/og.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${sourceSerif.variable}`}
    >
      <body className="min-h-screen bg-ink font-serif text-bone antialiased">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-5 py-16">{children}</main>
        <footer className="mt-16 border-t border-hairline">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Jay Shah</span>
            <span>Nairobi, Kenya</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
