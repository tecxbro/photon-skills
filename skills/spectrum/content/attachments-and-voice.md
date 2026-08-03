# Attachments and voice

- Build attachments from current supported paths, URLs, or buffers.
- Set MIME type when inference is unreliable.
- Keep stable attachment IDs unchanged.
- Use voice content with the documented audio metadata.
- Expect provider-specific fallbacks and reject unsupported oversized files before sending.
- Stream large payloads instead of buffering when the provider exposes a stream.

Official sources:
- <https://photon.codes/docs/spectrum-ts/content/attachments>
- <https://photon.codes/docs/spectrum-ts/content/voice>
