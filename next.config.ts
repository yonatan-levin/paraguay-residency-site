import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

// Public launch is a separate deliverable. No environment toggle can publish this mock.
if (process.env.SITE_MODE && process.env.SITE_MODE !== "demo") {
  throw new Error(
    "Live mode is unavailable: approve brand, commercial scope, legal content, privacy, and real provider implementation before launch. Run npm run check:launch.",
  );
}

const config: NextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  trailingSlash: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, follow" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
