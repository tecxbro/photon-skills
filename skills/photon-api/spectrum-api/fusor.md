# Spectrum API: fusor

Use the current `fusor` OpenAPI tag for Fusor configuration and management. Do not infer its schema from similarly named internal services. Treat any credential-bearing or deployment-changing operation as sensitive.

For every request, consult the current OpenAPI and record:

- HTTP method and path;
- authentication;
- required path, query, and body fields;
- response envelope;
- pagination and rate-limit behavior;
- destructive, paid, or secret-bearing effects;
- related CLI and SDK surface.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
