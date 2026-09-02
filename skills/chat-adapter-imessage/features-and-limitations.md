# Features and limitations

The current adapter supports Spectrum Cloud and self-hosted gRPC connections. Local on-device mode is not supported.

| Feature | Current support |
|---|---|
| Direct messages | Yes |
| Open a DM proactively | Yes, through `openDM` |
| Mentions | DMs only |
| File uploads | Send supported |
| Add reactions / tapbacks | Yes |
| Remove reactions | Yes for tapbacks added in the current adapter session |
| Message editing | Yes, subject to iMessage constraints |
| Message delete / unsend | Yes, subject to the native unsend window |
| Mark read | Yes |
| Typing indicators | Yes |
| Message effects | Yes through the adapter-specific `sendEffect` API |
| Voice messages | Yes through `sendVoice` |
| Mini-app cards | Yes through `sendMiniApp` |
| Chat backgrounds | Yes through `setBackground` |
| Modals | Limited; the first `Select` maps to a native iMessage poll |
| Fetch one message | Yes through `fetchMessage` |
| Webhooks | Yes in Spectrum Cloud mode |
| Message history | No |
| General thread/chat info | No |
| Generic cards | No; mini-app cards are the supported card surface |
| Token streaming | No |
| Ephemeral messages | No |

## Poll-backed modals

A modal may contain one supported `Select`; its title becomes the poll question and its 2–10 options become poll choices. Polls in one conversation need distinct titles so votes can be routed back to the correct callback. Text inputs, radio controls, several selects, custom submit labels, and vote deselection are not supported through this mapping.

## Adapter-specific extras

The following behaviors are not generic Chat SDK primitives and should be called on the iMessage adapter directly:

```ts
await bot.adapters.imessage.sendEffect(thread.id, "Done!", "confetti");
await bot.adapters.imessage.sendMiniApp(thread.id, "https://example.com/result");
await bot.adapters.imessage.sendVoice(thread.id, audioInput);
await bot.adapters.imessage.setBackground(thread.id, backgroundInput);
```

Check the installed adapter types for the exact input accepted by `sendVoice` and `setBackground`; do not guess a payload from another Photon SDK.

## Thread reconstruction

A webhook delivery can rebuild its DM or group thread from the chat GUID and reply without a gateway. With multiple configured lines, an unseen thread may be ambiguous because the adapter does not know which line owns it; continue from a gateway-observed thread in that case.

Markdown is converted into readable iMessage-compatible text rather than preserving a Slack-style rich-text surface.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
