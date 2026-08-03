# Building a custom platform

Use `definePlatform` when no current provider owns the requested interface. Platform IDs must match `/^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/` and remain stable because they appear in routing, telemetry, webhooks, and environment-variable prefixes.

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
      id: await client.findOrCreateConversation(input.users.map((user) => user.id)),
    }),
  },

  lifecycle: {
    createClient: async ({ config }) => new MyPlatformClient(config.apiKey),
    destroyClient: async ({ client }) => { await client.disconnect(); },
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
      case "typing":
        await client.setTyping(space.id, content.state === "start");
        return;
    }
  },
});
```

## Required definition areas

- `config`: Zod schema for provider configuration.
- `user.resolve`: convert a platform user ID into a resolved user.
- `space.create`: create or resolve a conversation from users.
- `lifecycle.createClient`: construct the provider client.
- `messages`: required inbound `AsyncIterable` producer.
- `send`: dispatch every supported `Content` type and return a provider message record or `undefined` for fire-and-forget signals.

Optional areas include `space.get`, schemas, space/message actions, platform actions, custom events, `lifecycle.destroyClient`, and `static` constants. Validate each field against the installed `spectrum-ts` version and remove obsolete fields rather than preserving undocumented compatibility shims.

Official source: <https://photon.codes/docs/spectrum-ts/custom-platforms>
