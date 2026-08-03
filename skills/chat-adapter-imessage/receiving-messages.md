# Receiving messages

## Signed webhook

Use Spectrum Cloud webhooks for serverless routes. Configure `IMESSAGE_WEBHOOK_SECRET`, preserve the request body, and hand the `Request` directly to the adapter:

```ts
import { after } from "next/server";
import { bot } from "@/lib/bot";

export async function POST(request: Request): Promise<Response> {
  return bot.webhooks.imessage(request, {
    waitUntil: (task) => after(() => task),
  });
}
```

The adapter verifies the signature, rejects stale deliveries, parses the event, and routes it to the bot. Return quickly. Spectrum delivers at least once, so deduplicate side effects with the webhook delivery ID and message ID.

## Gateway listener

Use a gateway listener when a process can keep a live Spectrum stream open:

```ts
return bot.adapters.imessage.startGatewayListener(
  { waitUntil: (task) => after(() => task) },
  600_000,
);
```

| Environment | Preferred receiving mode |
|---|---|
| Serverless route | Webhook |
| Long-running worker | Gateway listener |
| Local development | Local listener or tunnelled webhook |
| Existing Chat SDK bot | The bot's registered adapter webhook |

Do not run duplicate receivers without deduplication. Group replies are session-bound and may require the gateway to have observed the group in the current session.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
