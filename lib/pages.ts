// Copy for the inner pages. Everything here describes how Layzox works and what it can build;
// nothing claims past clients, numbers or certifications.
import type { SceneId } from "@/components/Scenes";

export const LEGAL_UPDATED = "14 October 2026";

export const about = {
  title: "A new software company for teams worldwide.",
  lead: "Layzox is a new company. We build custom software and automation for businesses worldwide.",
  beliefs: [
    {
      t: "Map the real process first",
      d: "Most delays are not a software problem. We write down how work actually moves, who touches it and where it waits, before choosing any tool.",
    },
    {
      t: "Review something that runs",
      d: "At each step you open the product and try it. Questions get answered on the screen.",
    },
    {
      t: "You keep what we build",
      d: "The code, deployment steps and documentation are yours at handover. You can hire anyone to continue the work.",
    },
    {
      t: "Use AI only where it earns its place",
      d: "Plain rules and integrations come first. If AI helps, a person checks anything that has to be accurate.",
    },
  ],
  where: "We are a remote-first team and work with clients around the world. Meetings happen over video call.",
};

export const why = {
  title: "Why teams choose Layzox.",
  lead: "What you can expect, and when you should not hire us.",
  reasons: [
    { t: "We start with your process", d: "Before any code we sit with your team and write down how the work moves today." },
    { t: "Progress you can click", d: "Work is reviewed in functioning software at each step, so surprises show up early and cheaply." },
    { t: "Someone you can name", d: "For every deliverable you know who to call." },
    { t: "Built to be handed over", d: "Source, deployment steps and documentation come with the project. Your next developer can pick it up." },
    { t: "Testing that fits the stakes", d: "A brochure site and a payments system do not need the same checks. We decide together how much testing is enough." },
  ],
  honest: [
    "If a spreadsheet and a shared checklist solve your problem, we will say so.",
    "If an existing product fits, we will point you to it rather than build something new.",
    "If a request is unclear, we will ask questions before quoting, not after.",
  ],
};

export const faqs: { q: string; a: string }[] = [
  {
    q: "What does Layzox build?",
    a: "Custom software and internal tools, AI and workflow automation, web applications, mobile apps, cloud and data systems, and technology consulting. Each is described on its own page.",
  },
  {
    q: "Where are your clients based?",
    a: "Anywhere. We work remotely with teams around the world, and meetings happen over video call.",
  },
  {
    q: "Will I own the code?",
    a: "Yes. At handover you get the source code, the deployment details and the documentation.",
  },
  {
    q: "How does a project start?",
    a: "With a conversation about how your work runs today. We write that down, agree what is built first and what waits, and only then start.",
  },
  {
    q: "How are timelines and cost decided?",
    a: "They depend on scope, so we do not quote a number before understanding the problem. After discovery you receive a written scope, with the trade-offs explained.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Usually, yes. We connect existing spreadsheets, forms, WhatsApp, email and other systems wherever they offer a way to integrate, rather than asking you to start over.",
  },
  {
    q: "Do you use AI?",
    a: "Only where it adds value. Rules and integrations come first. Where AI is involved, such as extracting data from documents, a person reviews anything that has to be accurate.",
  },
  {
    q: "How do you handle security and data?",
    a: "Each user sees only what their role allows, and actions are logged. Tell us early if you handle sensitive or regulated data, because that changes how much checking we do.",
  },
  {
    q: "What happens after launch?",
    a: "You receive the handover: code, deployment details and documentation. Ongoing maintenance or support can be agreed separately, depending on what your team needs.",
  },
  {
    q: "What are Layzox Growth, Revenue and Accounts?",
    a: "Products we are building for recurring business problems. They are marked “Coming soon” until they are ready for real use. You can join the launch list on the home page.",
  },
  {
    q: "How do I get started?",
    a: "Use the contact form, call, or message us on WhatsApp. Describe what is slow or scattered today and we will reply with next steps.",
  },
];

export const careers = {
  title: "Build useful software with us.",
  lead: "We are not advertising specific openings right now, but we are always glad to hear from people who build software, design interfaces or run delivery well.",
  looking: [
    "Engineers who care about maintainable code and clear handover",
    "Designers who think about real users and real workflows",
    "Delivery and project people who keep scope honest",
  ],
  how: "Send a short note about what you have built or run, with a link to your work if you have one. Use the contact form, or message us on WhatsApp.",
};

export type ServiceDetail = {
  scene: SceneId;
  headline: string;
  intro: string;
  builds: { t: string; d: string }[];
  fit: string[];
  approach: string[];
};

export const serviceDetail: Record<string, ServiceDetail> = {
  custom: {
    scene: "custom",
    headline: "Business systems built around how your team actually works.",
    intro:
      "When off-the-shelf software forces your team to bend its process, we build the system around the process instead. Internal tools, dashboards and platforms that replace sheets, chats and manual follow-up.",
    builds: [
      { t: "Operations dashboards", d: "One live view of orders, approvals and follow-ups, drawn from the sheets and forms you already use." },
      { t: "Workflow platforms", d: "Requests, approvals and status in one place, with permissions and a record of who did what." },
      { t: "Customer and partner portals", d: "A secure login where customers or partners see their own orders, documents and updates." },
      { t: "CRM and ERP modules", d: "Focused modules that fit beside the systems you already run, with integrations where needed." },
    ],
    fit: [
      "Work lives across spreadsheets, WhatsApp and email",
      "Your process is specific to your business",
      "Approvals or reporting depend on one person compiling data",
    ],
    approach: ["Map the real process", "Build the smallest useful version", "Review it with your team", "Extend and hand over"],
  },
  automation: {
    scene: "automation",
    headline: "Repetitive steps handled for you. A person still checks anything that must be right.",
    intro:
      "We automate repetitive work: routing requests, reading documents, sending reminders, updating records. Rules and integrations first, AI where it genuinely helps, and review where mistakes would cost you.",
    builds: [
      { t: "Approval flows", d: "Multi-step approvals with permissions, reminders and an exportable log." },
      { t: "Document handling", d: "Documents are read, routed and extracted, then sent for human review before anything is final." },
      { t: "Message-to-record automation", d: "A WhatsApp or email request becomes a structured record and reaches the right person." },
      { t: "Scheduled tasks and reports", d: "Daily summaries, overdue alerts and recurring updates without manual effort." },
    ],
    fit: [
      "The same steps are repeated many times a day",
      "Requests get lost between chats, email and sheets",
      "You want AI help but cannot accept unchecked output",
    ],
    approach: ["List the repeated steps", "Automate with rules first", "Add AI only where it adds value", "Keep a human check on what matters"],
  },
  web: {
    scene: "web",
    headline: "Portals, platforms and SaaS products that stay maintainable.",
    intro:
      "From a customer portal to a full SaaS product, we build web applications that are fast, accessible and secure according to the risk, and structured so the next developer can extend them.",
    builds: [
      { t: "Customer portals", d: "Orders, documents, tickets and notifications behind a secure login." },
      { t: "Internal platforms", d: "Back-office applications for teams, with roles and audit history." },
      { t: "SaaS products", d: "From discovery to production: accounts, billing-ready architecture and a clean codebase." },
      { t: "Marketing and product websites", d: "Fast, accessible sites that explain what you do and turn visits into conversations." },
    ],
    fit: [
      "You need a login-based product for customers or staff",
      "You are turning an internal tool into a product",
      "Your current site is slow, hard to update or hard to use on phones",
    ],
    approach: ["Define users and key journeys", "Design and build in working steps", "Check accessibility, speed and security", "Launch and hand over"],
  },
  mobile: {
    scene: "mobile",
    headline: "Customer and field apps backed by your own systems.",
    intro:
      "Mobile apps for people who work away from a desk, or for customers who expect to do things on their phone. Built on the same data as your web systems, so there is one source of truth.",
    builds: [
      { t: "Field operations apps", d: "Visit lists, reports, photos and status updates captured on site." },
      { t: "Customer apps", d: "Orders, bookings, documents and notifications in your customers’ hands." },
      { t: "Notifications and offline-friendly flows", d: "Alerts that matter, and screens that keep working when the signal does not." },
      { t: "API-backed architecture", d: "Web and mobile share one set of APIs and one database." },
    ],
    fit: [
      "Your team collects information away from a desk",
      "Customers would rather use an app than call",
      "You want web and mobile to show the same data",
    ],
    approach: ["Decide what must work offline", "Build the key flow first", "Test on real devices", "Release and iterate"],
  },
  cloud: {
    scene: "cloud",
    headline: "Deployment, monitoring and reporting you can rely on.",
    intro:
      "Software is only useful while it is running. We set up deployment, monitoring and backups, bring scattered data together, and build reporting that shows what needs attention now.",
    builds: [
      { t: "Deployment and hosting", d: "Repeatable releases, environments and rollbacks, documented for your team." },
      { t: "Monitoring and backups", d: "Alerts when something breaks and backups you have actually tested." },
      { t: "Data pipelines", d: "Data from sheets, billing and apps brought into one clean place." },
      { t: "Dashboards and alerts", d: "Operational reporting that points to what needs action." },
    ],
    fit: [
      "Releases feel risky or manual",
      "Nobody is sure the backups work",
      "Reports are assembled by hand every week",
    ],
    approach: ["Review what runs today", "Automate deployment", "Add monitoring and backups", "Connect data to reporting"],
  },
  consulting: {
    scene: "consulting",
    headline: "A clear plan before anything is built.",
    intro:
      "Sometimes the right first step is a plan, not code. We review your systems, name the technical risks, and write an implementation plan with clear scope and trade-offs.",
    builds: [
      { t: "Architecture review", d: "A candid look at what you have, what is fragile and what to fix first." },
      { t: "Modernising without a full rebuild", d: "Step-by-step upgrades that keep the business running." },
      { t: "Implementation planning", d: "Scope, sequence, risks and trade-offs written down so decisions are informed." },
      { t: "Technology selection", d: "Choosing tools and vendors for your situation, including “do not build this”." },
    ],
    fit: [
      "You are unsure what to build, or whether to build at all",
      "An old system is slowing you down but a rebuild feels too big",
      "You need a second opinion before committing budget",
    ],
    approach: ["Understand goals and constraints", "Review current systems", "Write the options and trade-offs", "Agree a plan"],
  },
};
