# Inbound iMessage group events

Inbound group events require a dedicated Business line. Shared-pool lines and local iMessage do not subscribe to this stream.

| Change | Content | Actor |
|---|---|---|
| Member added | `addMember`, affected `members` | `message.sender` |
| Member removed | `removeMember`, affected `members` | `message.sender` |
| Member left | `leaveSpace` | Sender is the leaver |
| Group renamed | `rename`, new `displayName` | Sender when known |
| Icon set/cleared | `avatar` action | Sender when known |

```ts
for await (const [space, message] of app.messages) {
  if (message.content.type === "addMember") {
    console.log(message.sender?.id, message.content.members);
  }
}
```

Apple does not always record an actor. Agent-originated changes are suppressed. Dedicated-line events are durable and replayed after reconnect; after a cursor gap, reconcile with `space.getMembers()` and `space.getAvatar()`.

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/messaging-features/inbound-group-events>
