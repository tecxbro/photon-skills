# Webhook events

Important headers:

- `X-Spectrum-Event`
- `X-Spectrum-Webhook-Id`
- `X-Spectrum-Timestamp`
- `X-Spectrum-Signature`

The body is a discriminated event envelope. The current inbound message event contains serialized `space` and `message` objects. Function-valued SDK properties such as reply, react, read, or stream methods do not survive JSON serialization.

Use `message.id` as the main project-level deduplication key. Combine it with the webhook ID when one downstream system intentionally processes each registration separately.

Attachment events contain metadata such as filename, MIME type, and size, not the file bytes or a public download URL. Handle unknown future event and content types by logging and returning `2xx`.

Official source: <https://photon.codes/docs/webhooks/events>
