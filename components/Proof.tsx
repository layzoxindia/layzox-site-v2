import { proof } from "@/lib/content";

/** Renders nothing until real clients, quotes or a video are added in lib/content.ts. */
export default function Proof() {
  const { clients, quotes, video } = proof;
  if (!clients.length && !quotes.length && !video) return null;
  return (
    <section className="sec proof" id="proof" aria-labelledby="proof-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="proof-h" className="display">Work we have delivered</h2>
        </div>
        {video && (
          <figure className="proof-video">
            <video src={video.src} poster={video.poster} controls playsInline preload="none" />
            <figcaption>{video.caption}</figcaption>
          </figure>
        )}
        {clients.length > 0 && (
          <ul className="proof-clients">
            {clients.map((c) => (
              <li key={c.name}>{c.logo ? <img src={c.logo} alt={c.name} /> : c.name}</li>
            ))}
          </ul>
        )}
        {quotes.length > 0 && (
          <div className="proof-quotes">
            {quotes.map((q) => (
              <blockquote key={q.name}>
                <p>{q.text}</p>
                <footer><b>{q.name}</b>, {q.role}</footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
