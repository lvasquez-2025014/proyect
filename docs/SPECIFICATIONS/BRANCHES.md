# Branches — Business Specification

## Objective
Allow companies with multiple physical locations (boutiques, warehouses, offices) to manage them independently while sharing master data.

## Actors
- Company admin
- Branch manager
- Warehouse operator

## Use Cases
- Create branch (name, code, address, phone, email, type)
- Edit branch details
- Activate / deactivate branch
- Assign users to a branch
- View branch inventory
- Transfer stock between branches
- View branch sales report

## Business Rules
- A branch can be type: boutique, warehouse, office, or online.
- Each branch has its own stock levels.
- Branch code must be unique within a company.
- A user can be assigned to one or more branches.
- Reports can be filtered by branch or consolidated.
- Deactivating a branch does not delete its data.
- A branch with active stock cannot be deleted.

## Branch Types
| Type | Description |
|------|-------------|
| boutique | Point of sale, customer-facing |
| warehouse | Storage, fulfillment |
| office | Administrative |
| online | E-commerce fulfillment center |

## States
```
Active → Inactive
Inactive → Active
Active → Deleting (fails if stock > 0)
```
