# Webhook troubleshooting

| Symptom | Check |
|---|---|
| Signature mismatch | Raw-body mutation, wrong secret, wrong header casing/access, incorrect signed string |
| Stale timestamp | Clock skew and replay window |
| Repeated events | Non-2xx response, timeout, or missing durable dedup |
| No events | Public reachability, TLS, redirects, registration, project/provider state |
| Slow delivery | Acknowledge before model/tool work |
| Missing attachment bytes | Webhook payloads provide metadata, not file bytes |
| Unknown content | Forward-compatible `default` branch |
| Lost signing secret | Delete and re-register the URL |

Never disable verification as a workaround.
