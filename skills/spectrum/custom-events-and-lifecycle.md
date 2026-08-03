# Custom events and lifecycle

Provider-specific streams complement `app.messages`; they do not replace the unified message loop.

- Consume only documented event streams.
- Pass abort signals when the provider supports cancellation.
- Persist cursors after durable processing.
- Recover missed events after reconnects.
- Deduplicate retries.
- Stop streams and call `app.stop()` on shutdown.
- Distinguish long-running stream mode from HTTP webhook mode.
- Do not assume one provider’s recovery semantics apply to another.

Official source: <https://photon.codes/docs/spectrum-ts/custom-events-and-lifecycle>
