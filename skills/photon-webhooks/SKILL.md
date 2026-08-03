---
name: photon-webhooks
description: >
  Receive Spectrum messaging events over signed HTTP webhooks. Use for public HTTPS endpoints, serverless routes, raw request body, HMAC-SHA256, X-Spectrum-Signature, timestamp freshness, webhook registration, one-time signing secrets, retries, at-least-once delivery, duplicate events, queues, rotation, lost secrets, and troubleshooting. Keywords: Photon webhook, Spectrum webhook, HMAC, signature, raw body, retry, dedupe, webhook secret, serverless.
license: MIT
metadata:
  author: photon-hq
  version: '1.0.0'
---


# Photon Webhooks

Spectrum Webhooks deliver inbound events to a public HTTPS endpoint.

- Every registered URL receives the relevant project events.
- Each URL has its own signing secret.
- The signing secret is returned once.
- Delivery is at least once; consumers must deduplicate.
- Return a successful response quickly and move slow work to a queue.
- There is no general public HTTP send-message endpoint through this webhook feature. Outbound messaging remains an SDK concern.

## Workflow

1. Register the URL through the current Spectrum API.
2. Capture and store the signing secret once.
3. Preserve raw request bytes.
4. Verify timestamp and HMAC before JSON parsing.
5. Deduplicate.
6. Return `2xx`.
7. Process asynchronously.

## Topic routing

- [`quickstart.md`](./quickstart.md)
- [`events.md`](./events.md)
- [`verifying-signatures.md`](./verifying-signatures.md)
- [`delivery-and-retries.md`](./delivery-and-retries.md)
- [`managing.md`](./managing.md)
- [`troubleshooting.md`](./troubleshooting.md)

Official source: <https://photon.codes/docs/webhooks/overview>
