import Shell from "@/components/Shell";
import { CtaBand, PageHero, Section } from "@/components/PageBits";
import { careers } from "@/lib/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Careers",
  "Layzox is a remote-first team. We are always glad to hear from engineers, designers and delivery people.",
  "/careers"
);

export default function Careers() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Careers", path: "/careers" }]} title={careers.title} lead={careers.lead} />
      <Section title="Who we like to hear from">
        <ul className="check-list">
          {careers.looking.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Section>
      <Section title="How to reach us">
        <div className="prose">
          <p>{careers.how}</p>
        </div>
      </Section>
      <CtaBand title="Send us a short note." />
    </Shell>
  );
}
