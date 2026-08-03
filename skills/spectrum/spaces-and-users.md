# Spectrum spaces and users

A **Space** is a conversation. A **User** is a platform participant. Both carry a platform tag and can be narrowed back to provider-specific types.

## Space operations

```ts
await space.send("Hello", attachment("./photo.jpg"));
await space.startTyping();
await space.stopTyping();

await space.responding(async () => {
  const result = await generateResponse();
  await space.send(result);
});
```

`responding()` guarantees the stop-typing signal runs even when the callback throws. Provider-specific unsupported operations raise `UnsupportedError`; best-effort features such as typing may silently no-op where documented.

Universal space actions include:

- `send(...content)`;
- `responding(fn)`;
- `startTyping()` / `stopTyping()`;
- `read(message)`;
- `edit(message, content)`;
- `unsend(message)`;
- `rename(name)`;
- `avatar(input)` / `getAvatar()`;
- `add(memberOrMembers)`;
- `remove(memberOrMembers)`;
- `leave()`;
- `getMembers()` and provider-defined getters.

## Resolve users and create spaces

```ts
import { imessage } from "spectrum-ts/providers/imessage";

const im = imessage(app);
const alice = await im.user("+15551111111");
const bob = await im.user("+15552222222");

const dm = await im.space.create(alice);
const group = await im.space.create([alice, bob]);
const existing = await im.space.get("any;-;+15551111111");
```

Platform IDs are provider-specific. For iMessage, use an E.164 phone number or email when resolving a user; do not assume the same identifier format works for Slack, Telegram, or WhatsApp.

Official source: <https://photon.codes/docs/spectrum-ts/spaces-and-users>
