# WhatsApp error handling

- Catch typed errors and narrow with `error.code`.
- Separate retryable transport/rate failures from invalid credentials, templates, media, and validation failures.
- Use request deadlines and abort signals.
- Make sends and processing idempotent.
- Redact Meta error payloads when they contain identifiers or tokens.

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/error-handling>
