# Integration — Instagram

**Status**: Planned
**Priority**: Low

## Scope
Enable social selling: tag products in Instagram posts/stories, direct DMs for inquiries, and track engagement as CRM interactions.

## Capabilities
- Product catalog sync (Instagram Shopping)
- DM-to-interaction logging
- Comment monitoring

## Requirements
- Instagram Business Account
- Facebook Graph API access
- Product catalog feed (XML/JSON)

## Data Flow
```
Instagram DM → Webhook → ERP → CRM Interaction
ERP → Product Catalog → Instagram Shopping
```
