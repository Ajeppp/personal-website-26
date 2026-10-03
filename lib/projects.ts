export type ScreenKind = "jese" | "lexify" | "moses" | "nikmat" | "mbb";

export type Project = {
  num: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  description: string;
  points: string[];
  tags: string[];
  link?: string;
  /** button label for `link`; defaults to "Visit site" */
  linkLabel?: string;
  /** shown instead of a button when there is nothing public to open */
  status?: string;
  /** which 3D device carries it, and which interface is drawn on its screen */
  device: "phone" | "browser";
  screen: ScreenKind;
  /** glow behind the device — the project's own brand hue */
  hue: string;
};

export const projects: Project[] = [
  {
    num: "01",
    title: "JESE",
    subtitle: "Personal Finance OS",
    year: "2026",
    role: "Solo — design, build, ship",
    description:
      "A private money cockpit: income, expenses, budgets with alerts, credit-card installments and an investment ledger. Every balance is derived from a single transaction log — never stored.",
    points: [
      "Ledger-first: balances are always computed",
      "Budget + credit-limit alert engine",
      "Average-cost P/L on investments",
    ],
    tags: ["Next.js 15", "TypeScript", "Drizzle", "Neon Postgres", "NextAuth"],
    status: "Private app",
    device: "phone",
    screen: "jese",
    hue: "#6fa3c6",
  },
  {
    num: "02",
    title: "Lexify",
    subtitle: "API Documentation Platform",
    year: "2026",
    role: "Solo — architecture to UI",
    description:
      "A Mintlify-style docs engine driven by one config file: MDX guides next to OpenAPI references, per-tab versioning, a live Try-It playground and generated code samples.",
    points: [
      "OpenAPI → reference pages, zero hand-writing",
      "⌘K search, EN / ID localisation",
      "Built-in visual editor & dashboard",
    ],
    tags: ["Next.js", "TypeScript", "OpenAPI", "MDX", "Shiki", "Tiptap"],
    status: "Private build",
    device: "browser",
    screen: "lexify",
    hue: "#2fd49a",
  },
  {
    num: "03",
    title: "MOSES",
    subtitle: "Scheduling Engine",
    year: "2026",
    role: "Fullstack",
    description:
      "An automated scheduling app for church volunteer assignments — eliminating manual errors and complex unavailability conflicts, behind secure JWT auth and scalable REST APIs.",
    points: [
      "Automated volunteer assignment",
      "Resolves unavailability conflicts",
      "Go + Gin REST API, JWT auth",
    ],
    tags: ["Next.js", "Golang", "Gin", "PostgreSQL"],
    link: "https://github.com/Ajeppp/MOSES-PROJECT",
    linkLabel: "View source",
    device: "browser",
    screen: "moses",
    hue: "#f0b24a",
  },
  {
    num: "04",
    title: "Nikmat Group",
    subtitle: "Corporate Website",
    year: "2024",
    role: "Frontend — Hesed Tech",
    description:
      "A polished, content-managed corporate site for a food & beverage company. Built with Laravel and Vue.js on the Twill CMS framework as part of a focused frontend team.",
    points: ["Twill CMS content model", "Built in a focused frontend team"],
    tags: ["Laravel", "Vue.js", "Twill"],
    link: "https://nikmatgroup.co/",
    device: "browser",
    screen: "nikmat",
    hue: "#e8794a",
  },
  {
    num: "05",
    title: "Me But Better",
    subtitle: "Skincare E-Commerce",
    year: "2024",
    role: "Fullstack — Hesed Tech",
    description:
      "An end-to-end e-commerce experience for a skincare brand — product catalog, content management, and a streamlined checkout. Owned both frontend and backend in a small team.",
    points: ["Catalog, cart & checkout", "Frontend and backend, end to end"],
    tags: ["Laravel", "Vue.js", "E-Commerce"],
    link: "https://mebutbetter.co",
    device: "phone",
    screen: "mbb",
    hue: "#f29ab8",
  },
];
