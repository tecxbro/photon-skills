---
name: chat-adapter-imessage
description: >
  Connect Chat SDK bots to iMessage with the current Spectrum-backed @photon-ai/chat-adapter-imessage package. Use for createiMessageAdapter, new Chat with adapters, Spectrum Cloud, self-hosted current Advanced iMessage, signed Chat SDK webhooks, gateway listeners, native polls from modals, tapbacks, effects, attachments, edits, unsend, read state, voice messages, mini-app cards, chat backgrounds, deployment, and troubleshooting. Also use when checking whether streaming, history, thread metadata, or a provider-specific action is supported. Keywords: Chat SDK, iMessage adapter, webhook, gateway listener, poll, tapback, effect, projectId, projectSecret, app card, mini app card.
license: MIT
metadata:
  author: photon-hq
  version: '2.1.0'
---

# Chat SDK iMessage adapter

Use `@photon-ai/chat-adapter-imessage` when an application is already structured around Chat SDK. The current adapter is backed by Spectrum and supports two connection modes:

1. **Spectrum Cloud** — recommended; runs anywhere, including serverless.
2. **Self-hosted** — connects to a current `@photon-ai/advanced-imessage` gRPC endpoint.

Local on-device mode has been removed from this adapter. For local macOS automation, use Spectrum's separate `@spectrum-ts/imessage-local` provider or `@photon-ai/imessage-kit` directly.

```bash
pnpm add chat @photon-ai/chat-adapter-imessage
```

```ts
import { Chat } from "chat";
import { createiMessageAdapter } from "@photon-ai/chat-adapter-imessage";

const bot = new Chat({
  userName: "mybot",
  adapters: {
    imessage: createiMessageAdapter({
      projectId: process.env.IMESSAGE_PROJECT_ID,
      projectSecret: process.env.IMESSAGE_PROJECT_SECRET,
    }),
  },
});
```

Do not use the obsolete single-adapter constructor, the unscoped `chat-adapter-imessage` package, or `local: true`. Do not describe webhooks as unsupported.

## Receiving modes

| Environment | Preferred mode |
|---|---|
| Serverless route | Signed webhook through `bot.webhooks.imessage` |
| Long-running worker | `bot.adapters.imessage.startGatewayListener(...)` |
| Local development against Spectrum Cloud | Cloud webhook or gateway listener |
| Existing Chat SDK bot | The bot's registered iMessage adapter webhook |

## Topic routing

- [`configuration.md`](./configuration.md)
- [`receiving-messages.md`](./receiving-messages.md)
- [`features-and-limitations.md`](./features-and-limitations.md)
- [`deployment-and-troubleshooting.md`](./deployment-and-troubleshooting.md)

Official source: <https://photon.codes/docs/integrations/chat-sdk>
