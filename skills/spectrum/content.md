# Spectrum content index

Every `space.send`, `message.reply`, and app-level send accepts strings or content builders. Load only the relevant reference:

| Need | File |
|---|---|
| Plain text, Markdown, and text streams | [`content/text-and-markdown.md`](./content/text-and-markdown.md) |
| Files and voice notes | [`content/attachments-and-voice.md`](./content/attachments-and-voice.md) |
| Contacts and native link previews | [`content/contacts-and-rich-links.md`](./content/contacts-and-rich-links.md) |
| Tappable app cards and in-place card updates | [`content/app-cards.md`](./content/app-cards.md) |
| Polls, visual groups, and provider raw content | [`content/polls-groups-and-custom.md`](./content/polls-groups-and-custom.md) |
| Threaded replies, edits, and unsend | [`content/replies-edits-and-unsend.md`](./content/replies-edits-and-unsend.md) |
| Read receipts and typing indicators | [`content/read-and-typing.md`](./content/read-and-typing.md) |
| Rename, avatar, membership, and leave events | [`content/rename-avatar-and-membership.md`](./content/rename-avatar-and-membership.md) |
| Variadic sends and single-consumption streaming | [`content/composing-and-streaming.md`](./content/composing-and-streaming.md) |

Strings are equivalent to `text(string)`. Provider-specific content should be used only after generic content cannot express the requested behavior.
