# Deployment and troubleshooting

Check in this order:

1. Install and import `@photon-ai/chat-adapter-imessage`, not the obsolete unscoped package.
2. Register the adapter under `new Chat({ userName, adapters: { imessage } })`.
3. Choose exactly one connection mode: Spectrum Cloud credentials or a self-hosted gRPC endpoint.
4. Cloud uses `IMESSAGE_PROJECT_ID` and `IMESSAGE_PROJECT_SECRET`, or a lazy `credentials` provider.
5. Self-hosted uses a gRPC `host:port`, not an `https://` URL.
6. Do not use `local: true`; local on-device mode was removed from this adapter.
7. Webhook routes pass the original `Request` and configure `IMESSAGE_WEBHOOK_SECRET` unless a trusted `webhookVerifier` is supplied.
8. Webhook side effects are idempotent because deliveries are at least once.
9. Gateway-listener routes are authenticated and stop cleanly when their duration or process ends.
10. The lockfile does not retain the legacy Advanced iMessage Kit or unscoped Chat Adapter dependency.

## Capability boundaries

- `fetchMessage` is supported; general message-history listing is not.
- General thread/chat metadata is not supported.
- Reaction removal is limited to tapbacks added during the adapter session.
- Mini-app cards, voice messages, effects, and backgrounds use adapter-specific methods rather than generic Chat SDK card or streaming primitives.
- Several configured lines can make an unseen webhook thread ambiguous; respond from a gateway-observed thread when necessary.
- Local macOS automation belongs to `@spectrum-ts/imessage-local` or `@photon-ai/imessage-kit`, not this adapter.

Treat a `NotImplementedError` for an unsupported operation as a capability boundary, not automatically as a transport outage. Treat authentication, gRPC connection, webhook-signature, and routing failures separately and preserve their redacted error context.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
