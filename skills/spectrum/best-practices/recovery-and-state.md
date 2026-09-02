# Spectrum recovery and state

Use three independent recovery layers: deterministic client IDs, a persisted send cursor, and queue retries.

## Deterministic send IDs

Assign an ID when the job is created, not during each attempt:

```ts
const messages = reply.map((text, index) => ({
  text,
  clientGuid: `${jobId}-${index}`,
}));
```

If the transport accepted a send but the worker crashed before recording it, the retry reuses the same logical ID and can be deduplicated.

## Resume cursor

Persist `startIndex` after every acknowledged message. A retry begins at the first unsent item. If a crash occurs between acknowledgement and cursor persistence, the deterministic client ID is the second line of defense.

## Memory scope

Separate identity memory from conversation history:

```ts
await memory.getWorkingMemory({
  resourceId: senderAddress,
  threadId: `chat-${chatId}`,
});
```

Use one resource scope per person and one thread scope per chat. Test concurrent updates so two users cannot overwrite each other's working memory.

## Durable failure audit

Record queue, job ID, bounded payload or payload pointer, error, and timestamp in a `job_failures` table. Add retention, make audit insertion fail-safe, and never store raw secrets or large binary bodies.

Official source: <https://photon.codes/docs/best-practices/recovery-and-state>
