import type { Metadata } from "next";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | LAYZOX`,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | LAYZOX`, description, url: path, siteName: "LAYZOX", type: "website" },
  };
}
