import Shell from "@/components/Shell";
import { CtaBand, PageHero, Section } from "@/components/PageBits";
import { about, } from "@/lib/pages";
import { company } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About",
  "Layzox builds custom software, automation and data systems for businesses worldwide.",
  "/about"
);

export default function About() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "About", path: "/about" }]} title={about.title} lead={about.lead} />
      <Section title="How we work" lead="Four commitments we hold every project to.">
        <div className="card-grid">
          {about.beliefs.map((b, i) => (
            <article className="info-card" key={b.t}>
              <span className="num">0{i + 1}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Where we are">
        <div className="prose">
          <p>{about.where}</p>
          <p>
            Phone: <a href={`tel:${company.tel1}`}>{company.phone1}</a>, <a href={`tel:${company.tel2}`}>{company.phone2}</a>
          </p>
        </div>
      </Section>
      <CtaBand />
    </Shell>
  );
}
