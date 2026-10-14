import Shell from "@/components/Shell";
import { CtaBand, PageHero, Section } from "@/components/PageBits";
import { why } from "@/lib/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Why Layzox",
  "A process-first approach to custom software: working software at every step, a named owner per deliverable, and code you keep.",
  "/why-layzox"
);

export default function Why() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Why Layzox", path: "/why-layzox" }]} title={why.title} lead={why.lead} />
      <Section title="What you can expect">
        <div className="card-grid">
          {why.reasons.map((r, i) => (
            <article className="info-card" key={r.t}>
              <span className="num">0{i + 1}</span>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="When we will tell you not to build" lead="Trust starts with saying no when no is the right answer.">
        <ul className="check-list">
          {why.honest.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </Shell>
  );
}
