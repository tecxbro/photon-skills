# Advanced iMessage events

- Use event streams with documented cursors to recover missed events after disconnects.
- Persist the last fully processed cursor only after durable processing succeeds.
- Expect retries or duplicates and deduplicate by stable event/message identifiers.
- Do not assume global ordering across unrelated chats.
- Cancel streams and close the client on shutdown.

Official source: <https://photon.codes/docs/advanced-kits/imessage/events>
