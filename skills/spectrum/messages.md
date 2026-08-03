# Spectrum messages

Every provider feeds one merged `app.messages` stream. Each item is `[space, message]`; the space is already bound to the conversation.

```ts
for await (const [space, message] of app.messages) {
  if (message.direction === "outbound") continue;
  // Handle inbound content.
}
```

## Message envelope

Treat IDs as stable opaque values. A message includes:

- `id`;
- `platform`;
- `direction: "inbound" | "outbound"`;
- `timestamp`;
- optional `sender`;
- discriminated `content`;
- convenience methods such as `reply`, `react`, `edit`, `unsend`, and `read` where valid.

## Content union

Always narrow `message.content.type` before reading fields.

| Type | Important fields or meaning |
|---|---|
| `text` | `text` |
| `markdown` | Outbound-only `markdown` |
| `attachment` | `id`, `name`, `mimeType`, `size?`, `read()`, `stream()` |
| `voice` | `name?`, `mimeType`, `duration?`, `size?`, `read()`, `stream()` |
| `contact` | Name, phone, email, address, org, URL, photo, user, and raw fields |
| `richlink` | `url` |
| `effect` | Wrapped content plus provider effect string |
| `reaction` | `emoji`, `target` |
| `poll` | `title`, `options` |
| `poll_option` | `option`, `poll`, `selected`, `title` |
| `group` | `items: Message[]` |
| `app` | Lazy `url()`, lazy `layout()`, optional `live` |
| `reply` | `content`, `target` |
| `edit` | New `content`, existing `target` |
| `unsend` | Existing outbound `target` |
| `read` | Target message; inbound envelope means `sender` read a message you sent |
| `typing` | `state: "start" | "stop"` |
| `streamText` | Single-consumption `stream()`, optional markdown format |
| `rename` | `displayName` |
| `avatar` | Set or clear action; set may expose `read()` and `mimeType` |
| `addMember` / `removeMember` | `members: string[]` |
| `leaveSpace` | Sender is the member who left |
| `custom` | `raw` provider payload |

```ts
for await (const [space, message] of app.messages) {
  switch (message.content.type) {
    case "text":
      await message.reply(message.content.text);
      break;
    case "attachment":
      console.log(message.content.id, message.content.mimeType);
      break;
    case "read":
      console.log(message.sender?.id, message.content.target.id);
      break;
    case "addMember":
      console.log(message.sender?.id, message.content.members);
      break;
    default:
      // Be forward-compatible with future content variants.
      break;
  }
}
```

Group management events use `message.sender` as the actor when known. Agent-originated membership, rename, avatar, and read actions are suppressed rather than echoed back.

Official source: <https://photon.codes/docs/spectrum-ts/messages>
