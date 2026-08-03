# Verifying webhook signatures

The signed value is:

```text
v0:{timestamp}:{rawBody}
```

The signature header is `v0=` followed by the lowercase HMAC-SHA256 hex digest.

## Required rules

- Use the exact raw request bytes.
- Reconstruct the signed value exactly.
- Reject malformed headers.
- Reject timestamps outside the documented freshness window.
- Compare in constant time.
- Verify before JSON parsing.
- Never log the signing secret.

## Node.js

Use `createHmac("sha256", secret)` over the exact `v0:{timestamp}:{rawBody}` byte sequence, prefix the lowercase hex digest with `v0=`, and compare equal-length buffers with `timingSafeEqual`.

## Bun

Use `Bun.CryptoHasher("sha256", secret)`, update it with the same signed byte sequence, and compare the prefixed hex digest in constant time.

## Python

Use `hmac.new(secret.encode(), signed_bytes, hashlib.sha256).hexdigest()` and `hmac.compare_digest`.

## Go

Use `hmac.New(sha256.New, []byte(secret))`, write the signed bytes, encode the digest as lowercase hex, prefix it with `v0=`, and compare with `hmac.Equal`.

Official source: <https://photon.codes/docs/webhooks/verifying-signatures>
