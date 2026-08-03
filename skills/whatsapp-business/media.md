# WhatsApp Business media

## Upload

```ts
const { mediaId } = await client.media.upload({
  file: await readFile("photo.jpg"),
  mimeType: "image/jpeg",
  filename: "photo.jpg",
});
```

`file` accepts `Buffer | Uint8Array`. For files that do not fit safely in memory, stream and bound the file yourself before calling the SDK. Uploaded media IDs typically expire after about 30 days.

## Resolve an inbound media URL

```ts
const { url, mimeType, fileSize, sha256 } = await client.media.getUrl(mediaId);
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}` },
});
if (!response.ok) throw new Error(`media download failed: ${response.status}`);
const bytes = await response.arrayBuffer();
```

The Meta-signed URL is time-limited and still requires the access token in the `Authorization` header. Apply a size limit before loading bytes and verify the returned digest where appropriate.

## Delete

```ts
await client.media.delete(mediaId);
```

Deletion is optional if natural expiration meets the product requirement, but use it for immediate compliance or storage cleanup.

## Common MIME categories

| Category | Common types |
|---|---|
| Image | `image/jpeg`, `image/png` |
| Video | `video/mp4`, `video/3gpp` |
| Audio | `audio/aac`, `audio/mp4`, `audio/mpeg`, `audio/amr`, `audio/ogg` |
| Document | PDFs, spreadsheets, archives, and other document MIME types |
| Sticker | `image/webp` |

Meta enforces current size and format limits server-side. Do not hard-code a stale limit table; consult Meta's current limits for the account tier.

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/media>
