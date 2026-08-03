# Features and limitations

“Remote” means Spectrum Cloud or self-hosted mode.

| Feature | Current support |
|---|---|
| Direct messages | Yes |
| Mentions | DMs only |
| File uploads | Send supported |
| Add reactions / tapbacks | Remote only |
| Remove reactions | No |
| Message editing | Remote only |
| Typing indicators | Remote only |
| Modals | Limited, remote only; first `Select` maps to an iMessage poll |
| Webhooks | Spectrum Cloud remote mode |
| Message history | No |
| Thread/chat info | No |
| Cards / mini-app cards | No through the Chat SDK adapter |
| Streaming | No |
| Ephemeral messages | No |

Poll-backed modals support one `Select` with 2–10 options. Poll titles must be distinct in the same chat. Local mode does not support reactions, typing, editing, modals, history, or thread info.

DM threads can be rebuilt from their address. Group threads cannot be cold-resolved; a group must have been observed through the current gateway session before the adapter can address it. Markdown is flattened to iMessage plain text.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
