# Spectrum WhatsApp Business provider

Most applications should use this provider rather than the low-level WhatsApp SDK. Route to the separate `whatsapp-business` skill only for direct Meta features Spectrum does not expose.

## Direct credentials

```ts
import { whatsappBusiness } from "spectrum-ts/providers/whatsapp-business";

whatsappBusiness.config({
  accessToken: process.env.WA_TOKEN!,
  phoneNumberId: process.env.WA_NUMBER_ID!,
  appSecret: process.env.WA_SECRET!,
});
```

Environment fallbacks:

- `SPECTRUM_WHATSAPP_BUSINESS_ACCESS_TOKEN`
- `SPECTRUM_WHATSAPP_BUSINESS_PHONE_NUMBER_ID`
- `SPECTRUM_WHATSAPP_BUSINESS_APP_SECRET`

When both token and phone-number ID are available, empty config starts direct mode. A partial direct set falls back to project cloud mode. Cloud lines added while running appear after the next credential refresh; restart for immediate pickup.

## Conversations

```ts
const wa = whatsappBusiness(app);
const customer = await wa.user("15551234567");
const dm = await wa.space.create(customer);
```

WhatsApp IDs use international digits without the leading plus. The provider supports 1:1 spaces only and rejects group creation.

Use generic text, attachment, contact, location/custom content, replies, reactions, and read actions where supported. Free-form outbound messaging remains subject to Meta's customer-service window; use the low-level SDK skill for approved templates, Flows, product lists, and other direct Meta interactive APIs.

Official sources: <https://photon.codes/docs/spectrum-ts/providers/whatsapp-business/setup> and <https://photon.codes/docs/spectrum-ts/providers/whatsapp-business/conversations>
