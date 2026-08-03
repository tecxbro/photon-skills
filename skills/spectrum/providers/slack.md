# Spectrum Slack provider

## Setup

```ts
import { slack } from "spectrum-ts/providers/slack";

slack.config({
  tokens: {
    TEAM_A: process.env.SLACK_TOKEN_A!,
    TEAM_B: process.env.SLACK_TOKEN_B!,
  },
  teams: {
    TEAM_A: {
      appId: "A0123456789",
      botUserId: "U0123456789",
      grantedScopes: ["chat:write", "channels:history"],
      teamName: "Team A",
    },
  },
});
```

`tokens` maps team IDs to `xoxb-...` bot tokens. `teams` is optional metadata. `endpoint` can use `SPECTRUM_SLACK_ENDPOINT`. In cloud mode, an empty config can use project-managed installations.

## Conversations

```ts
const sl = slack(app);
const user = await sl.user("U0123456789");
const dm = await sl.space.create(user, { teamId: "TEAM_A" });
```

Narrowed spaces expose `teamId`. Narrowed messages expose `isFromMe`, optional `subtype`, `threadTs`, and `ts`.

Slack supports text, mrkdwn, files, reactions, and threaded replies. Typing is accepted as a no-op. Message edits currently arrive inbound but outbound edit support should not be assumed.

Never log or commit bot tokens.

Official sources: <https://photon.codes/docs/spectrum-ts/providers/slack/setup> and <https://photon.codes/docs/spectrum-ts/providers/slack/conversations-and-events>
