# Chat SDK integration

Use the official iMessage adapter when the application is already structured around Chat SDK. Do not manually rebuild adapter translation.

```ts
import { Chat } from "chat";
import { createiMessageAdapter } from "chat-adapter-imessage";

const bot = new Chat({
  userName: "my-bot",
  adapters: {
    imessage: createiMessageAdapter({
      projectId: process.env.IMESSAGE_PROJECT_ID!,
      projectSecret: process.env.IMESSAGE_PROJECT_SECRET!,
    }),
  },
});
```

Load [`../../chat-adapter-imessage/SKILL.md`](../../chat-adapter-imessage/SKILL.md) for configuration, webhook/gateway receiving modes, feature translations, deployment, and troubleshooting.

Official source: <https://photon.codes/docs/integrations/chat-sdk>
