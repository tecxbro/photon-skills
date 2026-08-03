# Advanced iMessage groups

- Group operations use the group chat GUID and do not apply to direct chats.
- Cover rename, add/remove participants, list participants, set/clear/get icon, leave, and group event streams.
- When no custom icon exists, expect `NotFoundError` with the documented `ErrorCode` rather than treating absence as corruption.
- Require explicit user intent before removing a participant or leaving a group.
- Preserve participant addresses exactly as returned by the SDK.

Official source: <https://photon.codes/docs/advanced-kits/imessage/groups>
