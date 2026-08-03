# iMessage group membership

```ts
import { addMember, removeMember, leaveSpace } from "spectrum-ts";

await space.add("+15553333333");
await space.add([alice, "carol@example.com"]);
await space.remove("+15553333333");
await space.leave();

await space.send(addMember("+15553333333"));
await space.send(removeMember("+15553333333"));
await space.send(leaveSpace());
```

Handles are E.164 phone numbers or emails. List current members with `space.getMembers()`. The agent's own line is excluded. Narrow the app for iMessage-specific member fields:

```ts
const im = imessage(app);
const detailed = await im.getMembers(space);
console.log(detailed.map((member) => [member.address, member.service]));
```

Membership requires cloud mode and a group. Local mode and DMs throw `UnsupportedError`; a DM cannot be converted into a group.

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/messaging-features/group-membership>
