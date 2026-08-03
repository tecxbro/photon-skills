---
name: whatsapp-business
description: >
  Use the current low-level Photon WhatsApp Business SDK when Spectrum does not expose the needed direct Meta behavior. Use for @photon-ai/whatsapp-business, createClient, accessToken, phoneNumberId, appSecret, direct messages, media, location, contacts, reactions, replies, read state, interactive buttons, lists, products, WhatsApp Flows, templates, 24-hour window, events, resumable cursors, and typed errors. Keywords: WhatsApp Business SDK, Meta Cloud API, template, Flow, interactive message, media, webhook.
license: MIT
metadata:
  author: photon-hq
  version: '1.0.0'
---

# Low-level WhatsApp Business

Most applications should use Spectrum. Use this skill when the user specifically needs low-level WhatsApp Business behavior that Spectrum does not expose.

```bash
npm install @photon-ai/whatsapp-business
```

```ts
import { createClient } from "@photon-ai/whatsapp-business";

const client = createClient({
  accessToken: process.env.WA_ACCESS_TOKEN!,
  phoneNumberId: process.env.WA_PHONE_NUMBER_ID!,
  appSecret: process.env.WA_APP_SECRET!,
});

try {
  await client.messages.send({
    to: "+15551234567",
    text: "Hello from the SDK!",
  });

  for await (const event of client.events.subscribe()) {
    if (event.type === "message") console.log(event.message);
  }
} finally {
  await client.close();
}
```

The client exposes `messages`, `events`, and `media`. It supports `Symbol.asyncDispose`, so `await using` is also valid on supported runtimes.

## Topic routing

- [`getting-started.md`](./getting-started.md)
- [`messages.md`](./messages.md)
- [`interactive-messages.md`](./interactive-messages.md)
- [`templates.md`](./templates.md)
- [`events.md`](./events.md)
- [`media.md`](./media.md)
- [`error-handling.md`](./error-handling.md)

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/getting-started>
