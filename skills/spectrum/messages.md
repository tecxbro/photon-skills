# Spectrum messages

Every inbound message is associated with a Space and has stable opaque identifiers, direction, platform, sender, timestamp, and discriminated `content`.

Handle the current content/action union defensively:

- `text`, `markdown`, `attachment`, `voice`, `contact`, `richlink`
- `poll`, poll-option responses, `group`, `custom`
- `effect`, `app`, `reply`, `edit`, `unsend`
- `read`, `typing`, `rename`, `avatar`
- `add-member`, `remove-member`, `leave-space`
- streaming text lifecycle content

```ts
for await (const [space, message] of app.messages) {
  switch (message.content.type) {
    case "text":
      await space.send(message.content.text);
      break;
    case "attachment":
      // Inspect MIME type and attachment metadata before retrieval.
      break;
    default:
      // Tolerate future content without crashing the stream.
      break;
  }
}
```

Do not parse IDs to infer provider state. Deduplicate retried deliveries by stable message/event IDs. Only use message convenience actions after checking the current provider guarantees.

Official source: <https://photon.codes/docs/spectrum-ts/messages>
