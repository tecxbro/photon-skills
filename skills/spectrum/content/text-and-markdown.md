# Spectrum text and Markdown

## Plain text

```ts
import { text } from "spectrum-ts";
await space.send(text("Hello"));
await space.send("Hello");
```

## Markdown

```ts
import { markdown } from "spectrum-ts";
await space.send(markdown("**Bold** and _italic_."));
```

Spectrum supports CommonMark plus GFM tables and strikethrough. Providers translate to native formatting: Telegram uses HTML parsing and remote iMessage uses UTF-16 formatting ranges. Unsupported providers receive readable plain text. Inbound formatting always surfaces as `text`, not `markdown`.

## Streaming

Both `text()` and `markdown()` accept:

- a Vercel AI SDK `streamText()` result or its `.textStream`;
- an `AsyncIterable`;
- a `ReadableStream`;
- a custom stream with `{ extract(chunk) }`.

```ts
const result = aiStreamText({ model, prompt });
await space.send(text(result));

await space.send(markdown(customStream, {
  extract: (chunk) => chunk.delta?.text ?? null,
}));
```

Remote iMessage sends the first chunk then edits in place. Telegram private chats can animate a draft. Providers without streaming wait and send the accumulated result once. A stream source is single-use and cannot be sent twice.

Official sources: <https://photon.codes/docs/spectrum-ts/content/text> and <https://photon.codes/docs/spectrum-ts/content/markdown>
