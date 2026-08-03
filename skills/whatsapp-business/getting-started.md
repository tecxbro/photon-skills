# WhatsApp Business getting started

Use Node.js 18+ or Bun. Install `@photon-ai/whatsapp-business` and obtain three credentials: `accessToken`, `phoneNumberId`, and `appSecret`.

## Credential routes

### Spectrum Cloud

Enable WhatsApp in the Photon project, complete the guided configuration, and copy the generated credentials.

### Bring your own Meta app

1. Create a Meta app with the WhatsApp product.
2. Copy the WhatsApp `phone_number_id`.
3. Create a permanent System User token with `whatsapp_business_messaging`, `whatsapp_business_management`, and `business_management`.
4. Copy the app secret.
5. Configure the Meta callback URL as `https://whatsapp-business.spectrum.photon.codes/webhook`, use any verify token for the handshake, and subscribe to `messages`.
6. Keep all three credentials in a secret manager.

```ts
import { createClient } from "@photon-ai/whatsapp-business";

await using client = createClient({
  accessToken: process.env.WA_ACCESS_TOKEN!,
  phoneNumberId: process.env.WA_PHONE_NUMBER_ID!,
  appSecret: process.env.WA_APP_SECRET!,
  retry: true,
});

await client.messages.send({
  to: "+15551234567",
  text: "Hello from the SDK!",
});
```

The managed event stream reconnects and recovers buffered events. Still persist cursors when implementing explicit missed-event recovery, and narrow both `event.type` and `event.message.content.type` before reading type-specific fields.

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/getting-started>
