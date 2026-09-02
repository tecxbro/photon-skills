# Verifying Spectrum webhook signatures

For every request:

1. Read the exact raw body before parsing JSON.
2. Reject timestamps more than five minutes from the current clock.
3. Compute `HMAC-SHA256(secret, "v0:" + timestamp + ":" + rawBody)`.
4. Prefix lowercase hex with `v0=`.
5. Compare in constant time.
6. Return `401` and stop when verification fails.

## Node / Express

```ts
import express from "express";
import { createHmac, timingSafeEqual } from "node:crypto";

const app = express();
const secret = process.env.SPECTRUM_SIGNING_SECRET!;

app.post("/spectrum-webhook", express.raw({ type: "application/json" }), (req, res) => {
  const raw = req.body.toString("utf8");
  const timestamp = req.header("X-Spectrum-Timestamp");
  const supplied = req.header("X-Spectrum-Signature");
  if (!timestamp || !supplied) return res.status(400).send("missing headers");

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 5 * 60) return res.status(400).send("stale timestamp");

  const expected = "v0=" + createHmac("sha256", secret)
    .update(`v0:${timestamp}:${raw}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).send("bad signature");
  }

  const event = JSON.parse(raw);
  enqueue(event);
  return res.status(202).send("accepted");
});
```

Mount raw middleware before a global JSON parser.

## Bun / Hono

```ts
app.post("/spectrum-webhook", async (c) => {
  const raw = await c.req.text();
  const timestamp = c.req.header("X-Spectrum-Timestamp");
  const supplied = c.req.header("X-Spectrum-Signature");
  if (!timestamp || !supplied) return c.text("missing headers", 400);

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return c.text("stale timestamp", 400);

  const expected = "v0=" + createHmac("sha256", secret)
    .update(`v0:${timestamp}:${raw}`).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(supplied);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return c.text("bad signature", 401);

  await enqueue(JSON.parse(raw));
  return c.text("accepted", 202);
});
```

## Python / FastAPI

```py
import hashlib, hmac, json, os, time
from fastapi import FastAPI, Header, HTTPException, Request

app = FastAPI()
secret = os.environ["SPECTRUM_SIGNING_SECRET"].encode()

@app.post("/spectrum-webhook")
async def webhook(request: Request,
    x_spectrum_timestamp: str = Header(None),
    x_spectrum_signature: str = Header(None)):
    raw = await request.body()
    if not x_spectrum_timestamp or not x_spectrum_signature:
        raise HTTPException(400, "missing headers")
    try:
        age = abs(int(time.time()) - int(x_spectrum_timestamp))
    except ValueError:
        raise HTTPException(400, "invalid timestamp")
    if age > 300:
        raise HTTPException(400, "stale timestamp")
    base = f"v0:{x_spectrum_timestamp}:{raw.decode('utf-8')}".encode()
    expected = "v0=" + hmac.new(secret, base, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, x_spectrum_signature):
        raise HTTPException(401, "bad signature")
    enqueue(json.loads(raw))
    return {"accepted": True}
```

## Go / net/http

```go
func handleWebhook(w http.ResponseWriter, r *http.Request) {
    raw, err := io.ReadAll(r.Body)
    if err != nil { http.Error(w, "read failed", 400); return }
    ts := r.Header.Get("X-Spectrum-Timestamp")
    supplied := r.Header.Get("X-Spectrum-Signature")
    unix, err := strconv.ParseInt(ts, 10, 64)
    if err != nil || abs(time.Now().Unix()-unix) > 300 {
        http.Error(w, "stale timestamp", 400); return
    }
    mac := hmac.New(sha256.New, []byte(os.Getenv("SPECTRUM_SIGNING_SECRET")))
    mac.Write([]byte("v0:" + ts + ":" + string(raw)))
    expected := "v0=" + hex.EncodeToString(mac.Sum(nil))
    if !hmac.Equal([]byte(expected), []byte(supplied)) {
        http.Error(w, "bad signature", 401); return
    }
    w.WriteHeader(http.StatusAccepted)
}
```

The signature string is 67 characters: `v0=` plus 64 lowercase hex characters. Do not log the secret or use parsed/re-serialized JSON as the signing input.

Official source: <https://photon.codes/docs/webhooks/verifying-signatures>
