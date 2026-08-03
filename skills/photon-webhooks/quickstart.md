# Webhook quickstart

Register a URL with the current Spectrum API and store the returned signing secret. The list operation will not recover that secret later.

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

export async function POST(request: Request) {
  const raw = Buffer.from(await request.arrayBuffer());
  const timestamp = request.headers.get("x-spectrum-timestamp") ?? "";
  const supplied = request.headers.get("x-spectrum-signature") ?? "";
  const signed = `v0:${timestamp}:${raw.toString("utf8")}`;
  const expected = `v0=${createHmac("sha256", process.env.SPECTRUM_WEBHOOK_SECRET!)
    .update(signed)
    .digest("hex")}`;

  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("invalid signature", { status: 401 });
  }

  const payload = JSON.parse(raw.toString("utf8"));
  await enqueueOnce(payload);
  return new Response("ok");
}
```

Also reject stale timestamps before parsing. Test with an actual Photon delivery; a synthetic body is not enough to validate raw-body handling.

Official source: <https://photon.codes/docs/webhooks/quickstart>
