# Spectrum platform narrowing

Each provider exports one callable that narrows an app, space, or message: `imessage`, `localIMessage`, `telegram`, `slack`, `terminal`, and `whatsappBusiness`.

## Narrow the app

```ts
import { imessage } from "spectrum-ts/providers/imessage";

const im = imessage(app);
const alice = await im.user("+15551234567");
const dm = await im.space.create(alice);
```

When the provider is not registered in the `providers` array, TypeScript resolves the narrowing call to `never`.

## Narrow a space or message

```ts
for await (const [space, message] of app.messages) {
  if (message.platform !== "imessage") continue;

  const imSpace = imessage(space);
  const imMessage = imessage(message);

  if (imSpace.type === "group") {
    console.log(imMessage.id);
  }
}
```

Gate on `message.platform` before narrowing. Narrowing a value from the wrong provider logs a structured runtime warning.

Local iMessage is a different platform ID: gate on `local_imessage` and use `localIMessage(...)`. Cloud or remote iMessage remains `imessage`.

Use generic content and Space methods by default. Narrow only for provider-specific fields, custom event streams, or creation parameters.

Official source: <https://photon.codes/docs/spectrum-ts/platform-narrowing>
