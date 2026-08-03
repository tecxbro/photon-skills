# Spectrum reactions, replies, edits, and unsend

The message sugar methods and canonical content builders route through the same send pipeline.

## Reactions

```ts
import { Emoji, reaction } from "spectrum-ts";

const first = await message.react(Emoji.laugh);
const second = await space.send(reaction("❤️", message));
```

A supported reaction returns a `Message` handle that can later be unsent. Unsupported platforms return `undefined`. Reactions cannot target another reaction message.

Tapback aliases include `Emoji.love`, `like`, `dislike`, `laugh`, `emphasize`, and `question`.

## Replies

```ts
import { reply, text } from "spectrum-ts";

await message.reply("Got it", attachment("./answer.pdf"));
await space.send(reply(text("Got it"), message));
```

Threaded replies are supported by platforms such as iMessage and WhatsApp Business. On an unsupported platform, a reply no-ops; it is not downgraded to a loose send. Use `space.send(...)` when delivery is more important than threading.

`reply()` cannot wrap `reply`, `edit`, `reaction`, `group`, `typing`, `rename`, `avatar`, `addMember`, `removeMember`, `leaveSpace`, `unsend`, or `read` content.

## Edits

```ts
import { edit, text } from "spectrum-ts";

const sent = await space.send("Draft");
await sent?.edit("Final version");
await space.send(edit(text("Another version"), sent));
```

Only outbound messages can be edited. Edits are fire-and-forget and return `undefined`. Native provider edit windows and restrictions surface during send.

## Unsend

```ts
import { unsend } from "spectrum-ts";

const sent = await space.send("Oops");
await sent?.unsend();
await space.unsend(sent);
await space.send(unsend(sent));
```

Only outbound messages can be unsent. The builder rejects inbound targets. Native time windows, such as iMessage's regular-message unsend window, surface through the provider.

Official source: <https://photon.codes/docs/spectrum-ts/reactions-and-replies>
