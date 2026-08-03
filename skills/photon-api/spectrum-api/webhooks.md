# Spectrum API: webhooks

Use the current `webhooks` tag to register, list, and delete project webhook endpoints.

- Registration returns the signing secret only where documented.
- List responses do not include the signing secret.
- If a signing secret is lost, delete and re-register the endpoint when that is the documented recovery path.
- Treat deletion and replacement as configuration changes that can interrupt delivery.
- Runtime verification, retry, and deduplication belong in the [`photon-webhooks`](../../photon-webhooks/SKILL.md) skill.

Example list operation:

```text
GET /projects/{projectId}/webhooks/
```

Never claim a signing secret can be retrieved from a list response.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
