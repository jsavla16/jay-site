"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return [
      "font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
      active ? "text-accent" : "text-bone/70 hover:text-bone",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        {/* Mark stays pure white so it outranks the off-white body text */}
        <Link href="/" className="flex items-center gap-3" aria-label="Jay Shah — home">
          <Image src="/mark.png" alt="" width={32} height={32} priority className="h-8 w-8" />
          <span className="font-sans text-sm font-medium tracking-tight text-white">
            Jay Shah
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="font-mono text-xs text-bone/70 md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hairline md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${linkClass(link.href)} py-3`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
