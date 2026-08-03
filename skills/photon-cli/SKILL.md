---
name: photon-cli
description: >
  Use the current Photon CLI for self-serve project and Spectrum administration. Use for install, npx, pnpx, yarn dlx, bunx, standalone binary, login, device authorization, no-browser auth, CI tokens, multiple backends, projects create with name/location/spectrum, project inspection, deliberate secret rotation, billing, profiles, users, lines, platforms, avatars, JSON output, and troubleshooting. Keywords: photon CLI, pho, @photon-ai/cli, projects, spectrum resources, billing, auth, PHOTON_TOKEN, CI.
license: MIT
metadata:
  author: photon-hq
  version: '2.0.0'
---


# Photon CLI

Use the CLI for interactive or scripted management. Use the Spectrum SDK for runtime agent logic and the Spectrum API for direct HTTPS automation.

## Safe bootstrap

```bash
npx @photon-ai/cli whoami --json || npx @photon-ai/cli login --no-browser

npx @photon-ai/cli projects create \
  --name "My App" \
  --location "United States" \
  --spectrum \
  --json

npx @photon-ai/cli projects show --json
```

Project creation and read-only inspection are safe. Confirm before any purchase, subscription change, project deletion, dedicated-line removal, or credential rotation.

> `projects regenerate-secret` rotates the Spectrum project secret and can immediately break existing integrations. Do not run it merely to inspect a credential.

## Topic routing

- [`getting-started.md`](./getting-started.md)
- [`commands.md`](./commands.md)
- [`spectrum.md`](./spectrum.md)
- [`workflows.md`](./workflows.md)
- [`environment.md`](./environment.md)

Official source: <https://photon.codes/docs/cli/overview>
