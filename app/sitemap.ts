import type { MetadataRoute } from "next";
import { SITE_URL, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/approach", "/services", "/ai-agents", "/principles", "/contact", "/about", "/why-layzox", "/faq", "/careers", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p || "/"}`, lastModified: now, priority: p ? 0.6 : 1 })),
    ...services.map((s) => ({ url: `${SITE_URL}${s.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
