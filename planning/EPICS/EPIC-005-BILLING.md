# EPIC-005: Billing & Payments

**Status**: Pending
**Priority**: High
**Dependencies**: EPIC-001, EPIC-004

## Description
Invoicing, payment tracking, credit notes, and multi-jurisdiction tax management.

## Objectives
- Invoice generation (from orders and manual)
- Payment recording (full and partial)
- Credit notes for returns
- Multi-jurisdiction tax support
- Payment reconciliation
- Recurring invoices (subscriptions)

## Acceptance Criteria
- [ ] Auto-generate invoice from delivered order
- [ ] Create manual invoices (without order)
- [ ] Record payments (full and partial)
- [ ] Invoice status: draft → sent → paid/overdue/cancelled
- [ ] Credit notes reduce invoice balance
- [ ] Tax calculation per line (supports multiple tax rates)
- [ ] Overdue invoice detection and notifications
- [ ] Recurring invoice generation (weekly/monthly/yearly)
- [ ] Invoice PDF generation
- [ ] Invoice numbering auto-generated per company

## Epic Dependencies
EPIC-001, EPIC-004

## Estimated Effort
2-3 sprints
