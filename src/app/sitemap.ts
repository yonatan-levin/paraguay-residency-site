import type { MetadataRoute } from "next";
import { pages } from "../config/routes";
import { runtime } from "../config/runtime";
import { buildSitemap } from "../lib/seo/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(pages, runtime);
}
