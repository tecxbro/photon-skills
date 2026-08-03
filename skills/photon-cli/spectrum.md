# Spectrum resources in the CLI

Manage the current project’s:

- profile;
- users;
- lines;
- platforms;
- avatar.

Use current CLI field names such as `--display-name`. Do not reuse SDK Space, User, or profile property names unless the CLI help shows the same spelling.

Read-only pattern:

```bash
photon spectrum profile show --json
photon spectrum users list --json
photon spectrum lines list --json
photon spectrum platforms list --json
```

Before a write, inspect the current resource, apply only requested fields, and verify with a read-only show/list command. Confirm before adding/removing paid or dedicated resources.

Official source: <https://photon.codes/docs/cli/spectrum>
