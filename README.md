# Photon Agent Skills

[![skills.sh](https://img.shields.io/badge/skills.sh-photon--hq%2Fskills-blue)](https://skills.sh/photon-hq/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/photon-hq/skills)](https://github.com/photon-hq/skills)

Agent skills for the current [Photon](https://photon.codes/docs) product surface, following the [Agent Skills](https://skills.sh/) format.

```bash
npx skills add photon-hq/skills --skill <skill-name>
```

## Photon product skills

| Skill | Primary package or surface | Use it for |
|---|---|---|
| [`spectrum`](./skills/spectrum/SKILL.md) | `spectrum-ts` | The default for new agents across iMessage, WhatsApp Business, Telegram, Terminal, Voice, custom providers, and supported supplemental providers. |
| [`imessage`](./skills/imessage/SKILL.md) | `@photon-ai/advanced-imessage`, `@photon-ai/imessage-kit` | Choosing an iMessage stack and using current low-level or local iMessage APIs. |
| [`whatsapp-business`](./skills/whatsapp-business/SKILL.md) | `@photon-ai/whatsapp-business` | Low-level WhatsApp Business behavior that Spectrum does not expose. |
| [`chat-adapter-imessage`](./skills/chat-adapter-imessage/SKILL.md) | `chat-adapter-imessage` | Connecting a Chat SDK bot to iMessage through Spectrum Cloud, self-hosted Advanced iMessage, or local macOS. |
| [`photon-webhooks`](./skills/photon-webhooks/SKILL.md) | Spectrum Webhooks | Signed inbound HTTP delivery, verification, retries, and registration. |
| [`photon-api`](./skills/photon-api/SKILL.md) | Spectrum API, Dashboard API, OAuth | HTTPS management-plane automation, OAuth user authorization, curl, OpenAPI, and non-TypeScript integrations. |
| [`photon-cli`](./skills/photon-cli/SKILL.md) | `@photon-ai/cli` | Interactive and scripted project, profile, Spectrum-resource, billing, and authentication workflows. |
| [`heif2jpeg`](./skills/heif2jpeg/SKILL.md) | `heif2jpeg` | Converting HEIC/HEIF attachments to JPEG in Node.js-compatible runtimes. |

## Photon engineering infrastructure

| Skill | Use it for |
|---|---|
| [`buildspace-ci-cd`](./skills/buildspace-ci-cd/SKILL.md) | BuildSpace reusable GitHub Actions workflows and release automation. |

## Product routing

| Need | Canonical starting point |
|---|---|
| New agent on one or more messaging platforms | Spectrum |
| Direct low-level iMessage feature | Current Advanced iMessage |
| Local automation on one Mac | Open-source iMessage Kit |
| Direct low-level WhatsApp Business feature | Current WhatsApp Business SDK |
| Receive inbound project events over HTTP | Spectrum Webhooks |
| Manage resources or authorize a third-party app over HTTPS | Photon API |
| Manage resources from a terminal | Photon CLI |
| Connect an eve agent to iMessage | Spectrum's eve integration guide |

Spectrum is the default for new agent-oriented applications. Drop down to a low-level platform SDK only when the requested platform behavior is not exposed by Spectrum.

## Example prompts

- Build an iMessage and Telegram agent with one Spectrum message loop.
- Add a Terminal test provider to my Spectrum app.
- Place an outbound call through a Spectrum iMessage line.
- Diagnose one-way audio on a Spectrum voice call.
- Connect an eve agent to iMessage through Photon.
- Verify Spectrum webhook signatures in a Next.js route.
- Use current Advanced iMessage to change a group icon.
- Send a WhatsApp Flow with the low-level WhatsApp Business SDK.
- Build an OAuth integration that lists a user's Photon projects.
- Convert an inbound HEIC iMessage attachment to JPEG.
- Authenticate the Photon CLI in CI and inspect a project without rotating credentials.
- Configure BuildSpace release automation for a TypeScript monorepo.

## Documentation freshness

The canonical coverage map is [`docs/photon-docs-coverage.json`](./docs/photon-docs-coverage.json). It currently assigns all **98** pages in Photon's live documentation index to an owning skill file and tracks **13** Spectrum/Dashboard OpenAPI ownership categories. Supplemental package guidance, including Slack, is retained without being represented as a current live documentation page.

The scheduled drift check fails when a live Photon documentation page has no owner, an owner file is missing, a removed page remains marked current, a skill is structurally invalid, or known stale API strings return.

## License

MIT
