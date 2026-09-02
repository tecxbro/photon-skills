# Receiving messages

## Signed webhook

Use Spectrum Cloud webhooks for serverless routes. Configure `IMESSAGE_WEBHOOK_SECRET` unless a trusted `webhookVerifier` is supplied, preserve the original request, and hand the `Request` directly to the Chat SDK webhook router:

```ts
import { after } from "next/server";
import { bot } from "@/lib/bot";

export async function POST(request: Request): Promise<Response> {
  return bot.webhooks.imessage(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

The adapter verifies the delivery, parses the Spectrum event, rebuilds the Chat SDK message/thread, and routes it to the bot. A trusted `webhookVerifier` takes precedence over `webhookSecret`; reject the request when that verifier throws or returns a falsy value.

Acknowledge quickly. Spectrum Cloud retries failed deliveries and provides at-least-once delivery, so deduplicate side effects using the webhook delivery ID together with `message.id` when exactly-once behavior matters.

Webhook deliveries can reply without a live gateway connection because the adapter rebuilds the conversation from its chat GUID. With several configured iMessage lines, an unseen thread may not have enough routing information; use a thread observed through the gateway when the adapter reports that boundary.

## Gateway listener

Use a gateway listener when a process can keep a live Spectrum stream open:

```ts
return bot.adapters.imessage.startGatewayListener(
  { waitUntil: (task) => after(() => task) },
  600_000,
);
```

For serverless deployments, protect the listener route with an authorization secret and schedule overlapping invocations so a replacement starts before the preceding listener expires.

| Environment | Preferred receiving mode |
|---|---|
| Serverless route | Signed Spectrum Cloud webhook |
| Long-running worker | Gateway listener |
| Local development against cloud | Gateway listener or a tunnelled cloud webhook |
| Existing Chat SDK bot | The bot's registered iMessage adapter webhook |

Do not run duplicate receivers without idempotent processing. Local on-device receiving is not supported by this adapter; use `@spectrum-ts/imessage-local` or `@photon-ai/imessage-kit` instead.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
