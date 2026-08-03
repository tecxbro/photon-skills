<!-- openapi-tag: billing -->
# Spectrum API: billing

Billing operations inspect or change subscription state, plan, quantity, checkout, or customer-portal access. Treat every write as consequential.

## Execution boundary

1. Fetch current subscription and available plan data.
2. Explain the exact tier, quantity, interval, immediate proration, and browser/portal transition.
3. Ask for explicit confirmation immediately before the write.
4. Execute once.
5. Verify the returned subscription or billing state.

Never retry a checkout, purchase, upgrade, downgrade, cancellation, or quantity change automatically after an ambiguous timeout. Reconcile current subscription state first.

## Current endpoint inventory

The live `billing` OpenAPI tag is authoritative because Stripe-backed routes and price identifiers can change. Extract the current methods and paths before automation:

```bash
node --input-type=module <<'NODE'
const spec = await fetch("https://spectrum.photon.codes/openapi/json").then(r => r.json());
for (const [path, item] of Object.entries(spec.paths)) for (const [method, op] of Object.entries(item)) {
  if (op?.tags?.includes("billing")) console.log(method.toUpperCase(), path, op.summary ?? "");
}
NODE
```

Do not embed raw Stripe price IDs into reusable skills unless the user supplied and approved that exact ID.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
