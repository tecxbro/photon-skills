# Spectrum getting started

Spectrum is the default Photon SDK for new messaging agents. Use a low-level platform SDK only when Spectrum does not expose the required platform behavior.

## Install

The umbrella package includes the standard provider set:

```bash
npm install spectrum-ts
```

For a lean install, add the core and only the providers you use:

```bash
npm install @spectrum-ts/core @spectrum-ts/imessage @spectrum-ts/telegram
```

Provider compatibility imports such as `spectrum-ts/providers/imessage` work when the matching provider package is installed.

Local macOS iMessage is intentionally separate:

```bash
npm install spectrum-ts @spectrum-ts/imessage-local
```

```ts
import { Spectrum } from "spectrum-ts";
import { localIMessage } from "@spectrum-ts/imessage-local";

const app = await Spectrum({ providers: [localIMessage.config()] });
```

There is no `spectrum-ts/providers/imessage-local` compatibility path. Spectrum requires TypeScript 5 or later.

## Credentials and provider environment variables

You can pass `projectId`, `projectSecret`, and `webhookSecret` explicitly or use:

```text
SPECTRUM_PROJECT_ID
SPECTRUM_PROJECT_SECRET
SPECTRUM_WEBHOOK_SECRET
```

Explicit values win over environment variables. Provider text fields use the convention `SPECTRUM_<PLATFORM>_<FIELD>`, for example `SPECTRUM_TELEGRAM_BOT_TOKEN` and `SPECTRUM_WHATSAPP_BUSINESS_PHONE_NUMBER_ID`.

## Quickstart

```ts
import { Spectrum } from "spectrum-ts";
import { imessage } from "spectrum-ts/providers/imessage";

const app = await Spectrum({
  providers: [imessage.config()],
});

try {
  for await (const [space, message] of app.messages) {
    if (message.direction === "outbound") continue;
    if (message.content.type !== "text") continue;

    await space.responding(async () => {
      await message.reply(`You said: ${message.content.text}`);
    });
  }
} finally {
  await app.stop();
}
```

Projectless providers such as Terminal work without project credentials.

## Application instance

```ts
app.messages                    // AsyncIterable<[Space, Message]>
await app.send(space, ...items)
await app.responding(space, fn)
await app.webhook(request, handler)
await app.stop()
```

Provider custom events appear as additional async iterables on the same instance.

## Logging and telemetry

```ts
const app = await Spectrum({
  providers: [imessage.config()],
  options: { logLevel: "debug" },
  telemetry: true,
});
```

`options.logLevel` overrides `LOG_LEVEL`. Logs redact sensitive token and secret fields. Telemetry uses OpenTelemetry; standard `OTEL_EXPORTER_OTLP_*` variables override the default exporter. `app.stop()` flushes pending telemetry before shutdown.

Official source: <https://photon.codes/docs/spectrum-ts/getting-started>
