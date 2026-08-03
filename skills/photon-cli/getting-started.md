# Photon CLI getting started

The Photon CLI manages projects, Spectrum resources, billing, and profiles. Use the Spectrum SDK for runtime agent behavior and the Spectrum API for direct HTTPS management automation.

## Runtime and one-off execution

The CLI requires Node.js 18+ when run from npm. One-off runners fetch the current release automatically:

```bash
npx @photon-ai/cli login
pnpx @photon-ai/cli projects ls
yarn dlx @photon-ai/cli whoami
bunx @photon-ai/cli projects ls --json
```

Use `@latest` when you need to bypass a cached one-off version:

```bash
npx @photon-ai/cli@latest --version
```

## Global installation

```bash
npm install -g @photon-ai/cli
# or: pnpm add -g / yarn global add / bun add -g

photon --version
photon ping
```

The `pho` alias is created for global installs after `photon` runs. One-off `npx`, `pnpx`, `yarn dlx`, and `bunx` commands do not create it.

## Standalone binaries

Prebuilt binaries are published for macOS and Linux on `arm64` and `x64` with matching `.sha256` checksums. Verify the checksum before installation. Standalone installs have no Node runtime dependency.

## Updates

- Global package: run the package manager's global update command.
- Standalone binary: download and verify the new release again.
- One-off runner: use `@latest` if cache freshness matters.
- Set `PHOTON_NO_UPDATE_NOTIFIER=1` to suppress update notifications.

## Authenticate

```bash
photon login
photon login --no-browser
photon whoami
photon auth status --json
```

The device flow requires a person to approve the browser request. Do not ask the user for a password or copy credentials into chat.

## Create and verify a Spectrum project

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

Use the exact location values accepted by the current CLI. Project creation does not imply that a dedicated line is assigned. Inspect the project and plan-specific resources separately.

> `photon projects regenerate-secret` rotates the Spectrum API secret and invalidates the previous value immediately. Never run it merely to inspect credentials.

Official sources:

- <https://photon.codes/docs/cli/overview>
- <https://photon.codes/docs/cli/installation>
- <https://photon.codes/docs/cli/authentication>
- <https://photon.codes/docs/cli/projects>
