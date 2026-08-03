# Read state and typing

- Use read content to mark the conversation read where supported.
- Handle inbound read receipts as events/content after narrowing.
- Start and stop typing as a balanced pair.
- Prefer `app.responding(...)` for automatic cleanup.
- Always stop typing when work is cancelled or fails.

Official sources:
- <https://photon.codes/docs/spectrum-ts/content/read>
- <https://photon.codes/docs/spectrum-ts/content/typing-indicators>
