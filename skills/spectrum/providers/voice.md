# Voice provider

Spectrum Voice uses SIP with Spectrum iMessage lines and is separate from messaging Spaces.

## Outbound

- Configure a SIP application.
- Select the documented Spectrum iMessage line.
- Place calls through the current outbound call interface.
- Handle ringing, answered, ended, and failed lifecycle events.

## Inbound

- Register an inbound route.
- Validate route and transport configuration.
- Receive and handle calls independently from `app.messages`.
- Clean up call resources on failure or shutdown.

Do not represent a voice call as a normal text-message Space.

Official sources:

- <https://photon.codes/docs/spectrum-ts/providers/voice/outbound-calls>
- <https://photon.codes/docs/spectrum-ts/providers/voice/inbound-calls>
