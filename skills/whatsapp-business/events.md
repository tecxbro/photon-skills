# WhatsApp Business events

`client.events.subscribe()` returns an async iterable containing inbound messages and outbound status updates. Every event has a resumable `cursor`.

## Durable cursor handling

```ts
for await (const event of client.events.subscribe({ cursor: lastCursor })) {
  await handleEvent(event);
  lastCursor = event.cursor;
  await persist(lastCursor);
}
```

Persist the cursor only after successful processing. The stream reconnects automatically and fetches events buffered while offline.

## Narrow inbound content

```ts
if (event.type === "message") {
  switch (event.message.content.type) {
    case "text":
      console.log(event.message.content.body);
      break;
    case "image":
    case "video":
    case "audio":
    case "document": {
      const { url } = await client.media.getUrl(event.message.content.media.id);
      console.log(url);
      break;
    }
    case "location":
      console.log(event.message.content.location.latitude);
      break;
    case "reaction":
      console.log(event.message.content.reaction.emoji);
      break;
    case "interactive":
      break;
    case "order":
      console.log(event.message.content.order.productItems);
      break;
  }
}
```

Status events describe delivery progress for sent messages. Correlate them through message IDs and optional `bizOpaqueCallbackData`.

## Reconnection

```ts
client.events.subscribe({
  cursor: lastCursor,
  reconnect: {
    initialDelay: 500,
    maxDelay: 60_000,
    maxAttempts: 10,
    multiplier: 2,
    onReconnect: (attempt) => console.log(`reconnect ${attempt}`),
  },
});
```

Defaults are `initialDelay: 1000`, `maxDelay: 30000`, `maxAttempts: Infinity`, and `multiplier: 2`.

## Manual missed-event recovery

```ts
const { events } = await client.events.fetchMissed({
  cursor: lastCursor,
  limit: 100,
});
for (const event of events) await handleEvent(event);
```

Replay in order, deduplicate, and then resume live subscription from the latest successfully processed cursor.

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/events>
