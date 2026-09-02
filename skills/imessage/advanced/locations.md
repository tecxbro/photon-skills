# Advanced iMessage locations

`im.locations` requests location sharing and reads Find My friend locations already visible to the current account. Location streams are live-only and are not part of the durable event log.

## Request sharing

```ts
const receipt = await im.locations.request(chat.guid, "+15551234567", {
  clientMessageId: `location-request-${job.id}`,
});
console.log(receipt.status, receipt.messageGuid);
```

The address must be an existing participant in the chat. A successful receipt means the visible request card was sent or accepted for processing; it does not mean the person started sharing.

## List and fetch snapshots

```ts
const locations = await im.locations.list();
for (const location of locations) {
  if (location.latitude === undefined || location.longitude === undefined) continue;
  console.log(location.address, location.latitude, location.longitude);
}

const one = await im.locations.get("+15551234567");
```

`get(...)` accepts an address, not a chat GUID or display name. It throws `NotFoundError` when the friend is not sharing or is not visible. `latitude` and `longitude` are optional even when a record exists. `locationType` can be `live`, `shallow`, `legacy`, or `unknown` and does not guarantee coordinates.

## Watch live updates

```ts
for await (const update of im.locations.watch("+15551234567")) {
  const { latitude, longitude } = update.location;
  if (latitude === undefined || longitude === undefined) continue;
  console.log(latitude, longitude, update.sourceSequence);
}
```

`watch()` observes all visible friends; `watch(address)` scopes to one. Use `sourceSequence` for duplicate detection. Breaking out closes the stream. Updates missed during disconnect cannot be replayed by `im.events.catchUp(...)`.

Location data is sensitive. Limit storage, access, logging, and retention to the user-approved purpose.

Official source: <https://photon.codes/docs/advanced-kits/imessage/locations>
