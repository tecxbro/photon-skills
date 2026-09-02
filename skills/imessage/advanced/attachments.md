# Advanced iMessage attachments

Sending a file is a two-step operation: upload raw bytes with `im.attachments.upload(...)`, then send the returned `attachment.guid` through `im.messages`.

## Upload and send

```ts
const uploaded = await im.attachments.upload({
  fileName: "photo.jpg",
  data: await readFile("photo.jpg"),
});

await im.messages.sendAttachment(chat.guid, uploaded.attachment.guid);
```

`data` must not be empty. Keep a useful extension when possible; the server inspects bytes first and falls back to the extension. Each uploaded primary or companion file defaults to a 100 MiB limit.

## Live Photos

```ts
const livePhoto = await im.attachments.upload({
  fileName: "live-photo.HEIC",
  data: await readFile("live-photo.HEIC"),
  companion: { data: await readFile("live-photo.MOV") },
});

await im.messages.sendAttachment(chat.guid, livePhoto.attachment.guid);
```

The primary must be HEIC/HEIF. The MOV belongs in `companion.data`. Send only the primary attachment GUID.

## Metadata

```ts
const attachment = await im.attachments.get(uploaded.attachment.guid);
console.log(attachment.fileName, attachment.mimeType, attachment.totalBytes);
```

Important fields include `guid`, `fileName`, `mimeType`, `uti`, `totalBytes`, `transferState`, `isOutgoing`, `isHidden`, `isSticker`, `companionKind`, and `originalGuid`. Transfer state is `pending`, `transferring`, `failed`, `finished`, or `unknown`.

## Stream downloads

```ts
for await (const frame of im.attachments.downloadStream(attachment.guid)) {
  switch (frame.type) {
    case "header":
      console.log(frame.info.fileName, frame.companionInfo);
      break;
    case "primaryChunk":
      await primaryFile.write(frame.data);
      break;
    case "companionChunk":
      await companionFile.write(frame.data);
      break;
  }
}
```

The first frame is `header`; regular files then emit `primaryChunk`, and Live Photos can also emit `companionChunk`. Breaking out cancels the download. Missing attachments throw `NotFoundError`. Non-ready attachments throw `ValidationError` with `ErrorCode.attachmentNotReady`; poll metadata until `transferState === "finished"`.

For HEIC conversion, use the dedicated [`../../heif2jpeg/SKILL.md`](../../heif2jpeg/SKILL.md) skill after downloading bytes.

Official source: <https://photon.codes/docs/advanced-kits/imessage/attachments>
