# Managing webhooks

Use the current Spectrum API to:

- register a public HTTPS URL;
- capture the one-time signing secret;
- list registrations;
- delete a registration;
- replace or re-register when rotating or recovering a lost secret;
- operate multiple endpoints intentionally.

List responses do not contain signing secrets. If the secret is lost, follow the documented delete-and-register recovery flow. Store secrets per webhook ID and do not reuse one secret across unrelated registrations.

Official source: <https://photon.codes/docs/webhooks/managing-webhooks>
