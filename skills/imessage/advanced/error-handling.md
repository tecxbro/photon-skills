# Advanced iMessage error handling

- Catch documented SDK error classes and inspect `error.code` or `ErrorCode` after narrowing.
- Separate retryable transport/rate failures from authentication, validation, and missing-resource failures.
- Use deadlines and `AbortSignal` where supported.
- Make writes idempotent and reuse stable client-generated identifiers when documented.
- Redact tokens, addresses, message contents, and attachment bytes from logs.

Official source: <https://photon.codes/docs/advanced-kits/imessage/error-handling>
