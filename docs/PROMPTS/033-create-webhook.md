# Prompt: Create Webhook

```
Create a webhook handler for {provider} integration.

## Location (Backend)
services/backend/src/main/java/com/luxury/{module}/infrastructure/webhook/{Provider}WebhookController.java

## Endpoint
POST /api/v1/webhooks/{provider}/{event_type}

## Security
- Verify webhook signature (HMAC / secret)
- IP whitelist (provider's known IPs)
- Rate limit per provider
- Replay protection (nonce / timestamp check)

## Implementation Pattern
@RestController
@RequestMapping("/api/v1/webhooks/{provider}")
public class {Provider}WebhookController {

    @PostMapping("/{event}")
    public ResponseEntity<Void> handleWebhook(
        @PathVariable String event,
        @RequestBody String payload,
        @RequestHeader("X-{Provider}-Signature") String signature
    ) {
        verifySignature(payload, signature);
        webhookService.process(event, payload);
        return ResponseEntity.ok().build(); // Always return 200 (provider resends on non-200)
    }
}

## Response
- 200 OK: acknowledged
- 400: invalid payload (provider may retry)
- Always respond quickly (< 5s, or process async)

## Rules
- Respond with 200 immediately, process async
- Log all webhook events (for debugging)
- Store raw payload in webhook_events table for replay
- Idempotency keys to prevent duplicate processing
- Fail gracefully (never throw from webhook controller)
```
