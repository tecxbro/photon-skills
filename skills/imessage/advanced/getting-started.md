# Advanced iMessage getting started

Most applications should start with Spectrum. Use `@photon-ai/advanced-imessage` when a low-level iMessage capability is required.

## Requirements

- Node.js `>=18.17` or Bun.
- A server address in `host:port` form. Do not include `https://`.
- A bearer token stored outside source control.
- An E.164 phone number or email address that can receive iMessage.

```bash
npm install @photon-ai/advanced-imessage
export IMESSAGE_ADDRESS="imessage.example.com:443"
export IMESSAGE_TOKEN="your-token"
```

```ts
import { createClient } from "@photon-ai/advanced-imessage";

const im = createClient({
  address: process.env.IMESSAGE_ADDRESS!,
  token: process.env.IMESSAGE_TOKEN!,
});

try {
  const { chat } = await im.chats.create(["+15551234567"]);
  const sent = await im.messages.sendText(chat.guid, "Hello from the SDK");
  console.log(sent.guid);
} finally {
  await im.close();
}
```

The client exposes `messages`, `chats`, `groups`, `attachments`, `polls`, `addresses`, `locations`, and `events`. Unary requests can use documented timeout and retry options; event streams are not automatically replayed, so use cursors and the events API for missed-event recovery.

Official source: <https://photon.codes/docs/advanced-kits/imessage/getting-started>
