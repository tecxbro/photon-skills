<!-- openapi-tag: whatsapp-business -->
# Spectrum API: WhatsApp Business

The management tag owns project WhatsApp Business onboarding and provider configuration. Runtime message sends, templates, Flows, media, and event streams belong in Spectrum or `@photon-ai/whatsapp-business`.

## Security boundary

Meta access tokens, app secrets, phone-number IDs, registration payloads, and webhook configuration are secrets or sensitive provider state. Keep all management calls server-side and redact response fields before logging.

## Current endpoint inventory

WhatsApp onboarding operations can change as Meta's Embedded Signup contract evolves. Extract the live methods, paths, and schemas before implementing or updating a flow:

```bash
node --input-type=module <<'NODE'
const spec = await fetch("https://spectrum.photon.codes/openapi/json").then(r => r.json());
for (const [path, item] of Object.entries(spec.paths)) for (const [method, op] of Object.entries(item)) {
  if (op?.tags?.includes("whatsapp-business")) console.log(method.toUpperCase(), path, op.summary ?? "");
}
NODE
```

Do not repurpose a Slack/iMessage line operation for WhatsApp. Dedicated WhatsApp line onboarding and removal have provider-specific billing behavior.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
