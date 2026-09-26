import { runtime, validateLiveConfiguration } from "../src/config/runtime.ts";

const errors = validateLiveConfiguration(runtime);
if (errors.length) {
  console.error("Public launch is blocked. This application is a local demo.");
  for (const error of errors) console.error(`- ${error}`);
  console.error(
    "Live gateways, server validation, retention controls and explicit deployment approval are also required.",
  );
  process.exitCode = 1;
} else {
  console.log(
    "Configuration policy checks passed. Explicit owner deployment approval remains required.",
  );
}
