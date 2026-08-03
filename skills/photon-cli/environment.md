# Photon CLI environment and authentication precedence

Document and verify the current:

- device authorization and no-browser flows;
- credential storage under the platform’s XDG-compatible config path;
- migration from older credential locations when officially supported;
- CI token;
- project selection;
- API/backend host selection;
- precedence between explicit flags, environment variables, stored credentials, and defaults.

Do not add undocumented aliases. Redact tokens and project secrets in logs. A backend switch can make a valid token appear unauthorized against the wrong host, so report the selected backend during troubleshooting without printing credentials.

Official source: <https://photon.codes/docs/cli/authentication>
