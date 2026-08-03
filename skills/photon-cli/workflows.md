# Photon CLI workflows

Each workflow ends with a non-destructive verification.

## Install and authenticate

Run the CLI through a documented installation mode, complete device authorization, then run `photon whoami --json`.

## Create a Spectrum-enabled project

Run `projects create` with `--name`, `--location`, `--spectrum`, and `--json`; capture the returned project ID; verify with `projects show --json`.

## Configure credentials

Obtain project credentials through the current dashboard/project flow. Do not rotate merely to read. Store them in a secret manager and verify with a read-only SDK/API request.

## Inspect resources

Use project show/list and Spectrum profile/users/lines/platforms/avatar read commands; finish with the relevant `--json` read.

## Upgrade or billing

Explain the exact cost-bearing action and ask for confirmation. After execution, verify the current plan or billing status.

## Non-default backend

Set the documented backend selector, authenticate against that backend, and verify with `whoami`.

## CI authentication

Use the documented CI token, disable interactivity, and verify with a read-only command. Never print the token.

## Rotate a project secret safely

Confirm that the user intends to invalidate the current secret. Inventory every deployment using it, run `projects regenerate-secret`, update all secret stores, redeploy, and verify before removing rollback access.

## Unauthorized or project-not-found

Check token/backend precedence, selected project ID, account membership, and JSON error output. Do not create a replacement project until the mismatch is understood.
