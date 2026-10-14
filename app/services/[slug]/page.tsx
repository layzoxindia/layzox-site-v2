import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { Scene } from "@/components/Scenes";
import { CtaBand, PageHero, Section } from "@/components/PageBits";
import { services } from "@/lib/content";
import { serviceDetail } from "@/lib/pages";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.id === slug);
  if (!s) return {};
  return pageMeta(s.name, `${s.summary} ${s.points[0]}.`, `/services/${s.id}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.id === slug);
  const d = serviceDetail[slug];
  if (!s || !d) notFound();

  return (
    <Shell>
      <PageHero
        crumbs={[{ name: s.name, path: `/services/${s.id}` }]}
        title={d.headline}
        lead={d.intro}
        aside={<Scene id={d.scene} label={`Animated example of ${s.name.toLowerCase()}`} />}
      />

      <Section title={`What ${s.name.toLowerCase()} covers`}>
        <div className="card-grid">
          {d.builds.map((b, i) => (
            <article className="info-card" key={b.t}>
              <span className="num">0{i + 1}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="A good fit when">
        <ul className="check-list">
          {d.fit.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </Section>

      <Section title="How we approach it">
        <ol className="steps">
          {d.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      </Section>

      <Section title="Other services">
        <div className="other-services">
          {services
            .filter((x) => x.id !== s.id)
            .map((x) => (
              <Link key={x.id} href={x.slug}>
                {x.name}
              </Link>
            ))}
        </div>
      </Section>

      <CtaBand />
    </Shell>
  );
}
