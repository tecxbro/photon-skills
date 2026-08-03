# Photon API overview

## Spectrum API

- Base URL: `https://spectrum.photon.codes`.
- HTTPS only.
- Management plane for projects, webhooks, platforms, lines, users, billing, and provider configuration.
- Project endpoints use Basic authentication with `base64(projectId:projectSecret)` where documented.
- Success responses use a `{ "succeed": true, "data": ... }` envelope.
- Error responses and status codes must be handled explicitly.
- Default limit: 5 requests per second per project; a `429` indicates throttling.
- Pagination and request fields must be taken from the current OpenAPI schema for the endpoint.

```bash
curl --fail-with-body \
  --user "$PHOTON_PROJECT_ID:$PHOTON_PROJECT_SECRET" \
  "https://spectrum.photon.codes/projects/$PHOTON_PROJECT_ID/webhooks/"
```

Use placeholder credentials in examples. Do not assume that a management endpoint sends messages.

## Dashboard API

The Dashboard API uses its own current OpenAPI and account authentication model. Prefer the Photon CLI for human-driven account workflows. Prefer a generated client or schema-validated HTTP wrapper for automation.

Official sources:

- <https://photon.codes/docs/api-reference/introduction>
- <https://photon.codes/docs/api-reference/rate-limit>
- <https://photon.codes/docs/api-reference/dashboard-openapi.json>
- <https://spectrum.photon.codes/openapi/json>
