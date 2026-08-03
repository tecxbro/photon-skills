---
name: chat-adapter-imessage
description: >
  Connect Chat SDK or Vercel Chat SDK bots to iMessage with the current Spectrum-backed adapter. Use for createiMessageAdapter, new Chat with adapters, Spectrum Cloud, self-hosted current Advanced iMessage, local macOS, signed Chat SDK webhooks, gateway listeners, native polls from modals, tapbacks, effects, attachments, edits, deployment, and troubleshooting. Also use when checking whether cards, streaming, history, or cold group sends are supported. Keywords: Chat SDK, Vercel Chat SDK, iMessage adapter, webhook, gateway listener, poll, tapback, effect, projectId, projectSecret, app card, mini app card.
license: MIT
metadata:
  author: photon-hq
  version: '2.0.0'
---

# Chat SDK iMessage adapter

The current `chat-adapter-imessage` integration is backed by Spectrum and supports three modes:

1. **Spectrum Cloud** — recommended; runs anywhere, including serverless.
2. **Self-hosted** — connects to a current `@photon-ai/advanced-imessage` gRPC endpoint.
3. **Local** — runs on macOS with local Messages access.

```bash
pnpm add chat chat-adapter-imessage
```

```ts
import { Chat } from "chat";
import { createiMessageAdapter } from "chat-adapter-imessage";

const bot = new Chat({
  userName: "mybot",
  adapters: {
    imessage: createiMessageAdapter({
      local: false,
      projectId: process.env.IMESSAGE_PROJECT_ID,
      projectSecret: process.env.IMESSAGE_PROJECT_SECRET,
    }),
  },
});
```

## Receiving modes

| Environment | Preferred mode |
|---|---|
| Serverless route | Signed webhook through `bot.webhooks.imessage` |
| Long-running worker | `bot.adapters.imessage.startGatewayListener(...)` |
| Local development | Local listener or a tunnelled cloud webhook |
| Existing Chat SDK bot | The bot's registered iMessage webhook |

Do not use the obsolete single-adapter constructor. Do not describe webhooks as unsupported.

## Topic routing

- [`configuration.md`](./configuration.md)
- [`receiving-messages.md`](./receiving-messages.md)
- [`features-and-limitations.md`](./features-and-limitations.md)
- [`deployment-and-troubleshooting.md`](./deployment-and-troubleshooting.md)

Official source: <https://photon.codes/docs/integrations/chat-sdk>
