# Advanced iMessage getting started

Most new agent applications should start with Spectrum. Use `@photon-ai/advanced-imessage` directly only when the requested iMessage capability is not exposed by Spectrum.

## Requirements

- Node.js `>=18.17` or Bun.
- A Photon server address in `host:port` format. Do not include `https://`.
- A bearer token stored in a secret manager or environment variable.
- A full email address or E.164 phone number for the recipient.

```bash
npm install @photon-ai/advanced-imessage
export IMESSAGE_ADDRESS="imessage.example.com:443"
export IMESSAGE_TOKEN="your-token"
```

## First message

```ts
import { createClient } from "@photon-ai/advanced-imessage";

const im = createClient({
  address: process.env.IMESSAGE_ADDRESS!,
  token: process.env.IMESSAGE_TOKEN!,
});

try {
  const { chat } = await im.chats.create(["+15551234567"]);
  const message = await im.messages.sendText(chat.guid, "Hello from Photon");
  console.log(message.guid);
} finally {
  await im.close();
}
```

Message, chat, group, attachment, poll, and location APIs use server identifiers returned by the SDK. Do not pass a raw phone number where a `chat.guid` or message GUID is required.

## Client options

| Option | Type | Required | Meaning |
|---|---|---:|---|
| `address` | `string` | Yes | gRPC server address in `host:port` form. |
| `token` | `string` | Yes | Bearer token. Never log it. |
| `tls` | `boolean` | No | Defaults to `true`; keep enabled for hosted servers. |
| `timeout` | `number` | No | Default timeout in milliseconds for unary calls. Streams remain open. |
| `retry` | `boolean | RetryOptions` | No | Retries retryable unary failures. Streams are not retried automatically. |

## Resource map

| Namespace | Responsibility |
|---|---|
| `im.messages` | Sends, replies, reactions, stickers, edits, unsends, queries, and message events. |
| `im.chats` | Chat creation, state, read state, typing, contact cards, backgrounds, and chat events. |
| `im.groups` | Group names, participants, icons, leaving, and group events. |
| `im.attachments` | Uploads, metadata, and streamed downloads. |
| `im.polls` | Poll creation, state, votes, options, and poll events. |
| `im.addresses` | Availability, address metadata, and Focus state. |
| `im.locations` | Location requests, snapshots, and live Find My updates. |
| `im.events` | Durable catch-up after disconnects. |

Official source: <https://photon.codes/docs/advanced-kits/imessage/getting-started>
