# Spectrum getting started

## Installation

The batteries-included package provides the standard provider set:

```bash
npm install spectrum-ts
```

For a lean install, use core plus only the provider packages required by the project:

```bash
bun add @spectrum-ts/core @spectrum-ts/imessage @spectrum-ts/telegram
```

Local iMessage is intentionally separate because it includes native macOS dependencies:

```bash
bun add spectrum-ts @spectrum-ts/imessage-local
```

```ts
import { Spectrum } from "spectrum-ts";
import { localIMessage } from "@spectrum-ts/imessage-local";

const app = await Spectrum({ providers: [localIMessage.config()] });
```

Use TypeScript 5 or later.

## Credentials and provider configuration

`Spectrum(...)` accepts explicit `projectId` and `projectSecret`, or reads `SPECTRUM_PROJECT_ID` and `SPECTRUM_PROJECT_SECRET`. `webhookSecret` falls back to `SPECTRUM_WEBHOOK_SECRET`. Provider text fields follow the documented `SPECTRUM_<PLATFORM>_<FIELD>` convention. Explicit values win over environment variables.

## App surface

- `app.messages`: long-running inbound stream of `[space, message]` tuples.
- `app.send(space, ...content)`: send into a known space.
- `space.send(...content)`: send through the resolved conversation.
- `app.responding(space, fn)` or `space.responding(fn)`: bracket work with typing cleanup.
- `app.webhook(request, handler)`: request-scoped HTTP delivery.
- `app.stop()`: close providers and flush telemetry.

## Logging and telemetry

Set `options.logLevel` for structured logs; an explicit value wins over `LOG_LEVEL`. Sensitive fields are redacted. Telemetry is opt-in with `telemetry: true`; standard `OTEL_EXPORTER_OTLP_*` variables can override the default exporter. Always call `app.stop()` on shutdown so providers and telemetry flush cleanly.

Official source: <https://photon.codes/docs/spectrum-ts/getting-started>
