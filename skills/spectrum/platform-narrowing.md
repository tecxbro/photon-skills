# Platform narrowing

Use generic Spectrum primitives until a platform-specific field or action is required.

Narrow against the current provider helpers for:

- iMessage
- WhatsApp Business
- Telegram
- Slack
- Terminal
- Voice, where the call object supports narrowing

After narrowing, keep provider-specific values within the smallest possible scope. Never cast a generic Message or Space merely to access an undocumented field. Prefer a generic content builder when it expresses the requested behavior.

Official source: <https://photon.codes/docs/spectrum-ts/platform-narrowing>
