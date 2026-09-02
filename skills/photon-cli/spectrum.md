# Spectrum resources in the Photon CLI

All commands require an active project through `--project <id>` or `PHOTON_PROJECT_ID`.

## Project Spectrum profile

```bash
photon spectrum profile show
photon spectrum profile show --json
photon spectrum profile update --display-name "Support Bot"
```

Alias: `spectrum profile edit`. Inspect the current profile before applying writes and update only fields the user requested.

## Users

```bash
photon spectrum users ls
photon spectrum users ls --json
photon spectrum users add
photon spectrum users remove <user-id>
```

Aliases:

- `users ls`: `users list`
- `users add`: `users create`
- `users remove`: `users rm`, `users delete`

Removing a user is irreversible and confirms unless `-y` is passed.

## Lines

```bash
photon spectrum lines ls
photon spectrum lines add
photon spectrum lines remove <line-id>
```

Aliases are `list`, `create`, `rm`, and `delete` where shown by current help. The current CLI adds iMessage lines. Adding or removing a dedicated line can change billing or service availability, so inspect the plan and require explicit confirmation immediately before execution.

## Platforms

```bash
photon spectrum platforms ls
photon spectrum platforms enable imessage
photon spectrum platforms disable telegram
```

Aliases: `platforms list` for `ls`. Validate platform names using current CLI output instead of guessing from SDK package names.

## Avatar

```bash
photon spectrum avatar upload ./logo.png
photon spectrum avatar upload ./logo.png --no-update-profile
```

The CLI requests a presigned upload URL, uploads the file, and normally updates the Spectrum profile. `--no-update-profile` performs the upload without switching the profile avatar.

## Common flags

| Flag | Environment | Purpose |
|---|---|---|
| `-p, --project <id>` | `PHOTON_PROJECT_ID` | Target project. |
| `--api-host <url>` | `PHOTON_API_HOST` | Backend. |
| `-t, --token <token>` | `PHOTON_TOKEN` | Explicit access token. |
| `--json` | - | Machine-readable output where supported. |

After every write, verify through the corresponding read-only `show`, `ls`, or `--json` command.

Official source: <https://photon.codes/docs/cli/spectrum>
