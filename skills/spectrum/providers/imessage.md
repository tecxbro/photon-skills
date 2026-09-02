# Spectrum iMessage provider

Cloud and local iMessage are separate providers selected by import, not by a `local` config flag.

## Cloud package

```ts
import { Spectrum } from "spectrum-ts";
import { imessage } from "spectrum-ts/providers/imessage";

const app = await Spectrum({
  providers: [imessage.config()],
});
```

With project credentials, Spectrum discovers all project cloud lines and renews tokens at roughly 80% of TTL. Most apps should use automatic discovery.

Explicit client routing is available when you intentionally want only a subset of cloud lines:

```ts
imessage.config({
  clients: [{
    address: "line-1.example.com:443",
    token: process.env.IMESSAGE_TOKEN!,
    phone: "+15551111111",
  }],
});
```

Explicit client tokens are not renewed automatically.

## Local package

```ts
import { Spectrum } from "spectrum-ts";
import { localIMessage } from "@spectrum-ts/imessage-local";

const app = await Spectrum({ providers: [localIMessage.config()] });
```

Local messages use `platform === "local_imessage"`. Local supports receive/send text, attachments, and contacts. App cards fall back to URLs. It does not support reactions, threaded replies, edits, unsend, read receipts, effects, group creation, streaming, backgrounds, rename, avatar, native contact-card sharing, or membership writes. Typing is accepted as a no-op.

## Shared and dedicated lines

| Plan | Routing | Group behavior |
|---|---|---|
| Free / Pro | Shared pool; recipients may receive from different numbers | No group creation or inbound group-change events |
| Business | Dedicated project line | Group creation and inbound group-change events supported |

On shared-pool plans, recipients must be registered as project users before proactive outreach. A successful `space.create()` only resolves a transport object; it does not prove a later send is allowed or that the recipient consented.

New or removed lines become visible on the next token renewal. Restart when a newly provisioned line must take effect immediately.

With multiple dedicated lines:

```ts
const im = imessage(app);
const dm = await im.space.create(alice, { phone: "+15559999999" });
const existing = await im.space.get(chatGuid, { phone: "+15559999999" });
```

Without a phone, `space.create()` chooses a dedicated line at random. `space.get()` requires `phone` when more than one dedicated line can own the chat.

## Quotas and consent

Default cloud quotas are 5,000 messages per server per day and 50 newly initiated conversations per line per day. Replies in existing conversations do not count as new conversations. Contact Photon before designing around a higher limit.

Do not treat transport access as permission for cold outreach. Initiate only after the recipient has opted in, honor stop requests, and design for genuine conversation rather than one-way blasts.

## Capability check

Optional actions follow Spectrum's documented native/fallback/skip/no-op/throw behavior. Read [`../capability-semantics.md`](../capability-semantics.md) and the exact feature reference before relying on reactions, replies, edits, backgrounds, group operations, or another provider-specific action.

## Feature references

- [`imessage/message-effects.md`](./imessage/message-effects.md)
- [`imessage/chat-renaming.md`](./imessage/chat-renaming.md)
- [`imessage/group-avatars.md`](./imessage/group-avatars.md)
- [`imessage/group-membership.md`](./imessage/group-membership.md)
- [`imessage/inbound-group-events.md`](./imessage/inbound-group-events.md)
- [`imessage/inbound-read-receipts.md`](./imessage/inbound-read-receipts.md)
- [`imessage/chat-backgrounds.md`](./imessage/chat-backgrounds.md)
- [`imessage/apps.md`](./imessage/apps.md)
- [`imessage/contact-card-sharing.md`](./imessage/contact-card-sharing.md)
- [`imessage/message-metadata.md`](./imessage/message-metadata.md)
- [`imessage/fetching-attachments.md`](./imessage/fetching-attachments.md)
- [`imessage/tapback-reactions.md`](./imessage/tapback-reactions.md)
- [`imessage/troubleshooting.md`](./imessage/troubleshooting.md)

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/connection-and-routing>
