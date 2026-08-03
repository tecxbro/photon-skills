# Deployment and troubleshooting

Check in this order:

1. The adapter is registered under `new Chat({ userName, adapters: { imessage } })`.
2. `local` and the selected credential set identify exactly one mode.
3. Cloud uses `IMESSAGE_PROJECT_ID` and `IMESSAGE_PROJECT_SECRET`.
4. Self-hosted uses a gRPC `host:port`, not an `https://` URL.
5. Webhook routes pass the original `Request` and configure `IMESSAGE_WEBHOOK_SECRET`.
6. Duplicate deliveries are idempotent.
7. Local macOS has Full Disk Access and iMessage is signed in.
8. The lockfile does not retain the legacy Advanced iMessage dependency.
9. Gateway listeners stop cleanly on process shutdown.

`fetchMessages`, `fetchThread`, and reaction removal are not supported. Treat `NotImplementedError` for those operations as a capability boundary, not as a transport failure.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
