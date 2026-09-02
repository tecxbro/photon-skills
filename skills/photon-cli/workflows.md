# Photon CLI workflows

Each workflow ends with a non-destructive verification. Never rotate credentials, delete resources, add paid lines, or open checkout without the user's explicit authorization.

## Install and authenticate

```bash
npx @photon-ai/cli@latest --version
npx @photon-ai/cli login --no-browser
npx @photon-ai/cli whoami
```

After browser approval, `whoami` must report the expected account and backend.

## Create a Spectrum-enabled project

```bash
PROJECT_ID=$(photon projects create \
  --name "My App" \
  --location us-east \
  --spectrum \
  --json | jq -r '.id')

export PHOTON_PROJECT_ID="$PROJECT_ID"
photon projects show --json
photon spectrum profile show --json
```

Do not require `lines ls` to return a project-owned line as proof that creation succeeded; shared and dedicated plans expose different line resources.

## Inspect resources safely

```bash
photon projects show --json
photon spectrum profile show --json
photon spectrum users ls --json
photon spectrum lines ls --json
photon spectrum platforms ls --json
photon billing show --json
```

Use this inventory before deciding whether a requested write is needed.

## CI authentication

```bash
PHOTON_TOKEN="$PHOTON_TOKEN" \
PHOTON_PROJECT_ID="$PHOTON_PROJECT_ID" \
photon projects show --json
```

Set the token and project ID through the CI secret and variable system. Confirm `photon env current`; a backend mismatch can look like an invalid token.

## Non-default backend

```bash
photon login --api-host https://staging-app.photon.codes --no-browser
PHOTON_API_HOST=https://staging-app.photon.codes photon whoami
PHOTON_API_HOST=https://staging-app.photon.codes photon projects ls --json
```

Credentials are separate per backend.

## Rotate a project secret safely

1. Confirm the user intends to invalidate the current secret.
2. Inventory every deployment and secret store using it.
3. Prepare a coordinated rollout and rollback path.
4. Run `photon projects regenerate-secret [id]`.
5. Capture the new value without logging it.
6. Update all secret stores and redeploy.
7. Verify each integration with a read-only SDK or API operation.

Do not use rotation to discover an existing secret. The current CLI does not expose a read-only project-secret retrieval subcommand.

## Paid upgrade or billing portal

```bash
photon billing plans
photon billing show --json
# After explicit confirmation only:
photon projects upgrade business --qty 1 --no-browser --json
# or
photon billing manage --no-browser
```

Present the exact tier, quantity, and action before execution. Downgrade, cancellation, and payment-method changes happen through the Stripe Portal.

## Troubleshoot unauthorized or project-not-found

1. Run `photon env current`.
2. Run `photon whoami` against the same backend.
3. Check `--project` and `PHOTON_PROJECT_ID` precedence.
4. Inspect `photon config show --json` without exposing secrets.
5. Verify project membership with `photon projects ls --json`.
6. Reauthenticate only if the session is expired.

Do not create a replacement project until the mismatch is understood.

Official sources:

- <https://photon.codes/docs/cli/authentication>
- <https://photon.codes/docs/cli/projects>
- <https://photon.codes/docs/cli/spectrum>
- <https://photon.codes/docs/cli/billing>
