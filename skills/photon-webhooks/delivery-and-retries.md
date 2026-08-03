# Spectrum webhook delivery and retries

Delivery is at least once. A retry carries the same logical `message.id`, so every consumer must be idempotent.

## Endpoint contract

- Return any `2xx` as soon as signature verification and durable queue/storage succeed.
- Do not run an LLM, tool call, or slow database workflow before acknowledgement.
- Requests exceeding the documented 30-second delivery timeout are treated as failed and can retry.
- Network errors, timeouts, and retryable server responses retry with backoff.
- Permanent URL-policy failures such as plain HTTP, private addresses, or redirects are fatal rather than retried.
- Unknown future event types should be safely recorded and acknowledged.

Recommended handler shape:

```ts
verify(rawBody, headers);
const event = JSON.parse(rawBody);
await durableQueue.add(event, { jobId: event.message.id });
return new Response("accepted", { status: 202 });
```

## Idempotent processing

Use a unique database constraint or queue job ID based on `message.id`. For consumers that intentionally distinguish registrations, use `${webhookId}:${messageId}`. Return `2xx` even when the event was already processed.

Downstream writes must also be idempotent. Record status, latency, attempts, dedup hits, and failures without storing signing secrets or unbounded message content. Move repeatedly failing work to a dead-letter or poison-event path instead of causing the HTTP delivery to retry indefinitely.

Official source: <https://photon.codes/docs/webhooks/delivery>
