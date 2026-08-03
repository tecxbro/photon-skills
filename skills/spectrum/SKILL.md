---
name: spectrum
description: >
  Build new messaging agents with Spectrum, Photon's default unified SDK. Use for spectrum-ts, app.messages, app.send, app.responding, app.webhook, webhooks, Markdown, streaming text, app cards, edits, unsend, read state, typing, rename, avatars, membership, iMessage, WhatsApp Business, Telegram, Slack, Terminal, Voice, local iMessage, telemetry, deliverability, troubleshooting, Chat SDK integration, custom platforms, lifecycle, recovery, and production message pipelines. Keywords: Spectrum, spectrum-ts, unified messaging, multi-platform agent, iMessage, WhatsApp, Telegram, Slack, terminal, SIP voice, webhook, content builders, app card, streaming, definePlatform.
license: MIT
metadata:
  author: photon-hq
  version: '3.0.0'
---

# Spectrum

Spectrum is the default Photon SDK for new agents unless the request requires a low-level platform capability that Spectrum does not expose.

```bash
npm install spectrum-ts
```

```ts
import { Spectrum } from "spectrum-ts";
import { imessage } from "spectrum-ts/providers/imessage";
import { terminal } from "spectrum-ts/providers/terminal";

const app = await Spectrum({
  projectId: process.env.SPECTRUM_PROJECT_ID!,
  projectSecret: process.env.SPECTRUM_PROJECT_SECRET!,
  providers: [imessage.config(), terminal.config()],
});

try {
  for await (const [space, message] of app.messages) {
    if (message.content.type !== "text") continue;
    await space.responding(async () => {
      await message.reply(`You said: ${message.content.text}`);
    });
  }
} finally {
  await app.stop();
}
```

Projectless providers such as Terminal can run without project credentials. Local iMessage is a separate native package: `@spectrum-ts/imessage-local`.

## Topic routing

| Area | Canonical file |
|---|---|
| Setup and application lifecycle | [`getting-started.md`](./getting-started.md) |
| Incoming messages and action types | [`messages.md`](./messages.md) |
| Content index | [`content.md`](./content.md) |
| Spaces and users | [`spaces-and-users.md`](./spaces-and-users.md) |
| Reactions, replies, and edits | [`reactions-and-replies.md`](./reactions-and-replies.md) |
| Platform narrowing | [`platform-narrowing.md`](./platform-narrowing.md) |
| SDK webhooks | [`webhooks.md`](./webhooks.md) |
| Providers | [`providers/imessage.md`](./providers/imessage.md) |
| Custom lifecycle/events | [`custom-events-and-lifecycle.md`](./custom-events-and-lifecycle.md) |
| Custom providers | [`custom-platforms.md`](./custom-platforms.md) |
| Chat SDK | [`integrations/chat-sdk.md`](./integrations/chat-sdk.md) |
| Production patterns | [`best-practices.md`](./best-practices.md) |

Use generic content first. Narrow to a provider only when the feature is genuinely provider-specific.

Official source: <https://photon.codes/docs/spectrum-ts/introduction>
