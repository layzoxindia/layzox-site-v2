import type { Metadata, Viewport } from "next";
import { Newsreader, Sora } from "next/font/google";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/sections.css";
import "../styles/scenes.css";
import "../styles/footer.css";
import "../styles/pages.css";
import { SITE_URL, company } from "@/lib/content";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "LAYZOX | Custom Software, AI Automation & Digital Products", template: "%s" },
  description:
    "LAYZOX builds custom software, AI and workflow automation, web and mobile applications, cloud and data systems for businesses worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "LAYZOX | Custom Software, AI Automation & Digital Products",
    description:
      "Custom software, AI automation, web and mobile applications, cloud and data engineering for businesses worldwide.",
    url: "/",
    siteName: "LAYZOX",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#040a16" },
  ],
};

// Runs before first paint so the page never flashes the wrong mode.
const themeInit = `try{var t=localStorage.getItem('lzx-theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LAYZOX",
              legalName: "Layzox India Pvt Ltd",
              url: SITE_URL,
              logo: `${SITE_URL}/brand/logo.png`,
              sameAs: company.social.map((s) => s.href),
              telephone: company.phone1,
              email: company.email,
              contactPoint: [
                { "@type": "ContactPoint", telephone: company.phone1, contactType: "sales", areaServed: "Worldwide", availableLanguage: ["en"] },
                { "@type": "ContactPoint", telephone: company.phone2, contactType: "customer service", areaServed: "Worldwide", availableLanguage: ["en"] },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
