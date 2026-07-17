# EPIC-003: CRM (Customer Relationship Management)

**Status**: Pending
**Priority**: High
**Dependencies**: EPIC-001

## Description
Customer management with luxury clienteling features: VIP profiles, preferences, purchase history, interactions, and segmentation.

## Objectives
- Contact management (individual + organization)
- Multi-address support (billing, shipping)
- Interaction logging (calls, emails, meetings, notes, tasks)
- VIP profiles with preferences (sizes, colors, materials, allergies)
- Purchase history aggregated from Sales module
- Dynamic customer segments
- Customer search and merge

## Acceptance Criteria
- [ ] Create/edit individual and organization contacts
- [ ] Multiple addresses per contact with type (billing/shipping/both)
- [ ] Log interactions with type, subject, description, direction
- [ ] VIP preferences with customizable fields
- [ ] Purchase history view (read from Sales events)
- [ ] Dynamic segments based on rules (spend, frequency, location)
- [ ] Merge duplicate contacts (all related data transferred)
- [ ] Search by name, email, phone, company
- [ ] Assign contact to sales associate

## Epic Dependencies
EPIC-001, EPIC-004 (for purchase history via events)

## Estimated Effort
2-3 sprints
