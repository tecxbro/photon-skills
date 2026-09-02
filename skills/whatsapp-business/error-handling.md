# WhatsApp Business error handling

All SDK failures derive from `WhatsAppError`. Narrow the class and then branch on `error.code` or `error.retryable`.

```ts
import { WhatsAppError } from "@photon-ai/whatsapp-business";

try {
  await client.messages.send({ to, text: "Hi" });
} catch (error) {
  if (!(error instanceof WhatsAppError)) throw error;

  switch (error.code) {
    case "rateLimitExceeded":
      await retryWithBackoff();
      break;
    case "preconditionFailed":
      // The 24-hour free-form window may have expired. Select an approved template.
      break;
    default:
      if (error.retryable) await retryWithBackoff();
      else throw error;
  }
}
```

## Error fields

| Field | Meaning |
|---|---|
| `code` | Canonical SDK code. |
| `retryable` | Whether retry with backoff is safe. |
| `grpcCode` | Numeric gRPC status. |
| `context` | Server-provided string context. Do not assume it is stable. |
| `cause` | Underlying transport error when present. |

Current codes are `unauthenticated`, `unauthorized`, `rateLimitExceeded`, `notFound`, `invalidArgument`, `preconditionFailed`, `serviceUnavailable`, `timeout`, `internalError`, and `networkError`.

Retry only retryable failures. Bound attempts and delay, honor `AbortSignal`, and avoid retrying invalid templates, expired authorization, or malformed media. Never print access tokens, app secrets, signed URLs, or full error context when it may contain sensitive provider data.

Official source: <https://photon.codes/docs/advanced-kits/whatsapp/error-handling>
