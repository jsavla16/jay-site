export type ProjectStatus = "live" | "in-progress" | "planned";

export type ProjectLink = {
  label: string;
  href: string;
  /** Opens in a new tab. Omit for internal routes. */
  external?: boolean;
};

/**
 * The root cause is a required half of this pair on purpose.
 *
 * A project write-up that says "the layout was tricky" proves nothing. The
 * value is in the specific thing that turned out to be wrong, so the type
 * makes it impossible to describe a problem without naming its cause.
 */
export type HardThing = {
  symptom: string;
  rootCause: string;
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  /** One line under the name. Omitted where there is deliberately no copy. */
  tagline?: string;
  whatItIs?: string;
  whoUsesIt?: string;
  stack?: string[];
  hardThing?: HardThing;
  links?: ProjectLink[];
};

// Order is deliberate: the live, revenue-carrying project first. A reader
// arriving from the CV should hit the strongest evidence before the promises.
export const projects: Project[] = [
  {
    slug: "umojah-sound-system",
    name: "Umojah Sound System",
    status: "live",
    tagline:
      "The booking front door for Kenya's first traditional reggae and dub sound system.",
    whatItIs:
      "A production site for a sound system hand-built in Nairobi. It carries the equipment hire business, the record label's mailing list, and the Nairobi Dub Club event archive.",
    whoUsesIt:
      "Promoters and venues booking the rig, clients commissioning custom sound system builds, and the audience checking event dates. Traffic is overwhelmingly mobile.",
    stack: [
      "Next.js 16 (App Router)",
      "Tailwind CSS",
      "Vercel",
      "Resend",
      "ImprovMX",
      "Cookieless analytics",
    ],
    hardThing: {
      symptom:
        "The mailing list form reported success for every submission and added nobody. 200 OK in the logs, “You're on the list” on screen, no error anywhere, and an empty audience in Resend.",
      rootCause:
        "The spam honeypot tested whether the hidden field existed rather than whether it had a value. The form always sends it — empty, for a human — so every real submission was classified as a bot, returned OK, and never reached Resend at all. It was caught by an absence rather than an error: the route logs on failure, so a 200 with no log line meant the code never got that far.",
    },
    links: [
      {
        label: "Live site",
        href: "https://umojahsoundsystem.com",
        external: true,
      },
      {
        label: "Repo",
        href: "https://github.com/jsavla16/umojah-website",
        external: true,
      },
      // Points at the blog index until the honeypot post is published, then
      // becomes /blog/<slug>. Deliberately not a dead anchor in the meantime.
      { label: "Build log", href: "/blog" },
    ],
  },
  {
    slug: "kenya-land-rag",
    name: "Kenyan Land Law RAG",
    status: "in-progress",
    tagline:
      "Retrieval over Kenya's land and property statutes, with every answer cited to section.",
    // No body copy until the thing exists and has been evaluated. Numbers
    // from a run that has actually happened, or nothing.
  },
  {
    slug: "integral-structural-steel-search",
    name: "Integral Structural Steel — search",
    status: "planned",
    // COPY WITHHELD ON PURPOSE. Client work, in progress, not to be written
    // up. Do not fill this in without the client's agreement — the slot
    // exists to hold the position in the list, not to be completed later by
    // whoever next edits this file.
  },
];
