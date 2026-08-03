# Reactions, replies, and edits

Spectrum exposes both convenience methods on messages and canonical content builders passed through the send pipeline.

```ts
import { reaction, reply, edit, text } from "spectrum-ts";

await message.react("love");
await space.send(reaction("love", message));

await message.reply("Acknowledged");
await space.send(reply(text("Acknowledged"), message));

const sent = await space.send("Draft");
await sent.edit("Final");
await space.send(edit(text("Final"), sent));
```

Use provider-specific reaction constants after narrowing. A reply may resolve as a no-op on a provider without thread support; use a regular `space.send(...)` when delivery is more important than threading. Respect builder restrictions on nesting reply, reaction, edit, group, or typing content.

Official source: <https://photon.codes/docs/spectrum-ts/reactions-and-replies>
