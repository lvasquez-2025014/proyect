# Integration — Facebook

**Status**: Planned
**Priority**: Low

## Scope
Sync product catalog to Facebook Marketplace, track leads from Facebook ads, and log interactions from Facebook Page messages.

## Capabilities
- Product catalog sync (Facebook Shop)
- Lead ad webhook (new lead → CRM contact)
- Page messaging → CRM interaction

## Requirements
- Facebook Business Manager
- Facebook Page
- Product catalog feed
- Webhook for lead ads and messages

## Data Flow
```
Facebook Lead Ad → Webhook → ERP → Create Contact + Interaction
ERP → Product Feed → Facebook Catalog
```
