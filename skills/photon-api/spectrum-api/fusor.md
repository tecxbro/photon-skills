<!-- openapi-tag: fusor -->
# Spectrum API: Fusor

Fusor is Spectrum's webhook/event transport used by providers and custom integrations. The management API issues short-lived Fusor authorization material; it does not replace project credentials.

## Operation

The current tag exposes **Issue Fusor token**. Call it with project Basic auth, capture the token and TTL from the response, and keep it server-side. Cache only until expiry and refresh before a long-lived consumer reconnects.

Because token path and response fields are generated from the current OpenAPI, inspect them before implementing a new client:

```bash
node --input-type=module <<'NODE'
const spec = await fetch("https://spectrum.photon.codes/openapi/json").then(r => r.json());
for (const [path, item] of Object.entries(spec.paths)) for (const [method, op] of Object.entries(item)) {
  if (op?.tags?.includes("fusor")) console.log(method.toUpperCase(), path, op.summary ?? "");
}
NODE
```

Never log the issued token, put it in browser code, or confuse it with the long-lived project secret.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
