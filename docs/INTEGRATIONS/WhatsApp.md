# Integration — WhatsApp

**Status**: Planned
**Priority**: Medium

## Scope
Send order confirmations, shipping updates, and invoice reminders via WhatsApp Business API.

## Capabilities
- Send notification messages (template-based)
- Receive incoming queries (forward to CRM as interaction)
- Opt-in/Opt-out management

## Requirements
- WhatsApp Business API account
- Webhook endpoint for incoming messages
- Message template approval by Meta
- Opt-in consent storage per contact

## Data Flow
```
ERP → NotificationService → WhatsApp API → Customer
Customer → WhatsApp → Webhook → ERP → CRM Interaction
```
