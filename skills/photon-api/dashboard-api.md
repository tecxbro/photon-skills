# Photon Dashboard API

The Dashboard API manages account-owned projects and implements the CLI device-login flow. Its OpenAPI source is `api-reference/dashboard-openapi.json` in `photon-hq/docs`.

## Endpoint inventory

| Method | Path | Authentication | Purpose |
|---|---|---|---|
| `GET` | `/api/projects/` | Bearer | List projects visible to the signed-in account. |
| `POST` | `/api/projects/` | Bearer | Create a project. |
| `GET` | `/api/projects/{id}` | Bearer | Get one project. |
| `POST` | `/api/auth/device/code` | None | Start RFC 8628-style device authorization. |
| `POST` | `/api/auth/device/token` | None | Poll for approval and receive the access token. |

## Project creation

The current body includes project name plus optional location and product selections documented by the schema. The response project can include `id`, `name`, `location`, platform state, `spectrumProjectId`, and `projectSecret` where the authenticated flow is allowed to expose it.

Treat `projectSecret` as a server credential. Capture it only into a secret store and redact it from output. Do not infer CLI flags directly from OpenAPI field names; the CLI command surface is separately documented.

## Device login

```text
POST /api/auth/device/code
→ device_code, user_code, verification_uri, verification_uri_complete, expires_in, interval

POST /api/auth/device/token
→ authorization_pending | slow_down | expired_token | access_denied | access token
```

Poll no faster than the returned interval. Increase the delay when the server returns `slow_down`, stop after expiry, and never request the user's dashboard password.

## Choosing Dashboard API versus CLI

Use the CLI for interactive setup or ordinary scripts. Use the Dashboard API when implementing a custom authenticated client, device-flow integration, or account-level project management. Do not replace the Spectrum Basic-auth project API with a Dashboard bearer token unless the specific OpenAPI operation says so.

Official source: <https://photon.codes/docs/api-reference/dashboard-openapi.json>
