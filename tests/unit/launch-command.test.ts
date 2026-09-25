import { expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

it("the native Node launch check reports pending approvals instead of failing to load locale configuration", () => {
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(new URL("../../scripts/check-launch.mjs", import.meta.url))],
    { encoding: "utf8" },
  );
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("Public launch is blocked.");
  expect(result.stderr).toContain(
    "Approve complete translations for published locales.",
  );
  expect(result.stderr).not.toContain("ERR_MODULE_NOT_FOUND");
});
