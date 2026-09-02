# Spectrum replies, edits, and unsend

## Threaded reply

```ts
import { reply, text } from "spectrum-ts";
await space.send(reply(text("Got it"), message));
await message.reply("Got it", attachment("./answer.png"));
```

Unsupported thread providers no-op rather than downgrading to a normal send. Use `space.send()` when delivery must be guaranteed.

## Edit

```ts
import { edit, text } from "spectrum-ts";
const sent = await space.send("Draft");
await space.send(edit(text("Final"), sent));
```

Only outbound targets are accepted. Edits mutate the existing message and return `undefined`. Provider edit windows surface at send time.

## Unsend

```ts
import { unsend } from "spectrum-ts";
const sent = await space.send("Oops");
await space.send(unsend(sent));
```

Only outbound targets are accepted. Unsend is fire-and-forget. Provider time windows and ownership restrictions surface during send.

Reply and edit cannot wrap reply/edit/reaction/group/typing/rename/avatar/membership/leave/unsend/read action content.

Official sources: <https://photon.codes/docs/spectrum-ts/content/replies>, <https://photon.codes/docs/spectrum-ts/content/edits>, and <https://photon.codes/docs/spectrum-ts/content/unsend>
