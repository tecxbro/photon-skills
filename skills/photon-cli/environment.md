# Photon CLI authentication and environment

## Device authorization

```bash
photon login
photon login --no-browser
photon whoami
photon logout
```

`login` opens a browser approval flow; `--no-browser` prints the URL for headless hosts. `logout` revokes the active backend session and deletes the local credential file.

## Credential storage

Credential JSON files use file mode `600` and live at:

```text
$PHOTON_CONFIG_DIR/credentials/<backend-key>.json
```

Config directory resolution:

1. `PHOTON_CONFIG_DIR`
2. `$XDG_CONFIG_HOME/photon`
3. `~/.config/photon/`

A legacy `~/.config/photon-dashboard/` directory is migrated automatically on first run when present.

Credentials are stored per backend. Production, staging, and localhost can be authenticated simultaneously. Inspect all stored backend states with:

```bash
photon auth status
photon auth status --json
```

## Backend resolution

```bash
export PHOTON_API_HOST=https://staging-app.photon.codes
photon projects ls

photon projects ls --api-host https://staging-app.photon.codes
photon env current
```

Precedence: `--api-host` > `PHOTON_API_HOST` > `https://app.photon.codes`.

## Project resolution

```bash
photon spectrum users ls --project "$PROJECT_ID"
export PHOTON_PROJECT_ID="$PROJECT_ID"
photon spectrum users ls
```

Precedence: `--project` > `PHOTON_PROJECT_ID` > error with a hint.

## Token resolution and CI

```bash
PHOTON_TOKEN="$TOKEN" photon projects ls --json
photon projects ls --token "$PHOTON_TOKEN" --json
```

Precedence: `--token` > `PHOTON_TOKEN` > stored credential for the selected backend. `PHOTON_TOKEN` is the device-flow access token and currently has a default seven-day expiry; reauthenticate when it expires. A long-lived API-key path is not currently documented as available.

CI rules:

- Store the token in the CI secret store.
- Use `--json` for parsing.
- Never echo the token or upload the credential file as an artifact.
- Confirm `photon env current` when a valid token appears unauthorized; backend mismatch is a common cause.
- Avoid `--yes` unless the user explicitly authorized the destructive operation.

Official source: <https://photon.codes/docs/cli/authentication>
