# Automation — Business Specification

## Objective
Automate repetitive business processes to reduce manual work and errors.

## Actors
- Admin (configure automation rules)
- All users (triggered by events)

## Automation Rules

### Inventory Automation
- **Auto reorder**: When stock drops below reorder point, create a draft PO.
- **Auto stock transfer**: When branch A is low and branch B has excess, suggest transfer.
- **Auto cost update**: On goods receipt, update weighted average cost.

### Sales Automation
- **Quote follow-up**: If quote is not converted after 7 days, send reminder to sales associate.
- **Order confirmation email**: Auto-send when order is confirmed.
- **Shipping notification**: Auto-send when order is shipped.

### Billing Automation
- **Invoice generation**: Auto-generate invoice when order is delivered.
- **Overdue reminders**: Auto-send at 3, 7, 15, 30 days overdue.
- **Recurring invoices**: Generate based on schedule (weekly, monthly, yearly).
- **Payment reconciliation**: Auto-match incoming payment to open invoices.

### CRM Automation
- **Birthday greeting**: Auto-send email on customer's birthday.
- **Inactive customer alert**: Notify if no activity in 90 days.
- **Segment update**: Recalculate dynamic segments daily.

## Rule Configuration
Each automation rule has:
- Trigger (event or schedule)
- Condition (optional filter)
- Action (what to do)
- Enabled/disabled toggle

## Business Rules
- Automation runs are logged for audit.
- Failed automation actions are retried (3 attempts).
- Irreversible actions (invoice generation) require human confirmation.
- Users can override automation results manually.
