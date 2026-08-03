# Configuration

`createiMessageAdapter(options)` auto-detects its mode from options and environment variables.

| Option | Mode | Environment fallback | Notes |
|---|---|---|---|
| `local` | All | `IMESSAGE_LOCAL` | Defaults local unless remote credentials are present or `local: false`. |
| `projectId` | Spectrum Cloud | `IMESSAGE_PROJECT_ID` | Cloud project ID. |
| `projectSecret` | Spectrum Cloud | `IMESSAGE_PROJECT_SECRET` | Cloud project secret. Never log it. |
| `serverUrl` | Self-hosted | `IMESSAGE_SERVER_URL` | gRPC `host:port`; not an HTTPS URL. |
| `apiKey` | Self-hosted | `IMESSAGE_API_KEY` | Token for the self-hosted endpoint. |
| `clients` | Self-hosted | — | Explicit `{ address, token, phone }[]` for multi-number setups. |
| `phone` | Self-hosted | `IMESSAGE_PHONE` | Optional routing identity. |
| `webhookSecret` | Cloud webhooks | `IMESSAGE_WEBHOOK_SECRET` | Per-webhook signing secret. |
| `logger` | All | — | Adapter logger. |

## Cloud

```ts
createiMessageAdapter({
  local: false,
  projectId: process.env.IMESSAGE_PROJECT_ID,
  projectSecret: process.env.IMESSAGE_PROJECT_SECRET,
});
```

## Self-hosted current Advanced iMessage

```ts
createiMessageAdapter({
  local: false,
  serverUrl: process.env.IMESSAGE_SERVER_URL,
  apiKey: process.env.IMESSAGE_API_KEY,
});
```

Do not install the legacy Advanced iMessage package for this mode.

## Local macOS

```ts
createiMessageAdapter({ local: true });
```

Local mode requires macOS, iMessage signed in, and Full Disk Access for the process reading the Messages database.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
