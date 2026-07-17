# Integration — SMS

**Status**: Planned
**Priority**: Low

## Scope
Send critical notifications via SMS: password reset codes, invoice overdue alerts, order ready for pickup.

## Provider
**Twilio** (primary)

## Capabilities
- Send SMS messages
- Delivery status tracking
- Opt-out handling (STOP replies)

## Requirements
- Twilio account
- SMS-capable phone number (short code for US)
- Opt-in consent per contact

## Data Flow
```
ERP → NotificationService → Twilio API → Customer Phone
Twilio → Webhook (delivery, reply) → ERP
```

## Rate Limits
- Max 1 SMS per minute per contact
- Max 10 SMS per hour per contact
- No promotional SMS (transactional only)
