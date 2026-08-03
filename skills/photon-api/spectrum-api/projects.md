<!-- openapi-tag: projects -->
# Spectrum API: projects

The Spectrum `projects` tag owns project-scoped management state and project-secret lifecycle. Account-wide project creation and listing also exist in the Dashboard API; choose the surface based on the operation's documented authentication scheme.

## Safe operating rules

- Use Basic authentication only for operations defined by the Spectrum OpenAPI.
- Read project state before mutation and verify after mutation.
- Require explicit confirmation before project deletion or project-secret rotation.
- Secret rotation replaces the credential immediately; it is never a read operation.
- Do not infer Spectrum paths from similarly named Dashboard or CLI commands.

## Inspect the exact current inventory

```bash
node --input-type=module <<'NODE'
const spec = await fetch("https://spectrum.photon.codes/openapi/json").then(r => r.json());
for (const [path, item] of Object.entries(spec.paths)) {
  for (const [method, op] of Object.entries(item)) {
    if (op?.tags?.includes("projects")) console.log(method.toUpperCase(), path, "-", op.summary);
  }
}
NODE
```

For each operation, read the live body and response schema before constructing a request. Destructive calls must be single-attempt unless the operation exposes an idempotency key.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
