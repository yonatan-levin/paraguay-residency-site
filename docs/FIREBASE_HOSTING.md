# Firebase team demo

The owner authorized a public demo and public source repository. The dedicated Firebase project is `paraguay-residency-site` (project number `236755616004`); it is separate from the existing `este-a-oeste-web` project. The repository is [yonatan-levin/paraguay-residency-site](https://github.com/yonatan-levin/paraguay-residency-site), with implementation reviewed on `prototype/hebrew`.

The owner authorized Blaze billing, which is enabled for this project. Backend `paraguay-prototype` exists in `us-central1` with runtime `nodejs24`. Firebase returned the allocated origin `https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app`, now configured as `SITE_URL` at build and runtime. An allocated origin does not establish a successful rollout or passing hosted checks; current rollout and verification status belongs in [issue #7](https://github.com/yonatan-levin/paraguay-residency-site/issues/7).

## Hosting contract

Use Firebase App Hosting for the existing Next.js server rendering and proxy behavior. This is not a static Firebase Hosting export. Firebase's Next.js adapter supplies the standalone output and serving command; keep the existing package build/start scripts and do not add an `apphosting.yaml` scripts override.

`firebase.json` selects only `paraguay-prototype`, uploads local source from the repository root and excludes dependencies, Git metadata, build output, artifacts, local environment files, logs, Firebase state and browser test output. Firebase also reads `.gitignore`, whose explicit exception retains the public `.env.example` template; it must never contain credentials. No GitHub deployment connection or automatic rollout is configured. Local Firebase login credentials stay outside the repository; do not publish credentials or raw `firebase login:list --json` output.

`apphosting.yaml` keeps `SITE_MODE=demo` at build and runtime. It sets minimum instances to zero between reviews and maximum instances to two for modest demo traffic. These editable values are **not a spending cap**; builds, storage, serving and network usage can incur charges. `us-central1` was selected for the documented local source storage allowance and a globally cached demo. Review [App Hosting costs](https://firebase.google.com/docs/app-hosting/costs) when changing capacity or usage.

The demo stays public and noindex, with provisional USD prices and local mock integrations. Use test contact details only. No real bookings, messages, payments or leads are delivered. Public hosting does not approve the business launch or any gate in [the launch checklist](LAUNCH_CHECKLIST.md).

## Prepare the project and verified origin

Use Node.js 24 and the Firebase CLI. Run these commands from a PowerShell terminal in the repository; resolving the root avoids depending on a particular user's checkout path:

```powershell
$repoPath = (git rev-parse --show-toplevel).Trim()
Set-Location -LiteralPath $repoPath
firebase --version
firebase projects:list
```

Use the existing Firebase login. If no login is available, authenticate interactively with `firebase login`. Confirm the dedicated project appears before continuing. Do not select or modify the existing `este-a-oeste-web` project.

Blaze billing and backend creation are already complete for the [dedicated Firebase project](https://console.firebase.google.com/project/paraguay-residency-site/overview). Review the billing account and configure budget alerts with the owner; an alert is not a hard spending limit. The creation command below records the selected backend settings; run it only when recreating a missing backend. Use the second command to inspect the existing backend:

```powershell
firebase apphosting:backends:create --backend paraguay-prototype --primary-region us-central1 --runtime nodejs24 --project paraguay-residency-site --non-interactive
firebase apphosting:backends:get paraguay-prototype --project paraguay-residency-site
```

The existing backend's verified HTTPS origin is already set as `SITE_URL` in `apphosting.yaml`, with both `BUILD` and `RUNTIME` availability. If recreating or retargeting the backend, retrieve its actual `uri` and update this value before deploying; do not construct a hostname from project or backend names. A missing value would use the application's local default origin and make canonical and alternate URLs incorrect. Confirm the Firebase console does not contain conflicting overrides for `SITE_MODE` or `SITE_URL`, because console values take precedence over the file.

## Validate and deploy the reviewed source

From the resolved repository root, run:

```powershell
git status --short --branch
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium webkit
npm run test:e2e
```

Review the exact source and configured origin before publishing. `npm run check:launch` is expected to reject a business launch while approvals are missing; do not remove the safeguards to make it pass. To deploy only this demo backend:

```powershell
firebase deploy --only apphosting:paraguay-prototype --project paraguay-residency-site --non-interactive
firebase apphosting:backends:get paraguay-prototype --project paraguay-residency-site
```

This uploads the current local source, not whatever happens to be on the default GitHub branch. Wait for the rollout to succeed in the [project's App Hosting console](https://console.firebase.google.com/project/paraguay-residency-site/apphosting). Record the actual rollout ID, source commit and verified URL in issue #7. Do not claim a successful deployment solely from backend creation or a local build.

## Hosted acceptance checks

- Open all five home pages and a pricing, booking, campaign and policy route in each language. Verify HTTPS and noindex metadata plus the `X-Robots-Tag` response header. Canonical and language alternate URLs must use the verified Firebase origin.
- Check Hebrew direction on first render and after language switching at mobile and desktop sizes. Confirm package, family quote, contact draft and selected appointment instant survive language changes.
- Submit test details through mock success, failure and retry paths. Verify the demo labels remain visible, no external provider sends occur, and personal details do not appear in URLs or browser storage.
- Check a missing route returns 404, `/robots.txt` discourages crawling and `/sitemap.xml` contains no preview pages. Smoke test without JavaScript and test the language menu after hydration.
- Recheck production console/network errors and response times on the hosted build. Local QA does not prove Firebase adapter compatibility, deployed environment settings or regional performance.

## Rollback

In the project's App Hosting console, select `paraguay-prototype`, inspect the actual rollout history and choose **Roll back** for the last known good rollout. Verify its source and environment settings before restoring it, then repeat the hosted smoke checks. Do not invent a revision ID or roll back the owner's other Firebase project. A first deployment has no previous good rollout; if it fails, inspect its build logs, keep it unannounced and redeploy corrected reviewed source. See [Firebase rollout and rollback guidance](https://firebase.google.com/docs/app-hosting/rollouts).

Deployment configuration follows [Firebase's backend configuration guide](https://firebase.google.com/docs/app-hosting/configure) and [local source deployment guide](https://firebase.google.com/docs/app-hosting/alt-deploy).
