# Deployment

Paraguay Next is configured for a public team demo on Firebase App Hosting. It requires the Next.js server and proxy behavior; it is not a static export.

## Environments

| Environment | Configuration |
| --- | --- |
| Local development | `npm run dev`, loopback host, `.env.local` |
| Local production rendering | `npm run build` followed by `npm run start` |
| Firebase demo | App Hosting target and environment in repository configuration |
| Business launch | Unavailable in this implementation; non-demo `SITE_MODE` is rejected |

All environments preserve provisional commercial content, local mock integrations and noindex. Public access does not establish professional review, business approval or restricted access. Noindex is a crawler instruction.

## Infrastructure configuration

`.firebaserc` selects the dedicated Firebase project. `firebase.json` selects the App Hosting backend, local source root and upload exclusions. `apphosting.yaml` supplies demo mode, the metadata origin and instance scaling. Firebase's Next.js adapter provides build and serving behavior; the package scripts remain the application entrypoints.

The configured `SITE_URL` must match the actual backend origin so canonical and alternate URLs point at the hosted site. Firebase console overrides can take precedence over file settings.

The [Firebase hosting guide](FIREBASE_HOSTING.md) owns project/backend identifiers, provider setup, deployment commands, hosted acceptance and rollback. It also describes local-source upload behavior: a deployed source revision can differ from the GitHub default branch. Historical deployment evidence does not identify the currently running revision.

## Operational boundaries

The configured demo can incur build, storage, serving and network charges. Scale-to-zero settings and maximum instances are not a spending cap.

Local environment files, credentials, generated build output and browser test artifacts are excluded by deployment configuration. The public example environment must remain credential-free.

The [launch checklist](LAUNCH_CHECKLIST.md) describes the business requirements beyond a hosted demo. Source-level origin, content, commercial, claim and locale approvals are separate from deployment availability. Provider delivery, secure storage, retention and server-side abuse controls are absent from the current prototype.
