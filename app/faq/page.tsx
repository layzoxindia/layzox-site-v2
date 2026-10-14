import Shell from "@/components/Shell";
import { CtaBand, PageHero, Section } from "@/components/PageBits";
import { faqs } from "@/lib/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "FAQ",
  "Answers about what Layzox builds, how projects start, who owns the code, security, AI and what happens after launch.",
  "/faq"
);

export default function Faq() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        title="Questions, answered plainly."
        lead="What teams usually ask before starting a project with us."
      />
      <Section>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand title="Still have a question? Ask us directly." />
    </Shell>
  );
}
