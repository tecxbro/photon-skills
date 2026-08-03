# Replies, edits, and unsend

- Replies target an existing stable message identifier.
- Edits target an outbound message owned by the application.
- Unsend can be restricted by ownership and time window.
- Handle unsupported-provider behavior explicitly.
- Do not convert a failed edit or unsend into a new message unless product behavior calls for it.

Official sources:
- <https://photon.codes/docs/spectrum-ts/content/replies>
- <https://photon.codes/docs/spectrum-ts/content/edits>
- <https://photon.codes/docs/spectrum-ts/content/unsend>
