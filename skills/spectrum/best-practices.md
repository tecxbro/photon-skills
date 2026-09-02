# Spectrum production patterns

A single receive-generate-send handler breaks under message bursts, cancellation, worker crashes, and retries. Use the references below as one connected architecture:

| Area | File |
|---|---|
| Staged queue architecture | [`best-practices/architecture.md`](./best-practices/architecture.md) |
| Debounce, draining, cancellation, carry-forward | [`best-practices/inbound-pipeline.md`](./best-practices/inbound-pipeline.md) |
| Stable IDs, resume cursors, memory scope, failure audit | [`best-practices/recovery-and-state.md`](./best-practices/recovery-and-state.md) |
| iMessage line health and capacity | [`best-practices/imessage-deliverability.md`](./best-practices/imessage-deliverability.md) |

Do not copy timing or throughput recommendations into unrelated providers. Apply provider-specific delivery rules separately.
