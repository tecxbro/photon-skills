# Spectrum Terminal provider

Terminal needs no credentials.

```ts
import { terminal } from "spectrum-ts/providers/terminal";

const app = await Spectrum({ providers: [terminal.config()] });
```

The provider launches the `tuichat` binary over JSON-RPC and downloads it on first use. A TTY gets the rich UI; CI and piped execution fall back to a synchronous readline loop.

## Commands and spaces

```ts
terminal.config({
  commands: [
    { name: "/clear", description: "Clear memory" },
    { name: "/whoami" },
  ],
});

const t = terminal(app);
const debug = await t.space.get("debug");
await debug.send("agent online");
```

Command names must match `/^\/[A-Za-z0-9_-]+$/` and arrive as normal text. Users can create several chats; every chat is a distinct Space.

Terminal supports reactions, replies, drag-and-drop attachments, inline images, typing indicators, and console capture into a pinned `__system__` chat. It is suitable for local agent iteration and non-TTY integration tests.

Official sources: <https://photon.codes/docs/spectrum-ts/providers/terminal/setup-and-usage> and <https://photon.codes/docs/spectrum-ts/providers/terminal/interactions>
