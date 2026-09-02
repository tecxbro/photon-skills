# Advanced iMessage groups

Group operations require a group `chat.guid`. Direct chats cannot use `im.groups`.

## Operations

| Need | Current method |
|---|---|
| Rename | `im.groups.setDisplayName(chat.guid, name)` |
| Read participants | `im.groups.listParticipants(chat.guid)` |
| Add participants | `im.groups.addParticipants(chat.guid, addresses)` |
| Remove participants | `im.groups.removeParticipants(chat.guid, addresses)` |
| Set icon | `im.groups.setIcon(chat.guid, imageBytes)` |
| Get icon | `im.groups.getIcon(chat.guid)` |
| Remove icon | `im.groups.removeIcon(chat.guid)` |
| Leave | `im.groups.leave(chat.guid)` |
| Subscribe | `im.groups.subscribeEvents(filter?)` |

```ts
await im.groups.setDisplayName(group.guid, "Launch Team");
await im.groups.addParticipants(group.guid, ["+15551234567"]);
const members = await im.groups.listParticipants(group.guid);
await im.groups.setIcon(group.guid, await readFile("group-icon.jpg"));
```

Use full email addresses or E.164 phone numbers for participant writes. Preserve returned addresses exactly. Require explicit user intent before removing someone or leaving a group.

`getIcon(...)` throws `NotFoundError` with the documented group-icon error code when no custom icon exists. Treat that as an absent optional resource, not database corruption.

## Events

```ts
for await (const event of im.groups.subscribeEvents({ chat: group.guid })) {
  switch (event.type) {
    case "group.displayNameChanged":
    case "group.participantsAdded":
    case "group.participantsRemoved":
    case "group.iconChanged":
    case "group.iconRemoved":
    case "group.left":
      console.log(event.chatGuid, event.sequence, event.type);
      break;
  }
}
```

Persist the highest contiguous successfully processed sequence and recover gaps using `im.events.catchUp(...)`.

Official source: <https://photon.codes/docs/advanced-kits/imessage/groups>
