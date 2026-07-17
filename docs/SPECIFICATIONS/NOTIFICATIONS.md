# Notifications — Business Specification

## Objective
Keep users informed of important events through in-app notifications and email alerts.

## Actors
- All users (receive notifications)
- Admin (configure notification rules)

## Notification Types

### System Notifications
- New version available
- Maintenance scheduled
- Storage quota warning

### Inventory Notifications
- Low stock alert (product below reorder point)
- Stock adjustment (large discrepancy detected)
- Goods received (PO completed)

### Sales Notifications
- New order created
- Order confirmed
- Order shipped
- Order cancelled
- Return requested

### CRM Notifications
- New customer registered
- Customer assigned to you
- Task reminder
- Follow-up reminder

### Billing Notifications
- Invoice sent
- Payment received
- Invoice overdue (3, 7, 15, 30 days)
- Credit note issued

### Approval Notifications
- PO pending approval
- Discount requires approval
- Return requires approval

## Delivery Channels
| Channel | Usage |
|---------|-------|
| In-app (bell icon) | All notifications, real-time |
| Email digest | Daily summary (configurable) |
| Email immediate | Critical only (overdue, low stock, approval) |

## Business Rules
- Users can configure which notifications they receive.
- Notification preferences default to all enabled.
- Critical notifications cannot be disabled (system updates, security).
- In-app notifications are retained for 90 days.
- Email digests are sent at 8:00 AM (company timezone).
- Real-time notifications use WebSockets.

## Notification States
```
Unread → Read
Read → Archived (auto after 90 days)
```
