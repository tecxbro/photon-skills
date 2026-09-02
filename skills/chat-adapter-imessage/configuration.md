# Configuration

`createiMessageAdapter(options)` resolves Spectrum Cloud or self-hosted credentials from explicit options and environment variables. Local on-device mode has been removed; `local: true` throws, while `local: false` is accepted only as a deprecated no-op.

| Option | Mode | Environment fallback | Notes |
|---|---|---|---|
| `projectId` | Spectrum Cloud | `IMESSAGE_PROJECT_ID` | Cloud project ID. |
| `projectSecret` | Spectrum Cloud | `IMESSAGE_PROJECT_SECRET` | Cloud project secret. Never log it. |
| `credentials` | Spectrum Cloud | — | Sync or async provider returning `{ projectId, projectSecret }`; useful with a credential broker. |
| `serverUrl` | Self-hosted | `IMESSAGE_SERVER_URL` | gRPC `host:port`; not an HTTPS URL. A bare host uses port 443. |
| `apiKey` | Self-hosted | `IMESSAGE_API_KEY` | Token for the self-hosted endpoint. |
| `clients` | Self-hosted | — | Explicit `{ address, token, phone }[]` for multi-number setups. |
| `phone` | Self-hosted | `IMESSAGE_PHONE` | Optional routing identity for legacy single-client configuration. |
| `webhookSecret` | Cloud webhooks | `IMESSAGE_WEBHOOK_SECRET` | Per-webhook signing secret. |
| `webhookVerifier` | Cloud webhooks | — | Trusted-forwarder verifier; takes precedence over `webhookSecret`. |
| `logger` | Both | — | Adapter logger. |

## Spectrum Cloud

```ts
createiMessageAdapter({
  projectId: process.env.IMESSAGE_PROJECT_ID,
  projectSecret: process.env.IMESSAGE_PROJECT_SECRET,
});
```

Credentials may also be resolved lazily:

```ts
createiMessageAdapter({
  credentials: async () => {
    const value = await getSecret("photon/my-agent");
    return {
      projectId: value.projectId,
      projectSecret: value.projectSecret,
    };
  },
});
```

## Self-hosted current Advanced iMessage

```ts
createiMessageAdapter({
  serverUrl: process.env.IMESSAGE_SERVER_URL,
  apiKey: process.env.IMESSAGE_API_KEY,
});
```

`IMESSAGE_SERVER_URL` must be a gRPC address such as `imessage.example.com:443`, not an `https://` endpoint. Do not install the legacy Advanced iMessage package for this mode.

## Local macOS alternatives

For local on-device access, choose one of these instead of the Chat SDK adapter:

```bash
pnpm add spectrum-ts @spectrum-ts/imessage-local
# or
pnpm add @photon-ai/imessage-kit
```

Load the `spectrum` or `imessage` skill and follow that package's contract. Do not pass `local: true` to `createiMessageAdapter`.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
