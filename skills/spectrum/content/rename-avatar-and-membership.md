# Spectrum rename, avatar, and membership actions

These actions are fire-and-forget and resolve to `undefined`. Provider constraints surface as `UnsupportedError`.

## Rename

```ts
import { rename } from "spectrum-ts";
await space.send(rename("Launch Team"));
await space.rename("Launch Team");
```

The name cannot be empty. Inbound rename events carry the new `displayName`; `message.sender` is the actor when known.

## Avatar

```ts
import { avatar } from "spectrum-ts";
await space.send(avatar("./icon.png"));
await space.send(avatar(buffer, { mimeType: "image/jpeg" }));
await space.send(avatar("clear"));
```

`"clear"` is reserved. Webhook avatar-set events are metadata-only; fetch bytes through `space.getAvatar()` when needed.

## Membership and leaving

```ts
import { addMember, removeMember, leaveSpace } from "spectrum-ts";

await space.send(addMember("+15551234567"));
await space.send(removeMember(["+15551234567", "carol@example.com"]));
await space.send(leaveSpace());

await space.add(alice);
await space.remove(bob);
await space.leave();
```

Member input can be a resolved User or raw provider ID, singly or in a batch. Empty batches reject at build time. Inbound events distinguish `removeMember` from voluntary `leaveSpace`; the sender is the actor or leaver.

Official sources: <https://photon.codes/docs/spectrum-ts/content/rename>, <https://photon.codes/docs/spectrum-ts/content/avatar>, and <https://photon.codes/docs/spectrum-ts/content/membership>
