# Spectrum custom events and lifecycle

Provider-defined events complement `app.messages`. They are exposed as flat async iterables named after the event declaration and merged across every provider that emits them.

## Merged and provider-scoped streams

```ts
for await (const event of app.typing) {
  console.log(event.platform, event);
}

const im = imessage(app);
for await (const event of im.typing) {
  // iMessage-only typing events.
}
```

Streams are created lazily on first property access. Reusing the property shares the same underlying source; do not assume every iteration establishes an independent transport subscription.

## Fusor custom events

```ts
import { fusorEvent } from "spectrum-ts";

return [
  messageRecord,
  fusorEvent("presence", { userId: update.userId, online: true }),
];
```

A declared Fusor event becomes `app.presence` and `narrowed.presence`. An undeclared event name is accepted by the helper but produces a runtime warning.

## Graceful shutdown

```ts
await app.stop();
```

`stop()` is idempotent. It closes the merged message stream, drains custom event streams, invokes provider `destroyClient` hooks, and flushes telemetry.

Spectrum installs `SIGINT` and `SIGTERM` handlers. It attempts cleanup for three seconds, exiting with code `0` on success or `1` on timeout. Call `stop()` manually in tests, embedded runtimes, or before reinitializing providers.

Provider recovery semantics are independent. Persist only documented durable cursors, advance them after successful processing, and do not assume live-only events can be replayed.

Official source: <https://photon.codes/docs/spectrum-ts/custom-events-and-lifecycle>
