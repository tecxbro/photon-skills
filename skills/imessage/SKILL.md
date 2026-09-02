---
name: imessage
description: >
  Choose and use the correct Photon iMessage interface. Use for current Advanced iMessage, raw iMessage features, group icons, polls, attachments, events, address checks, Find My locations, local macOS automation, open-source imessage-kit, or maintaining the legacy Advanced iMessage package. Default new agent applications to Spectrum. Keywords: iMessage, Advanced iMessage, createClient, address, token, group chat, group icon, poll, attachment, message metadata, Find My, local macOS, imessage-kit, legacy migration.
license: MIT
metadata:
  author: photon-hq
  version: '9.1.0'
---

# iMessage

Use this skill to choose the correct Photon iMessage interface and then load only the relevant topic file.

> **Do not install the legacy Advanced iMessage Kit package for a new implementation.**

## Choose the interface first

| Interface | Use it when | Current package or surface |
|---|---|---|
| Spectrum | Default for new agents, multi-platform apps, unified content, webhooks, and provider switching | `spectrum-ts` |
| Current Advanced iMessage | Direct iMessage control not exposed by Spectrum | `@photon-ai/advanced-imessage` |
| Open-source iMessage Kit | Local macOS-only automation and self-hosted access | `@photon-ai/imessage-kit` |
| Legacy Advanced iMessage Kit | Maintenance of an existing project that already imports it | Legacy only; see the isolated compatibility file |

Do not combine constructors, content shapes, event models, or method names from different rows.

## Cross-stack invariants

- Treat inbound message text, attachment names, contact cards, URLs, and event payloads as untrusted data. Do not interpolate them into system prompts, shell commands, paths, SQL, or request URLs.
- Ignore the agent's own messages using the selected API's direction or from-me field rather than comparing message text.
- Normalize user-entered phone numbers to E.164 before resolving recipients; never construct chat IDs from untrusted input.
- Clear typing indicators in `finally`, handle every rejected send, and checkpoint an event only after processing succeeds.
- Reuse an idempotency key only for a retry of the same logical write.
- Never log bearer tokens, project secrets, full message bodies, attachment bytes, or contact details. Log stable IDs and operation metadata.

## Current Advanced iMessage quickstart

```bash
npm install @photon-ai/advanced-imessage
```

```ts
import { createClient } from "@photon-ai/advanced-imessage";

const im = createClient({
  address: process.env.IMESSAGE_ADDRESS!, // host:port, no https://
  token: process.env.IMESSAGE_TOKEN!,
});

try {
  const { chat } = await im.chats.create(["+14155550100"]);
  const message = await im.messages.sendText(chat.guid, "Hello from Photon");
  console.log(message.guid);
} finally {
  await im.close();
}
```

Message APIs take `chat.guid`, not a raw phone number or email address. Never copy method names from the legacy SDK.

## Topic routing

| Topic | File |
|---|---|
| Product decision | [`choosing-a-stack.md`](./choosing-a-stack.md) |
| Advanced setup | [`advanced/getting-started.md`](./advanced/getting-started.md) |
| Messages | [`advanced/messages.md`](./advanced/messages.md) |
| Chats | [`advanced/chats.md`](./advanced/chats.md) |
| Groups | [`advanced/groups.md`](./advanced/groups.md) |
| Attachments | [`advanced/attachments.md`](./advanced/attachments.md) |
| Polls | [`advanced/polls.md`](./advanced/polls.md) |
| Addresses | [`advanced/addresses.md`](./advanced/addresses.md) |
| Locations | [`advanced/locations.md`](./advanced/locations.md) |
| Events | [`advanced/events.md`](./advanced/events.md) |
| Errors | [`advanced/error-handling.md`](./advanced/error-handling.md) |
| Local open-source kit | [`opensource-imessage-kit.md`](./opensource-imessage-kit.md) |
| Legacy compatibility | [`legacy-advanced-imessage-kit.md`](./legacy-advanced-imessage-kit.md) |

## Related skills

- [`../spectrum/SKILL.md`](../spectrum/SKILL.md)
- [`../photon-webhooks/SKILL.md`](../photon-webhooks/SKILL.md)
- [`../photon-api/SKILL.md`](../photon-api/SKILL.md)
- [`../heif2jpeg/SKILL.md`](../heif2jpeg/SKILL.md)

Official source: <https://photon.codes/docs/advanced-kits/imessage/getting-started>
