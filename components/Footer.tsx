import Link from "next/link";
import { company, footerLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <img className="logo-on-light" src="/brand/logo.png" alt="LAYZOX, Technology for a Brighter Tomorrow" width={640} height={141} />
          <img className="logo-on-dark" src="/brand/logo-dark.png" alt="LAYZOX, Technology for a Brighter Tomorrow" width={640} height={141} />
          <p className="small">
            Custom software, automation, digital products and data systems for businesses that need reliable technology.
          </p>
          <address className="footer-address">
            <strong>Corporate Office</strong>
            {company.addressLines.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${company.tel1}`}>Call {company.phone1}</a>
            <a href={`tel:${company.tel2}`}>Call {company.phone2}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
        </div>

        {Object.entries(footerLinks).map(([group, links]) => (
          <nav key={group} aria-label={group} className="footer-col">
            <h3>{group}</h3>
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col">
          <h3>Company details</h3>
          <ul>
            <li>{company.name}</li>
            {company.grievance && <li>Grievance officer: {company.grievance}</li>}
          </ul>
        </div>
      </div>

      <div className="footer-word" aria-hidden="true">
        LAYZOX
      </div>

      <div className="wrap footer-bottom">
        <p className="small">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        <ul className="social">
          {company.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
