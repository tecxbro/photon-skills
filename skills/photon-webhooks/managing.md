# Managing Spectrum webhooks

All operations use Basic auth with `projectId` as username and `projectSecret` as password.

## Register

```bash
curl -X POST \
  -u "$PROJECT_ID:$PROJECT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"webhookUrl":"https://your-app.com/spectrum-webhook"}' \
  "https://spectrum.photon.codes/projects/$PROJECT_ID/webhooks/"
```

`POST /projects/{projectId}/webhooks/` returns `id`, URL, timestamps, and `signingSecret`. The secret is returned once. Save it before continuing.

Errors:

- `422`: malformed URL string.
- `409`: the same URL is already registered.
- `401`: invalid project credentials.

## List

```bash
curl -u "$PROJECT_ID:$PROJECT_SECRET" \
  "https://spectrum.photon.codes/projects/$PROJECT_ID/webhooks/"
```

`GET /projects/{projectId}/webhooks/` returns active registrations oldest first. It never returns signing secrets.

## Delete

```bash
curl -X DELETE \
  -u "$PROJECT_ID:$PROJECT_SECRET" \
  "https://spectrum.photon.codes/projects/$PROJECT_ID/webhooks/$WEBHOOK_ID/"
```

`DELETE /projects/{projectId}/webhooks/{webhookId}/` removes the registration. A missing ID returns `404`.

## Rotate or recover a lost secret

There is no in-place rotate or read-secret endpoint. Register a replacement URL, deploy its new secret, confirm deliveries, and then delete the old webhook. When the same URL cannot coexist because of the duplicate constraint, delete and immediately re-register during a controlled maintenance window.

Delivery requirements:

- Final URL must use HTTPS.
- It must resolve to a public address, not localhost, private, link-local, or cloud-metadata ranges.
- Redirects are fatal; register the final URL directly.

Official source: <https://photon.codes/docs/webhooks/managing-webhooks>
