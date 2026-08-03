# Advanced iMessage chats

- Create or resolve direct and group chats through `im.chats`.
- Read chat state, mark read, set typing state, share the account contact card, and manage chat backgrounds only through documented chat methods.
- Keep direct-chat and group-chat behavior separate.
- Treat chat GUIDs as opaque identifiers; do not synthesize undocumented formats.
- Stop typing in `finally` blocks when the response operation can be cancelled.

Official source: <https://photon.codes/docs/advanced-kits/imessage/chats>
