# Spectrum API: Slack

Use the current `slack` tag for Slack app configuration and installation management.

> **Security boundary:** the documented installation-list response can contain plaintext bot tokens and refresh tokens. Call it only from trusted server-side environments. Never return that payload to a browser, log it, paste it into an issue, or store it unencrypted.

Verify every path and response against the current OpenAPI. Redact token fields before diagnostics. Require confirmation before removing an active installation or changing app configuration in a way that interrupts events.

Official OpenAPI: <https://spectrum.photon.codes/openapi/json>
