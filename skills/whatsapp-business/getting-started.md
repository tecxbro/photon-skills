# WhatsApp Business getting started

Most apps should use Spectrum. Use `@photon-ai/whatsapp-business` when the requested direct Meta behavior is not exposed by Spectrum.

## Requirements

- Node.js 18+ or Bun.
- `accessToken`, `phoneNumberId`, and `appSecret`.
- Either Spectrum Cloud guided configuration or a Meta app configured for WhatsApp Business.

```bash
npm install @photon-ai/whatsapp-business
```

For a bring-your-own Meta app, use a permanent System User token rather than the temporary token from API Setup. Required scopes are `whatsapp_business_messaging`, `whatsapp_business_management`, and `business_management`. Configure the Meta webhook callback as `https://whatsapp-business.spectrum.photon.codes/webhook`, subscribe to `messages`, and keep the app secret private.

## Client

```ts
import { createClient } from "@photon-ai/whatsapp-business";

const client = createClient({
  accessToken: process.env.WA_ACCESS_TOKEN!,
  phoneNumberId: process.env.WA_PHONE_NUMBER_ID!,
  appSecret: process.env.WA_APP_SECRET!,
  retry: true,
  timeout: 10_000,
});

try {
  await client.messages.send({ to: "+15551234567", text: "Hello" });
} finally {
  await client.close();
}
```

The client exposes `messages`, `events`, and `media`. It also implements `Symbol.asyncDispose`, so `await using` is supported by compatible runtimes.

## Echo bot

```ts
for await (const event of client.events.subscribe()) {
  if (event.type !== "message") continue;
  if (event.message.content.type !== "text") continue;

  await client.messages.send({
    to: event.message.from,
    text: event.message.content.body,
  });
}
```

Always narrow both `event.type` and `message.content.type`. Persist event cursors only after successful processing so reconnect and missed-event recovery remain correct.

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/getting-started>
