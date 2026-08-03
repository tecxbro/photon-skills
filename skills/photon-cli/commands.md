# Photon CLI command reference

Reconstruct command usage from the current `--help` output and official command pages before scripting uncommon flags.

## Global checks

```bash
photon --help
photon --version
photon whoami --json
photon auth status --json
```

## Projects

Current project workflows include list, show, create, update/rename, open, delete, upgrade, and deliberate credential regeneration. Project creation uses `--name`, `--location`, and `--spectrum`.

Never invent a read-only secret subcommand. Obtain credentials through the documented project/dashboard flow. Treat regeneration as destructive because the previous secret stops working.

## Billing

Billing and portal operations can create, change, or cancel paid services. Ask for confirmation immediately before executing them.

## Profile and utilities

Use current documented profile fields and diagnostic commands. Verify aliases and JSON shapes against `--help`; do not infer them from SDK property names.

Official command pages:

- <https://photon.codes/docs/cli/projects>
- <https://photon.codes/docs/cli/billing>
- <https://photon.codes/docs/cli/profile-and-utilities>
