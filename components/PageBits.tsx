import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL, company } from "@/lib/content";
import { whatsappUrl } from "@/lib/enquiry";
import { ArrowRight, Chat } from "./Icons";

export type Crumb = { name: string; path: string };

/** Hero for inner pages, with a visible breadcrumb and matching structured data. */
export function PageHero({
  crumbs,
  title,
  lead,
  aside,
}: {
  crumbs: Crumb[];
  title: string;
  lead: string;
  aside?: ReactNode;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
  return (
    <section className="page-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className={`wrap page-hero-grid${aside ? " has-aside" : ""}`}>
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            {crumbs.map((c, i) => (
              <span key={c.path}>
                <span aria-hidden="true"> / </span>
                {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
              </span>
            ))}
          </nav>
          <h1 className="page-title display">{title}</h1>
          <p className="lead page-lead">{lead}</p>
        </div>
        {aside && <div className="page-aside">{aside}</div>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Tell us what is slowing your team down." }: { title?: string }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <h2 className="cta-title display">{title}</h2>
        <div className="cta-actions">
          <a href="/contact" className="btn btn-primary">
            Discuss a project <ArrowRight />
          </a>
          <a
            className="btn btn-ghost"
            href={whatsappUrl(`Hello ${company.name}, I would like to discuss a project.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Chat /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function Section({ title, lead, children }: { title?: string; lead?: string; children: ReactNode }) {
  return (
    <section className="section page-section">
      <div className="wrap">
        {(title || lead) && (
          <header className="sec-head">
            {title && <h2 className="h2">{title}</h2>}
            {lead && <p className="lead">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
