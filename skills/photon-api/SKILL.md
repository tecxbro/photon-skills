---
name: photon-api
description: >
  Use the current Photon HTTP APIs and OpenAPI documents for OAuth 2.1 user authorization, project management, users, billing, Fusor, iMessage configuration, lines, platforms, Voice, webhooks, WhatsApp Business, and Slack. Use for Photon REST API, Spectrum API, Dashboard API, OAuth, OpenID Connect, PKCE, HTTPS, OpenAPI, curl, non-TypeScript integrations, CI automation, webhook management, line management, and generated clients. Do not use this skill as a substitute for the runtime Spectrum SDK. Keywords: Photon API, Spectrum API, Dashboard API, OAuth, OIDC, PKCE, REST, HTTPS, OpenAPI, curl, Basic auth, Bearer token, project API, user API, billing API, line API, webhook API, Voice API, Slack API.
license: MIT
metadata:
  author: photon-hq
  version: '1.1.0'
---

# Photon HTTP APIs

Choose the surface before constructing a request.

| Surface | Purpose |
|---|---|
| Spectrum SDK | Runtime agent and messaging logic |
| Photon CLI | Interactive or scripted terminal management |
| Photon OAuth | User consent and scoped access to the Dashboard API |
| Spectrum API | Project-credential HTTPS management operations |
| Dashboard API | Dashboard and account-level operations |
| Spectrum Webhooks | Inbound HTTP event delivery |
| Low-level platform SDK | Direct platform messaging features |

OAuth bearer tokens for `app.photon.codes` and Spectrum project credentials for `spectrum.photon.codes` are separate and not interchangeable. The Spectrum API is not a general public send-message endpoint; use an SDK for runtime messaging.

## Quick Spectrum API request

```bash
curl --fail-with-body \
  --user "$PHOTON_PROJECT_ID:$PHOTON_PROJECT_SECRET" \
  "https://spectrum.photon.codes/projects/$PHOTON_PROJECT_ID/webhooks/"
```

Never expose project credentials, OAuth client secrets, access tokens, refresh tokens, or webhook signing secrets in browser code, logs, shell history, or committed files. The default Spectrum API limit is 5 requests per second per project; handle `429` responses.

## Topic routing

- [`overview.md`](./overview.md)
- [`oauth.md`](./oauth.md)
- [`dashboard-api.md`](./dashboard-api.md)
- [`spectrum-api/authentication-and-errors.md`](./spectrum-api/authentication-and-errors.md)
- [`spectrum-api/users.md`](./spectrum-api/users.md)
- [`spectrum-api/projects.md`](./spectrum-api/projects.md)
- [`spectrum-api/billing.md`](./spectrum-api/billing.md)
- [`spectrum-api/fusor.md`](./spectrum-api/fusor.md)
- [`spectrum-api/imessage.md`](./spectrum-api/imessage.md)
- [`spectrum-api/lines.md`](./spectrum-api/lines.md)
- [`spectrum-api/platforms.md`](./spectrum-api/platforms.md)
- [`spectrum-api/voice.md`](./spectrum-api/voice.md)
- [`spectrum-api/webhooks.md`](./spectrum-api/webhooks.md)
- [`spectrum-api/whatsapp-business.md`](./spectrum-api/whatsapp-business.md)
- [`spectrum-api/slack.md`](./spectrum-api/slack.md)

Official sources: <https://photon.codes/docs/api-reference/introduction>, <https://photon.codes/docs/api-reference/oauth>, and the current OpenAPI documents.
