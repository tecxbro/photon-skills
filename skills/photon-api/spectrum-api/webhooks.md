<!-- openapi-tag: webhooks -->
# Spectrum API: webhooks

## Endpoint inventory

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/projects/{projectId}/webhooks/` | List registrations oldest first. Signing secrets are omitted. |
| `POST` | `/projects/{projectId}/webhooks/` | Register a public HTTPS URL. Returns the signing secret once. |
| `DELETE` | `/projects/{projectId}/webhooks/{webhookId}/` | Delete a registration. |

```bash
curl --user "$PROJECT_ID:$PROJECT_SECRET" \
  "https://spectrum.photon.codes/projects/$PROJECT_ID/webhooks/"
```

Registration rejects malformed URLs, duplicates, plain HTTP, redirects, private/link-local/metadata addresses, and unreachable destinations according to the current webhook policy. Persist the returned secret immediately. List responses cannot recover it.

There is no in-place secret-read endpoint. To rotate, deploy a newly registered secret and retire the old registration through a controlled replacement flow.

Use the separate `photon-webhooks` skill for signature verification, delivery retries, idempotency, and event payloads.

Official API page: <https://photon.codes/docs/api-reference/webhooks/list-webhooks>
