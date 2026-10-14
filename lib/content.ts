// All copy and links live here so the design can be tuned without touching components.
// Leave grievance as "" until you have the real value; it is hidden while empty.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.layzox.com";

export const company = {
  name: "Layzox India Pvt Ltd",
  tagline: "Technology for a Brighter Tomorrow",
  phone1: "+91 92631 39770",
  phone2: "+91 92631 39771",
  tel1: "+919263139770",
  tel2: "+919263139771",
  whatsapp: "919263139771",
  whatsappDisplay: "+91 92631 39771",
  email: "contact@layzox.com",
  addressLines: ["806, 8th Floor, Mahabir Tower", "Main Road, Ranchi, Jharkhand 834001"],
  // Fill these in before launch (the privacy page should carry them too).
  grievance: "",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/145272503/" },
    { label: "Instagram", href: "https://www.instagram.com/layzoxindia/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61595213486659" },
    { label: "X", href: "https://x.com/LayzoxIndia" },
  ],
};

/** Forms post here. The route needs RESEND_API_KEY and ENQUIRY_TO_EMAIL on the server;
 *  without them it answers 503 and the form falls back to a pre-filled WhatsApp message. */
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry";

export const nav = [
  { label: "Approach", href: "/approach" },
  { label: "Services", href: "/services" },
  { label: "AI agents", href: "/ai-agents" },
  { label: "Principles", href: "/principles" },
  { label: "Contact", href: "/contact" },
];

export const heroFacts = [
  { title: "Clients worldwide", text: "Remote delivery, video meetings" },
  { title: "Built to your process", text: "We map how work runs first" },
  { title: "You keep the code", text: "Source, docs and deployment details" },
];

export const story = {
  steps: [
    {
      title: "Today the work lives in five places.",
      text: "Orders in WhatsApp, numbers in sheets, approvals in email, history in a register. Nobody has the whole picture.",
    },
    {
      title: "We connect what already exists.",
      text: "We map the real process first, then link the tools, files and people already involved.",
    },
    {
      title: "One system, one view, one record.",
      text: "Requests, approvals and status in a single place, with permissions and a log of who did what.",
    },
  ],
};

export const statement =
  "Orders sit in a WhatsApp group, payments in a sheet, approvals in someone’s inbox. We put them in one place that everyone can open.";

export type Service = {
  id: string;
  name: string;
  summary: string;
  points: string[];
  slug: string;
};

export const services: Service[] = [
  {
    id: "custom",
    name: "Custom software",
    summary: "Business systems built around how your team actually works.",
    points: [
      "Internal tools, dashboards and workflow platforms",
      "Customer and partner portals",
      "CRM and ERP modules, integrations with what you already use",
    ],
    slug: "/services/custom",
  },
  {
    id: "automation",
    name: "AI and workflow automation",
    summary: "Repetitive steps handled for you. A person still checks anything that must be right.",
    points: [
      "Approval flows with permissions and logs",
      "Document handling that routes and extracts, then asks for review",
      "AI only where it adds value; rules and integrations first",
    ],
    slug: "/services/automation",
  },
  {
    id: "web",
    name: "Web applications",
    summary: "Portals, platforms and SaaS products that stay maintainable.",
    points: [
      "Customer portals and internal platforms",
      "SaaS products from discovery to production",
      "Accessible, fast and secure according to risk",
    ],
    slug: "/services/web",
  },
  {
    id: "mobile",
    name: "Mobile apps",
    summary: "Customer and field apps backed by your own systems.",
    points: [
      "Field operations and customer apps",
      "Notifications and offline-friendly flows",
      "API-backed, so web and mobile share one source of truth",
    ],
    slug: "/services/mobile",
  },
  {
    id: "cloud",
    name: "Cloud and data",
    summary: "Deployment, monitoring and reporting you can rely on.",
    points: [
      "Deployment, monitoring and backups",
      "Data pipelines and operational reporting",
      "Dashboards and alerts that show what needs attention now",
    ],
    slug: "/services/cloud",
  },
  {
    id: "consulting",
    name: "Technology consulting",
    summary: "A clear plan before anything is built.",
    points: [
      "Architecture review and technical risk",
      "Modernising systems without a full rebuild",
      "Implementation planning with clear scope and trade-offs",
    ],
    slug: "/services/consulting",
  },
];

export const processSteps = [
  {
    title: "Scope it",
    text: "We write down who uses it, how the work moves today and what finished looks like, before any code.",
  },
  {
    title: "Build it",
    text: "You get something you can click through at each stage, so wrong turns show up early.",
  },
  {
    title: "Test it",
    text: "We test forms, permissions, speed and security. How hard we test depends on what the system holds.",
  },
  {
    title: "Hand it over",
    text: "You receive the code, how it is deployed and the documentation, each with a person responsible.",
  },
];

export type Solution = {
  kind: string;
  headline: string;
  problem: string;
  built: string;
  outcome: string;
  points: string[];
};

// Example solutions Layzox can build. These describe capability, not past clients.
export const solutions: Solution[] = [
  {
    kind: "Operations dashboard",
    headline: "One live view of orders, approvals and follow-ups",
    problem: "Data sits in sheets, WhatsApp groups and registers, so nobody sees the full picture until someone compiles it by hand.",
    built: "A web dashboard that pulls from your existing sheets and forms, shows what is open, waiting and overdue, and keeps a log of who did what.",
    outcome: "Owners and managers read status in one place instead of asking around.",
    points: ["Role-based access", "Excel and Google Sheets import", "Daily summary on WhatsApp or email"],
  },
  {
    kind: "Approval workflow",
    headline: "Requests that route themselves to the right person",
    problem: "Purchase, leave, payment and site requests move by message and get lost.",
    built: "A request-and-approval system with rules, reminders and a full audit trail.",
    outcome: "Every request has an owner, a status and a record.",
    points: ["Multi-step approvals", "Reminders for pending items", "Exportable history"],
  },
  {
    kind: "Customer or partner portal",
    headline: "A login where customers see their own orders and documents",
    problem: "Customers and partners keep calling for status, invoices and files.",
    built: "A secure portal with their orders, documents, tickets and notifications.",
    outcome: "Fewer status calls and a more professional first impression.",
    points: ["Secure login", "Document sharing", "Status notifications"],
  },
];

export const alsoBuild = [
  "Websites and landing pages",
  "Mobile apps",
  "CRM and lead tracking",
  "Billing and invoicing tools",
  "WhatsApp and AI automation",
  "APIs and integrations",
  "Reports and analytics",
  "Cloud setup and migration",
];

export const industries = [
  { id: "edu", name: "Education and training", text: "Admissions, assessments, student operations, portals" },
  { id: "health", name: "Healthcare and clinics", text: "Appointments, workflows, dashboards, integrations" },
  { id: "retail", name: "Retail and commerce", text: "Orders, inventory visibility, CRM, customer journeys" },
  { id: "services", name: "Professional services", text: "Lead-to-delivery, approvals, client portals, documents" },
  { id: "mfg", name: "Manufacturing and distribution", text: "Operational tracking, field coordination, visibility" },
  { id: "realty", name: "Real estate and field operations", text: "Lead flow, field updates, asset workflows, reporting" },
];

export const products = [
  {
    id: "growth",
    name: "Layzox Growth",
    text: "Turns scattered business signals into prioritised actions you can measure.",
  },
  {
    id: "revenue",
    name: "Layzox Revenue",
    text: "Pipeline visibility, structured follow-up and automation for sales teams.",
  },
  {
    id: "accounts",
    name: "Layzox Accounts",
    text: "Accounting and business finance workflows for growing companies.",
  },
];

export const projectTypes = [
  "Custom software",
  "AI or workflow automation",
  "Website or web application",
  "Mobile application",
  "SaaS or product engineering",
  "Cloud or data engineering",
  "Technology consulting",
  "Not sure yet",
];

export const footerLinks = {
  Services: services.map((s) => ({ label: s.name, href: s.slug })),
  Company: [
    { label: "About", href: "/about" },
    { label: "Why Layzox", href: "/why-layzox" },
    { label: "FAQ", href: "/faq" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

// Real proof goes here once you have it. While every list is empty the Proof section does not render.
export const proof: {
  clients: { name: string; logo?: string }[];
  quotes: { text: string; name: string; role: string }[];
  video?: { src: string; poster?: string; caption: string };
} = { clients: [], quotes: [] };
