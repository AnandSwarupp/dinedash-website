import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dinedash.app";
  // Bump a page's date only when its content actually changes —
  // a fixed date lets crawlers trust the freshness signal instead of
  // seeing every page "updated" on every build.
  const lastModified = new Date("2026-06-16");
  return [
    { url: `${base}`,                  lastModified, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/for-restaurants`,  lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/for-customers`,    lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/how-it-works`,     lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/pricing`,          lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/get-started`,      lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/about`,            lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/contact`,          lastModified, priority: 0.6, changeFrequency: "yearly" },
    { url: `${base}/blog`,             lastModified, priority: 0.6, changeFrequency: "weekly" },
    { url: `${base}/privacy`,          lastModified, priority: 0.3, changeFrequency: "yearly" },
    { url: `${base}/terms`,            lastModified, priority: 0.3, changeFrequency: "yearly" },
    { url: `${base}/cookies`,          lastModified, priority: 0.3, changeFrequency: "yearly" },
  ];
}
