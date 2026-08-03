# Spectrum API authentication and errors

## Authentication

Where documented, send HTTP Basic authentication with the project ID as username and project secret as password:

```ts
const credentials = Buffer.from(
  `${process.env.PHOTON_PROJECT_ID}:${process.env.PHOTON_PROJECT_SECRET}`,
).toString("base64");

const response = await fetch(
  `https://spectrum.photon.codes/projects/${process.env.PHOTON_PROJECT_ID}/webhooks/`,
  { headers: { Authorization: `Basic ${credentials}` } },
);
```

Never log the `Authorization` header, project secret, signing secret, access token, or provider token.

## Response handling

- Parse the `{ succeed, data }` envelope only after checking the HTTP status and content type.
- Treat `401` and `403` as credential or authorization failures, not retryable network errors.
- Handle `404` as a missing resource or wrong project scope.
- Handle `409` according to the endpoint's documented conflict semantics.
- Back off on `429`; the default project-wide ceiling is 5 requests per second.
- Retry transient `5xx` failures only for idempotent operations or with an idempotency strategy.

Secret rotation immediately invalidates old credentials. Require explicit confirmation and a rollout plan before rotating.

Official sources: <https://photon.codes/docs/api-reference/introduction> and <https://photon.codes/docs/api-reference/rate-limit>
