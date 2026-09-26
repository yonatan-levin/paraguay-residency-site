import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { relative, resolve } from "node:path";

// No Git repository existed at intake. This reproducible source fingerprint
// binds verification to application, test, configuration and asset bytes.
const root = fileURLToPath(new URL("..", import.meta.url));
const directories = ["src", "tests", "public", "scripts", ".github"];
const rootFiles = [
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next.config.ts",
  "eslint.config.mjs",
  "vitest.config.ts",
  "playwright.config.ts",
  ".env.example",
];
const paths = [...rootFiles];
for (const directory of directories) {
  const base = resolve(root, directory);
  for (const entry of await readdir(base, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (entry.isFile())
      paths.push(
        relative(root, resolve(entry.parentPath, entry.name)).replaceAll(
          "\\",
          "/",
        ),
      );
  }
}
paths.sort();
const files = [];
for (const path of paths)
  files.push({
    path,
    sha256: createHash("sha256")
      .update(await readFile(resolve(root, path)))
      .digest("hex"),
  });
const sourceSha256 = createHash("sha256")
  .update(JSON.stringify(files))
  .digest("hex");
await mkdir(resolve(root, "artifacts"), { recursive: true });
await writeFile(
  resolve(root, "artifacts", "source-manifest.json"),
  JSON.stringify({ sourceSha256, files }, null, 2),
);
console.log(`Source SHA256: ${sourceSha256} (${files.length} files)`);
