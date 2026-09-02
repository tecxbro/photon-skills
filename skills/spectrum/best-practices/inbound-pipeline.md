# Spectrum inbound pipeline

People send messages in bursts. Debounce per chat, then generate one response from the whole burst.

## Keep queued messages in storage

Insert each inbound message into a `batch_queue` table and schedule or move one flush job. Do not copy messages into the job payload at enqueue time. If the job is cancelled before it starts, rows remain available for the next flush.

```text
message -> insert row -> reset flush run_at -> handler reads and deletes rows
```

## Carry forward drained work

After a handler drains rows, cancellation can still happen during generation. Before aborting, write drained inputs to `carried_messages`. The next batch prepends them as earlier context rather than treating them as brand-new input.

## Chain-aware cancellation

Store `cancelled_at` in a per-chat in-flight record and cancel the queue job. Inside long stages, poll the flag and abort active work.

```ts
const inflight = await readInflight(chatId);
if (inflight?.cancelled_at && inflight.cancelled_at > chainStartedAt) {
  abortController.abort();
}
```

Compare the timestamp to this chain's start. A stale cancellation flag from an older chain must not kill the replacement chain.

Recommended invariant: no message leaves durable storage until a handler owns it, and no drained message is discarded when that handler is cancelled.

Official source: <https://photon.codes/docs/best-practices/inbound-pipeline>
