# Spectrum Voice over SIP

Voice calls are SIP routes attached to project-owned iMessage lines. They are not Spectrum message Spaces and do not appear on `app.messages`. WhatsApp numbers cannot be used.

## Outbound calls

Configure the SIP application or trunk:

| Setting | Value |
|---|---|
| Server | `sip.spectrum.photon.codes` |
| TLS server port | `5061` |
| TCP server port | `5060` |
| Username | Spectrum project ID |
| Password | Spectrum project secret |
| Registration | Off; Spectrum is not a registrar |
| Caller ID / From | An iMessage line owned by the project |

Prefer TLS with certificate verification. UDP SIP is unsupported. TCP remains supported but does not encrypt signaling. Audio uses RTP and requires the application's UDP RTP range through the firewall.

Use a full international destination such as `+14155550123`. A `403` commonly means the From number is missing or not owned by the authenticated project.

## Inbound calls

Register an inbound route in the dashboard for the exact project and iMessage line. Outbound credentials do not create this route.

Example routes:

```text
sips:agent@voice.example.com:5061
sip:agent@voice.example.com:5060
```

The endpoint must be publicly reachable. Configure its listening transport, port, TLS certificate when using `sips:`, and UDP RTP media range. Optional inbound SIP Digest username/password belong to the receiving application, not the Spectrum project credentials.

## Production checks

- Project ID and secret match the line-owning project.
- SIP registration is disabled.
- Transport is TLS or TCP, never UDP.
- Caller ID is an owned iMessage line.
- Public inbound route matches the receiving listener.
- SIP and RTP firewall/NAT rules permit both signaling and two-way audio.
- Business-profile registration is recommended for outbound reputation but is not required and does not replace inbound route registration.

Official sources: <https://photon.codes/docs/spectrum-ts/providers/voice/outbound-calls> and <https://photon.codes/docs/spectrum-ts/providers/voice/inbound-calls>
