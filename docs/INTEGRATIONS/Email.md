# Integration — Email

**Status**: Active
**Priority**: High

## Scope
Transactional emails: invoice delivery, order confirmations, password resets, notifications.

## Provider
**Resend** (primary) / **SendGrid** (fallback)

## Capabilities
- Transactional email sending (templates + variables)
- Email tracking (opens, clicks — future)
- Bounce handling (webhook)
- DKIM/SPF configuration per custom domain

## Data Flow
```
ERP → NotificationService → Resend API → Customer Inbox
Resend → Webhook (bounce, complaint) → ERP → Update contact email status
```

## Templates
| Template | Variables | Trigger |
|----------|-----------|---------|
| `welcome` | `{{name}}`, `{{company_name}}` | User registration |
| `invoice-sent` | `{{invoice_number}}`, `{{amount}}`, `{{due_date}}`, `{{pdf_link}}` | Invoice created |
| `order-confirmed` | `{{order_number}}`, `{{items}}`, `{{total}}` | Order confirmed |
| `password-reset` | `{{reset_link}}`, `{{expiry_hours}}` | Forgot password |
| `payment-received` | `{{invoice_number}}`, `{{amount}}`, `{{date}}` | Payment recorded |

## Security
- SMTP credentials / API keys as environment variables
- Never log email body content
- Template variables escaped to prevent injection
- Rate limiting: max 10 emails per second
