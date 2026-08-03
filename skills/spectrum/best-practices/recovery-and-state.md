# Recovery and state

- Use stable message/event IDs for idempotency.
- Persist cursors and retry state durably.
- Separate per-resource memory from per-thread memory.
- Recover after worker crashes without replaying completed side effects.
- Write a durable failure audit record with enough redacted context to retry.

Official source: <https://photon.codes/docs/best-practices/recovery-and-state>
