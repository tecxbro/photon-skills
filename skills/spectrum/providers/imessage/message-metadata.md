# Native iMessage message metadata

Cloud iMessage messages expose a curated native metadata surface. Use `imessage.is(message)` after checking the provider.

```ts
const message = await space.getMessage(messageId);
if (message && imessage.is(message)) {
  console.log({
    sent: message.isSent,
    delivered: message.isDelivered,
    deliveredAt: message.dateDelivered,
    readAt: message.dateRead,
    editedAt: message.dateEdited,
    retractedAt: message.dateRetracted,
    sendErrorCode: message.sendErrorCode,
  });
}
```

Metadata groups include:

- delivery and lifecycle state;
- `nativeText`, UTF-16 formatting ranges, mentions, subject, and effect IDs;
- attachment transfer records;
- applied reactions and placed stickers;
- classification fields such as system, spam, corrupt, and expirable state.

Use `nativeText` for mention and formatting offsets; rebuilding ranges from normalized content is unreliable. Attachment metadata describes transfer state, while bytes remain in Spectrum attachment content.

The surface is intentionally curated and does not expose the raw Advanced iMessage database row.

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/messaging-features/message-metadata>
