# Native iMessage contact-card sharing

Use this for the bot account's own native iMessage contact card. Use generic `contact()` when sharing arbitrary structured contact data.

```ts
import { nativeContactCard, imessage } from "spectrum-ts/providers/imessage";

await space.send(nativeContactCard());

const im = imessage(space);
await im.shareContactCard();
```

This is useful for onboarding so recipients can save the bot line. It requires cloud mode; local mode throws `UnsupportedError`.

Official source: <https://photon.codes/docs/spectrum-ts/providers/imessage/messaging-features/contact-card-sharing>
