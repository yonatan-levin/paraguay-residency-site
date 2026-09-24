import type { MetadataRoute } from "next";
import { runtime } from "../config/runtime";
export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read the noindex metadata; preview access control is separate.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", runtime.siteUrl).toString(),
  };
}
