# Photon documentation coverage

Verified on **2026-08-03**. The canonical page-by-page and OpenAPI-tag ownership map is [`photon-docs-coverage.json`](./photon-docs-coverage.json). This report summarizes the routing model; the JSON file contains every current page path and every tracked API tag.

## Spectrum

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| Core SDK | `/docs/spectrum-ts/introduction`, `getting-started`, `messages`, `spaces-and-users`, `reactions-and-replies`, `platform-narrowing` | `spectrum` | `skills/spectrum/` core files | Covered | Spectrum is the default new-agent abstraction. |
| Content and actions | `/docs/spectrum-ts/content/**` | `spectrum` | `skills/spectrum/content/` | Covered | Text, Markdown, attachments, voice, contacts, rich links, app cards, polls, groups, custom content, replies, edits, unsend, read, typing, rename, avatars, membership, and composition are split by topic. |
| iMessage provider | `/docs/spectrum-ts/providers/imessage/**` | `spectrum` | `skills/spectrum/providers/imessage.md` and `skills/spectrum/providers/imessage/` | Covered | Cloud/local routing and each documented iMessage feature have explicit owners. |
| Other providers | Telegram, Slack, Terminal, WhatsApp Business, Voice pages | `spectrum` | `skills/spectrum/providers/` | Covered | Voice remains a Spectrum provider rather than a separate skill. |
| Webhooks | `/docs/spectrum-ts/webhooks` | `spectrum` | `skills/spectrum/webhooks.md` | Covered | Owns the SDK request adapter; registration and delivery semantics route to `photon-webhooks`. |
| Customization and lifecycle | custom platforms, custom events, lifecycle | `spectrum` | `skills/spectrum/custom-platforms.md`, `custom-events-and-lifecycle.md` | Covered | Current provider-contract and recovery guidance. |
| Best practices | `/docs/best-practices/**` | `spectrum` | `skills/spectrum/best-practices/` | Covered | Architecture, inbound pipeline, recovery/state, and iMessage deliverability. |

## CLI

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| Installation | `/docs/cli/installation` | `photon-cli` | `skills/photon-cli/getting-started.md` | Covered | Includes one-shot runners, global/standalone guidance, and `pho` caveat. |
| Authentication | `/docs/cli/authentication` | `photon-cli` | `skills/photon-cli/environment.md` | Covered | Device auth, no-browser, CI, storage, backend, and precedence. |
| Projects and billing | `/docs/cli/projects`, `/docs/cli/billing` | `photon-cli` | `skills/photon-cli/commands.md`, `workflows.md` | Covered | Current project creation and explicit warnings for rotation, deletion, and paid actions. |
| Spectrum resources | `/docs/cli/spectrum` | `photon-cli` | `skills/photon-cli/spectrum.md` | Covered | Profiles, users, lines, platforms, and avatars. |
| Profile and utilities | `/docs/cli/profile-and-utilities` | `photon-cli` | `skills/photon-cli/commands.md` | Covered | Current fields and read-only verification patterns. |

## Webhooks

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| Overview and quickstart | `/docs/webhooks/overview`, `quickstart` | `photon-webhooks` | `skills/photon-webhooks/SKILL.md`, `quickstart.md` | Covered | Public HTTPS, one-time secret capture, fast acknowledgement, and queues. |
| Events | `/docs/webhooks/events` | `photon-webhooks` | `skills/photon-webhooks/events.md` | Covered | Serialized event envelope, headers, IDs, and forward compatibility. |
| Signature verification | `/docs/webhooks/verifying-signatures` | `photon-webhooks` | `skills/photon-webhooks/verifying-signatures.md` | Covered | Raw bytes, freshness, constant-time comparison, verify-before-parse. |
| Delivery and retries | `/docs/webhooks/delivery` | `photon-webhooks` | `skills/photon-webhooks/delivery-and-retries.md` | Covered | At-least-once delivery, deduplication, idempotency, and poison events. |
| Management and troubleshooting | managing and troubleshooting pages | `photon-webhooks` | `skills/photon-webhooks/managing.md`, `troubleshooting.md` | Covered | Registration, list/delete, lost-secret recovery, reachability, and body mutation. |

## Low-level SDKs

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| Current Advanced iMessage | `/docs/advanced-kits/imessage/**` | `imessage` | `skills/imessage/advanced/` | Covered | Uses `@photon-ai/advanced-imessage` and isolates direct platform features by topic. |
| Local open-source iMessage | `/docs/opensource/imessage-kit` | `imessage` | `skills/imessage/opensource-imessage-kit.md` | Covered | macOS, Full Disk Access, local send/query/watch, and cleanup. |
| Legacy iMessage | `/docs/legacy/imessage` | `imessage` | `skills/imessage/legacy-advanced-imessage-kit.md` | Covered | Legacy package is maintenance-only and never the default path. |
| Chat SDK adapter | `/docs/integrations/chat-sdk` | `chat-adapter-imessage` | `skills/chat-adapter-imessage/` | Covered | Current constructor, cloud/self-hosted/local modes, webhooks, listener, features, and limitations. |
| WhatsApp Business SDK | `/docs/advanced-kits/whatsapp/**` | `whatsapp-business` | `skills/whatsapp-business/` | Covered | Messages, interactions, templates, events, media, and typed errors. |

## Utilities

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| HEIF conversion | `/docs/utilities/heif2jpeg` | `heif2jpeg` | `skills/heif2jpeg/SKILL.md` | Covered | Package API, quality, runtimes/platforms, thread pool, source build, and iMessage attachment example. |

## Dashboard API

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| Overview and rate limits | API introduction and rate-limit pages | `photon-api` | `skills/photon-api/overview.md` | Covered | Separates management-plane HTTP from runtime messaging. |
| Dashboard OpenAPI | `/docs/api-reference/dashboard-openapi.json`, `openapi:dashboard` | `photon-api` | `skills/photon-api/dashboard-api.md` | Covered | OpenAPI is the source of truth; endpoints are not inferred from CLI commands. |

## Spectrum API

| Documentation area | Current page or tag | Owning skill | Owning file | Status | Notes |
|---|---|---|---|---|---|
| Authentication and errors | `openapi:spectrum:authentication-and-errors` | `photon-api` | `skills/photon-api/spectrum-api/authentication-and-errors.md` | Covered | Basic auth, envelopes, rate limits, retries, redaction, and rotation. |
| Users, projects, billing, Fusor | matching current OpenAPI tags | `photon-api` | `skills/photon-api/spectrum-api/` category files | Covered | Destructive and paid actions require confirmation. |
| iMessage, lines, platforms, Voice | matching current OpenAPI tags | `photon-api` | category files | Covered | Runtime messaging remains an SDK responsibility; line removal/addition warnings are explicit. |
| Webhooks | `openapi:spectrum:webhooks` | `photon-api` | `skills/photon-api/spectrum-api/webhooks.md` | Covered | Registration/list/delete and one-time secret boundaries. |
| WhatsApp Business and Slack | matching current OpenAPI tags | `photon-api` | category files | Covered | Provider credentials are protected; plaintext Slack token responses are prominently warned. |

## Coverage result

- Current Photon documentation pages represented in the canonical map: **97**.
- OpenAPI category/tag ownership entries: **13**.
- Missing owner files at verification time: **0**.
- Unapproved duplicate canonical owners: **0**.
- Stale current-page mappings at verification time: **0**.
