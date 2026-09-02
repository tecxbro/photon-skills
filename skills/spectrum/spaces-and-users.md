# Spectrum spaces and users

A **Space** is a conversation. A **User** is a platform participant. Both carry a platform tag and can be narrowed back to provider-specific types.

## Space operations

```ts
import { attachment } from "spectrum-ts";

await space.send("Hello", attachment("./photo.jpg"));
await space.startTyping();
await space.stopTyping();

await space.responding(async () => {
  const result = await generateResponse();
  await space.send(result);
});
```

`responding()` guarantees the stop-typing signal runs even when the callback throws.

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

These methods have different failure semantics. Send-routed operations normally warn and skip when a provider reports `UnsupportedError`; some controls are accepted no-ops. Resolvers and platform-wise reads such as `space.create`, `space.get`, `getMembers`, and `getAvatar` surface failures to the caller. Read [`capability-semantics.md`](./capability-semantics.md) before treating a resolved promise as proof that a platform performed an optional action.

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

Platform IDs are provider-specific. For iMessage, use an E.164 phone number or email when resolving a user; do not assume the same identifier format works for Telegram, WhatsApp, or another provider.

Creating a space is a transport path, not permission to contact someone. Initiate only after the recipient has opted in, and read the selected provider's routing, plan, and quota constraints before proactive sends.

Official source: <https://photon.codes/docs/spectrum-ts/spaces-and-users>
