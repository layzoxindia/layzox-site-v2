import Shell from "@/components/Shell";
import { PageHero } from "@/components/PageBits";
import { company } from "@/lib/content";
import { LEGAL_UPDATED } from "@/lib/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Terms of Use", "Terms for using the Layzox India Pvt Ltd website.", "/terms");

export default function Terms() {
  return (
    <Shell>
      <PageHero
        crumbs={[{ name: "Terms", path: "/terms" }]}
        title="Terms of Use"
        lead="The ground rules for using this website."
      />
      <section className="section page-section">
        <div className="wrap prose">
          <p className="updated">Last updated: {LEGAL_UPDATED}</p>

          <h2>About this website</h2>
          <p>
            This website is operated by {company.name}. It describes our services and products and lets you contact us. By using it
            you agree to these terms.
          </p>

          <h2>Information on the site</h2>
          <p>
            We aim to keep the content accurate, but it is general information and not a quotation or an offer. Products marked
            “Coming soon” are not yet available. Dashboards and screens shown on this site are interactive demonstrations of what we can build. They
            use illustrative data and are not real customer information.
          </p>

          <h2>Project work</h2>
          <p>
            Any project we deliver is governed by a separate written agreement or proposal that sets out scope, timelines, fees,
            ownership and support. Nothing on this website creates a contract for services.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not misuse the site: do not attempt to disrupt it, probe it for vulnerabilities without permission, send spam through
            its forms, or use it unlawfully.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The Layzox name, logo, design and content on this site belong to {company.name} unless stated otherwise. Please ask before
            reusing them.
          </p>

          <h2>Links to other sites</h2>
          <p>We link to third-party sites such as social networks. We are not responsible for their content or practices.</p>

          <h2>Limitation of liability</h2>
          <p>
            The website is provided “as is”. To the extent permitted by law, we are not liable for loss arising from your use of the
            website or reliance on its content.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India, and the courts of India have jurisdiction, subject to applicable law.</p>

          <h2>Contact</h2>
          <p>
            Phone: <a href={`tel:${company.tel1}`}>{company.phone1}</a>
          </p>
        </div>
      </section>
    </Shell>
  );
}
