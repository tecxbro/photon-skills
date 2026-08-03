# Photon CLI command reference

Run `photon <command> --help` before scripting uncommon flags. Global flags must appear before or at the root command; command-specific flags belong after the subcommand.

## Root command tree

```text
photon
├── ping
├── env current
├── login
├── logout
├── whoami
├── auth status
├── config show
├── profile show | init | update
├── projects ls | show | create | update | delete
│   ├── regenerate-secret | open | upgrade | check-phone
├── spectrum profile show | update
│   ├── users ls | add | remove
│   ├── lines ls | add | remove
│   ├── platforms ls | enable | disable
│   └── avatar upload
└── billing plans | show | checkout | manage
```

## Global flags

| Flag | Environment | Meaning |
|---|---|---|
| `--debug` | `PHOTON_DEBUG=1` | Verbose request and response logs to stderr. Ensure secrets remain redacted. |
| `--version`, `-v` | - | Print the CLI version. |
| `--no-color` | `NO_COLOR=1` | Disable color output. |

Common command-level flags include `--api-host`, `--project`, `--token`, `--json`, `--yes`, and `--no-browser`.

## Projects

```bash
photon projects ls --json
photon projects show [id] --json
photon projects create --name "My Project" --location us-east --spectrum --json
photon projects update [id] --name "New Name"
photon projects open [id] --no-browser
photon projects check-phone +15551234567
```

Aliases:

- `project ls`, `projects list`
- `projects show`: `projects get`
- `projects create`: `projects new`
- `projects update`: `projects edit`, `projects set`
- `projects delete`: `projects rm`, `projects remove`
- `projects regenerate-secret`: `projects rotate-secret`

Destructive operations:

```bash
photon projects delete [id]       # permanent; confirms
photon projects delete [id] -y    # skips confirmation
photon projects regenerate-secret [id]  # invalidates old secret
```

There is no documented read-only `projects secret` command. Obtain credentials through the current project or dashboard flow. Treat regeneration as a credential rotation.

## Subscription routing

```bash
photon projects upgrade
photon projects upgrade pro
photon projects upgrade [id] business --qty 5
photon projects upgrade --checkout
photon projects upgrade --manage
photon projects upgrade --plan price_xxx
```

`--manage` takes precedence over tier, plan, and checkout flags. Paid changes, checkout, cancellation, downgrade, and portal actions require explicit user confirmation.

## Billing

```bash
photon billing plans
photon billing show --json
photon billing checkout
photon billing checkout pro
photon billing checkout business --qty 5
photon billing checkout --plan price_xxx --no-browser --json
photon billing manage --no-browser
```

`billing manage` is also `billing portal`.

## Profiles and diagnostics

```bash
photon profile show
photon profile init
photon profile update --display-name "Jane Doe"
photon ping
photon ping -u https://custom.example.com
photon env current
photon whoami
photon auth status --json
photon config show --json
```

`config show` must not print secrets. It reports the config directory, resolved backend, active project, and relevant environment selection.

Official sources:

- <https://photon.codes/docs/cli/overview>
- <https://photon.codes/docs/cli/projects>
- <https://photon.codes/docs/cli/billing>
- <https://photon.codes/docs/cli/profile-and-utilities>
