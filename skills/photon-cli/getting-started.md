# Photon CLI getting started

## Run or install

Use any current documented mode:

```bash
npx @photon-ai/cli --help
pnpx @photon-ai/cli --help
yarn dlx @photon-ai/cli --help
bunx @photon-ai/cli --help
```

A global package or standalone binary can be used when documented for the target OS. The `pho` shorthand is available only in installation modes that create that executable; do not assume every one-shot runner provides it.

## Authenticate

```bash
photon login
photon login --no-browser
photon whoami --json
photon auth status --json
```

The user must complete device authorization. In CI, use the documented token environment variable and avoid interactive login.

## Create and verify a project

```bash
photon projects create \
  --name "My App" \
  --location "United States" \
  --spectrum \
  --json

photon projects show --json
```

A project is not considered invalid merely because no dedicated line is listed. Verify the project resource itself and then inspect the provider resources the chosen plan actually exposes.

Official sources:

- <https://photon.codes/docs/cli/installation>
- <https://photon.codes/docs/cli/authentication>
- <https://photon.codes/docs/cli/projects>
