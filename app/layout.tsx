import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jay Shah",
  description: "Jay Shah — finance, sales, and building with data/ML.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <header className="border-b border-neutral-200">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold">
              Jay Shah
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/blog">Blog</Link>
              <Link href="/tools">Tools</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-10 text-sm text-neutral-500">
          © {new Date().getFullYear()} Jay Shah
        </footer>
      </body>
    </html>
  );
}
