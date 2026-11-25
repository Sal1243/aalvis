import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { LEGAL } from "@/lib/legal";

const PATHS = ["", ...Object.keys(LEGAL).map((d) => `legal/${d}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];
  for (const p of PATHS) {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[l] = `${SITE.url}/${l}/${p}`;
    languages["x-default"] = `${SITE.url}/en/${p}`;
    // Emit one <url> per locale so every language version is indexed
    // directly, each carrying the full hreflang cluster.
    for (const l of LOCALES) {
      out.push({
        url: `${SITE.url}/${l}/${p}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: p === "" ? (l === "en" ? 1 : 0.9) : 0.6,
        alternates: { languages },
      });
    }
  }
  return out;
}
