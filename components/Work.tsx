import { solutions, alsoBuild } from "@/lib/content";
import { Scene } from "./Scenes";
import type { SceneId } from "./Scenes";

const SCENES: SceneId[] = ["custom", "automation", "web"];

export default function Work() {
  const [lead, ...rest] = solutions;
  return (
    <section id="solutions" className="section work">
      <div className="wrap">
        <header className="sec-head">
          <h2 className="h2">What we can build for you</h2>
          <p className="lead">
            Examples of what we can build for you. Tell us your process and we shape one around it.
          </p>
        </header>

        <div className="work-grid">
          <article className="case case-lead">
            <div className="case-art">
              <Scene id={SCENES[0]} label={`Animated example: ${lead.kind.toLowerCase()}`} />
            </div>
            <div className="case-body">
              <div className="case-meta">
                <span>{lead.kind}</span>
              </div>
              <h3 className="case-title display">{lead.headline}</h3>
              <dl className="case-facts">
                <div>
                  <dt>The problem</dt>
                  <dd>{lead.problem}</dd>
                </div>
                <div>
                  <dt>What we build</dt>
                  <dd>{lead.built}</dd>
                </div>
                <div>
                  <dt>What you get</dt>
                  <dd>{lead.outcome}</dd>
                </div>
              </dl>
            </div>
          </article>

          {rest.map((c, i) => (
            <article className="case case-small" key={c.kind}>
              <div className="case-art">
                <Scene id={SCENES[i + 1]} label={`Animated example: ${c.kind.toLowerCase()}`} />
              </div>
              <div className="case-body">
                <div className="case-meta">
                  <span>{c.kind}</span>
                </div>
                <h3 className="case-title-sm display">{c.headline}</h3>
                <p className="small">{c.problem}</p>
                <p className="small">{c.built}</p>
                <ul className="case-points">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="also">
          <h3 className="also-title">Also in scope</h3>
          <ul className="also-list">
            {alsoBuild.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
