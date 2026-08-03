# Dashboard API

Use the current Dashboard OpenAPI as the source of truth. Do not derive Dashboard endpoints by translating CLI commands.

## Use this surface for

- account and dashboard-level project operations;
- device-login flows;
- operations explicitly described by the Dashboard OpenAPI.

## Prefer the CLI when

- a person is authenticating interactively;
- the workflow already has a documented `photon` command;
- browser/device authorization is required.

## Implementation rules

1. Inspect the current schema before coding an endpoint.
2. Generate or validate request and response types from OpenAPI.
3. Keep tokens in server-side secret storage.
4. Require confirmation before purchase, subscription, cancellation, deletion, or credential rotation.
5. Do not copy endpoint paths from old skills or CLI output.

Official OpenAPI: <https://photon.codes/docs/api-reference/dashboard-openapi.json>
