# iMessage chat renaming

```ts
import { rename } from "spectrum-ts";

await space.rename("Book Club");
await space.send(rename("Book Club"));
```

The builder rejects an empty name. Rename requires cloud `@spectrum-ts/imessage` and a group chat. Local mode and direct messages throw `UnsupportedError`.

Inbound rename events arrive as `content.type === "rename"` with `displayName`; `message.sender` is the actor when Apple recorded one.

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/messaging-features/chat-renaming>
