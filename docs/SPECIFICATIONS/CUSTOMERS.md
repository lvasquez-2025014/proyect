# Customers — Business Specification

## Objective
Manage customer relationships with a focus on luxury clienteling — VIP profiles, preferences, purchase history, and personalized service.

## Actors
- Sales associate
- Concierge
- CRM manager

## Use Cases
- Create customer (individual or organization)
- Edit customer details
- Search customers (name, email, phone, company)
- Merge duplicate customers
- Add addresses (billing, shipping, both)
- Log interaction (call, email, meeting, note, task)
- View purchase history
- Manage VIP profile (preferences, sizes, interests, allergies, notes)
- Manage wishlist
- Assign customer to sales associate
- Create customer segments
- Send email/SMS (future)

## Business Rules
- Email is unique per company (optional — not all customers have email).
- Phone is unique per company (optional).
- A customer can have multiple addresses.
- One address is marked as primary for billing.
- One address is marked as primary for shipping.
- Deleting a customer is soft delete (orders remain).
- Merging customers transfers all related data (addresses, orders, interactions) to the survivor.
- VIP flag marks customer for special treatment.
- Customer segments are dynamic (based on rules, not manual assignment).

## Customer Types
| Type | Description |
|------|-------------|
| individual | Natural person |
| organization | Company, brand, institution |

## VIP Preferences
| Preference | Example |
|------------|---------|
| Clothing size | 42, M, 10 |
| Shoe size | 41, 8.5 |
| Preferred color | Gold, Black |
| Preferred material | Silk, Cashmere |
| Style | Classic, Avant-garde |
| Allergies | Nickel, perfume |
| Special dates | Anniversary, birthday |
| Notes | "Prefers white glove delivery" |

## States
```
Active → Inactive (no new orders)
Inactive → Active
Active → Deleting (soft delete)
```
