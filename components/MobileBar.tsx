import { company } from "@/lib/content";
import { whatsappUrl } from "@/lib/enquiry";
import { Chat, Phone } from "./Icons";

/** A thumb-reach action bar, shown on phones only. */
export default function MobileBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick contact">
      <a href={`tel:${company.tel1}`} className="btn btn-ghost btn-sm">
        <Phone /> Call
      </a>
      <a
        href={whatsappUrl("Hello Layzox, I would like to discuss a project.")}
        className="btn btn-primary btn-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Chat /> WhatsApp
      </a>
    </div>
  );
}
