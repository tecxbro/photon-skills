# Spectrum API: projects

Inspect and manage project records exposed by the Spectrum API. Require explicit confirmation before project deletion or project-secret rotation. A secret-rotation operation replaces the existing credential; it is not a read operation.

For every request, consult the current OpenAPI and record:

- HTTP method and path;
- authentication;
- required path, query, and body fields;
- response envelope;
- pagination and rate-limit behavior;
- destructive, paid, or secret-bearing effects;
- related CLI and SDK surface.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
