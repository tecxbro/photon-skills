# Spectrum iMessage provider

Use the managed cloud provider for deployed applications and the separate `@spectrum-ts/imessage-local` package for tools running on a Mac.

## Connection and routing

- Configure cloud iMessage with current project credentials.
- Install the local provider separately; do not pass a `local` flag to the cloud provider.
- Select a line only through documented configuration.
- Treat shared and dedicated routing as separate product modes.
- Use per-phone routing only where the current provider documents it.
- Direct and group conversations are both Spaces; group-only actions still require group capability.

## Feature guides

| Feature | File |
|---|---|
| Effects | [`imessage/message-effects.md`](./imessage/message-effects.md) |
| Rename | [`imessage/chat-renaming.md`](./imessage/chat-renaming.md) |
| Group avatars | [`imessage/group-avatars.md`](./imessage/group-avatars.md) |
| Membership | [`imessage/group-membership.md`](./imessage/group-membership.md) |
| Inbound group events | [`imessage/inbound-group-events.md`](./imessage/inbound-group-events.md) |
| Inbound read receipts | [`imessage/inbound-read-receipts.md`](./imessage/inbound-read-receipts.md) |
| Backgrounds | [`imessage/chat-backgrounds.md`](./imessage/chat-backgrounds.md) |
| App cards | [`imessage/apps.md`](./imessage/apps.md) |
| Contact-card sharing | [`imessage/contact-card-sharing.md`](./imessage/contact-card-sharing.md) |
| Apple metadata | [`imessage/message-metadata.md`](./imessage/message-metadata.md) |
| Attachment retrieval | [`imessage/fetching-attachments.md`](./imessage/fetching-attachments.md) |
| Tapbacks | [`imessage/tapback-reactions.md`](./imessage/tapback-reactions.md) |
| Troubleshooting | [`imessage/troubleshooting.md`](./imessage/troubleshooting.md) |

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/connection-and-routing>
