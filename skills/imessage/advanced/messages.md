# Advanced iMessage messages

- Text, formatting, effects, attachments, app cards, replies, multipart messages, reactions, stickers, edits, unsend, notify-anyway behavior, queries, and message events belong here.
- Treat every message identifier as opaque and stable; store it unchanged.
- Narrow message/event unions before reading type-specific fields.
- Edits and unsend can be restricted by ownership, platform state, or time windows. Surface the actual SDK error.
- Use uploaded attachment references rather than repeatedly loading large files into memory.
- Do not copy method names or payload shapes from the legacy package.

Official source: <https://photon.codes/docs/advanced-kits/imessage/messages>
