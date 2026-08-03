# Inbound pipeline

- Debounce short message bursts per conversation.
- Batch only messages that belong to the same interaction window.
- Mark read and acknowledge at an intentional point.
- Cancel superseded generation with an abort signal.
- Carry forward messages that arrive during cancellation.
- Never drop a message merely because a previous worker was interrupted.

Official source: <https://photon.codes/docs/best-practices/inbound-pipeline>
