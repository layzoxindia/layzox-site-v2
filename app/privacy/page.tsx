import Shell from "@/components/Shell";
import { PageHero } from "@/components/PageBits";
import { company } from "@/lib/content";
import { LEGAL_UPDATED } from "@/lib/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Privacy Policy", "How Layzox India Pvt Ltd collects, uses and protects information from this website.", "/privacy");

export default function Privacy() {
  return (
    <Shell>
      <PageHero
        crumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
        title="Privacy Policy"
        lead="What we collect on this website, why, and the choices you have."
      />
      <section className="section page-section">
        <div className="wrap prose">
          <p className="updated">Last updated: {LEGAL_UPDATED}</p>

          <h2>Who we are</h2>
          <p>
            This website is operated by {company.name}. In this policy, “we” means {company.name}.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Enquiry form:</strong> your name, phone or WhatsApp number, email address (optional), company (optional),
              project type and the message you write.
            </li>
            <li>
              <strong>Launch list:</strong> the email address you enter to hear about our products.
            </li>
            <li>
              <strong>WhatsApp, phone or email:</strong> whatever you choose to send us when you contact us directly.
            </li>
            <li>
              <strong>Your browser:</strong> your light or dark theme choice is stored in your own browser (local storage) so the page
              looks the same next time. It is not sent to us.
            </li>
            <li>
              <strong>Technical logs:</strong> our hosting provider may record standard request information such as IP address and
              browser type for security and reliability.
            </li>
          </ul>

          <h2>How we use it</h2>
          <p>
            To reply to your enquiry, discuss and deliver work you ask for, tell you about product launches if you joined the list,
            keep the website secure, and meet legal obligations. We do not sell personal information.
          </p>

          <h2>Who it is shared with</h2>
          <p>
            We use service providers to run the site and deliver enquiries to us, for example hosting and email delivery. They process
            information only to provide those services. If you contact us through WhatsApp, that conversation is also subject to
            WhatsApp’s own terms and privacy policy.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            This website does not use advertising cookies. If we add analytics in future, we will describe it here and use
            privacy-respecting settings.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details for as long as needed to respond, to manage any resulting work, and for our records. You can ask us
            to delete them sooner.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to tell you what personal information we hold about you, to correct it, to delete it, or to stop contacting
            you, in line with the Digital Personal Data Protection Act, 2023 and other applicable law. Contact us using the details
            below.
          </p>

          <h2>Contact and grievances</h2>
          <p>
            Phone: <a href={`tel:${company.tel1}`}>{company.phone1}</a>
            {company.grievance && (
              <>
                <br />
                Grievance officer: {company.grievance}
              </>
            )}
          </p>

          <h2>Changes</h2>
          <p>We may update this policy. The date at the top shows when it last changed.</p>
        </div>
      </section>
    </Shell>
  );
}
