# Spectrum API: billing

Inspect plans, subscription state, checkout or portal operations, and other billing resources exposed by the current `billing` tag. Never execute a purchase, upgrade, cancellation, subscription, checkout, or portal mutation without explicit user confirmation.

For every request, consult the current OpenAPI and record:

- HTTP method and path;
- authentication;
- required path, query, and body fields;
- response envelope;
- pagination and rate-limit behavior;
- destructive, paid, or secret-bearing effects;
- related CLI and SDK surface.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
