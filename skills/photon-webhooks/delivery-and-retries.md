# Delivery and retries

- Photon retries documented retryable responses and timeouts.
- Delivery is at least once.
- A successful acknowledgement must be returned before slow model/tool work.
- Deduplicate with a durable key such as `message.id`.
- Make downstream writes idempotent.
- Use a queue with bounded retries and a dead-letter or poison-event path.
- Record delivery latency, status, attempt count, dedup hits, and processing failures without storing secrets.
- Return `2xx` for unknown future event types after safely recording them.

Official source: <https://photon.codes/docs/webhooks/delivery>
