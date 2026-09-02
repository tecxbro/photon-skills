# Building a custom Spectrum platform

`definePlatform(id, definition)` returns a provider with `.config()`, narrowing support, and optional static properties.

Platform IDs must match `/^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/`; invalid IDs are rejected rather than normalized.

```ts
import { definePlatform } from "spectrum-ts";
import z from "zod";

export const myPlatform = definePlatform("my_platform", {
  config: z.object({ apiKey: z.string() }),

  user: {
    resolve: async ({ input, client }) => ({
      id: input.userID,
      displayName: await client.lookupUser(input.userID),
    }),
  },

  space: {
    create: async ({ input, client }) => ({
      id: await client.findOrCreateConversation(input.users.map((u) => u.id)),
    }),
  },

  lifecycle: {
    createClient: async ({ config }) => new Client(config.apiKey),
    destroyClient: async ({ client }) => client.disconnect(),
  },

  async *messages({ client }) {
    for await (const incoming of client.onMessage()) {
      yield {
        id: incoming.id,
        content: { type: "text", text: incoming.body },
        sender: { id: incoming.authorId },
        space: { id: incoming.channelId },
        timestamp: new Date(incoming.ts),
      };
    }
  },

  send: async ({ space, content, client }) => {
    switch (content.type) {
      case "text":
        return client.send(space.id, content.text);
      case "reaction":
        return client.react(space.id, content.target.id, content.emoji);
      case "reply":
        return client.reply(space.id, content.target.id, content.content);
      case "typing":
        await client.setTyping(space.id, content.state === "start");
        return undefined;
    }
  },

  static: { reactions: { thumbsUp: "+1" } as const },
});
```

## Definition surface

| Field | Requirement | Purpose |
|---|---|---|
| `config` | Required | Zod provider configuration schema. |
| `user.resolve` | Required | Resolve `{ userID }` to at least `{ id }`. |
| `user.schema` | Optional | Provider-specific user properties. |
| `space.create` | Required | Create a conversation from users and optional params. |
| `space.get` | Optional | Hydrate known provider IDs; required when `space.schema` needs more than `id`. |
| `space.schema` / `space.params` | Optional | Typed provider fields and creation/get parameters. |
| `space.actions` | Optional | Methods bound to narrowed spaces. Reserved universal names are skipped with a warning. |
| `lifecycle.createClient` | Required | Receives config, project config, credentials, and store. |
| `lifecycle.destroyClient` | Optional | Provider cleanup on `app.stop()`. |
| `messages` | Required | Async source of provider message records, or a Fusor delivery handler. |
| `send` | Required | Dispatch every outbound content type. Return a provider message record or `undefined`. |
| `message.schema` / `message.actions` | Optional | Typed extras and narrowed-message methods. |
| `actions` | Optional | Universal getters plus provider-specific instance methods. |
| `events` | Optional | Custom event producers exposed on app and narrowed instance. |
| `static` | Optional | Constants copied to the provider callable. |

Nested message targets can set their own `direction`; otherwise they inherit the outer record direction.

## Fusor-backed webhook provider

```ts
import { definePlatform, fusor } from "spectrum-ts";

const webhookPlatform = definePlatform("my_webhook_platform", {
  config: z.object({ webhookSecret: z.string() }),
  lifecycle: {
    createClient: async ({ config }) => fusor("my_webhook_platform", (req) => {
      verify(req.rawBody, req.headers, config.webhookSecret);
      return JSON.parse(new TextDecoder().decode(req.rawBody));
    }),
  },
  messages: async ({ payload, respond }) => {
    respond({ status: 200 });
    return {
      id: payload.id,
      content: { type: "text", text: payload.text },
      sender: { id: payload.userId },
      space: { id: payload.chatId },
      timestamp: new Date(payload.ts),
    };
  },
  send: async () => undefined,
  user: { resolve: async ({ input }) => ({ id: input.userID }) },
  space: { create: async ({ input }) => ({ id: input.users[0]!.id }) },
});
```

Register custom platforms with `.config()` and narrow exactly like built-ins.

Official source: <https://photon.codes/docs/spectrum-ts/custom-platforms>
