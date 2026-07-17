# Roadmap — Luxury ERP

> **Status**: Active
> **Last Updated**: 2026-07-16
> **Update Frequency**: Weekly

---

## Phase 1 — Foundation (Q3 2026)

### Core Infrastructure
- [x] Project setup (monorepo, docs, CI/CD)
- [x] Database design (schema, migrations)
- [ ] Docker Compose for local development
- [ ] GitHub Actions CI pipeline
- [ ] Deployment to staging (Vercel + Render)

### Authentication & Multi-tenant
- [ ] JWT authentication (login, register, refresh)
- [ ] Multi-tenant data isolation
- [ ] Role-based access control (RBAC)
- [ ] Company onboarding flow

### Inventory Module
- [ ] Products CRUD
- [ ] Categories & Brands
- [ ] Variants management
- [ ] Stock management (warehouses, lots)
- [ ] Stock movements & history
- [ ] Inventory dashboard

### Shared UI
- [ ] Design system (colors, typography, spacing)
- [ ] shadcn/ui integration
- [ ] Layout components (sidebar, header, page container)
- [ ] Dark mode
- [ ] Responsive dashboard shell

### Marketing Site
- [ ] Landing page (hero, features, pricing)
- [ ] SEO basics (metadata, sitemap, robots)
- [ ] Blog (basic structure)

---

## Phase 2 — Core Business (Q4 2026)

### CRM Module
- [ ] Contact management (individual & organization)
- [ ] Address management
- [ ] Interaction logging (calls, emails, meetings)
- [ ] Clienteling (VIP profiles, preferences)
- [ ] Contact search & filtering

### Sales Module
- [ ] Quotes (create, approve, PDF)
- [ ] Orders (full lifecycle)
- [ ] Order status tracking
- [ ] Discounts & promotions

### Billing Module
- [ ] Invoice generation (auto & manual)
- [ ] Invoice templates
- [ ] Payment tracking
- [ ] Tax management (multi-jurisdiction)
- [ ] Overdue reminders

### Dashboard
- [ ] Executive dashboard (sales KPIs)
- [ ] Manager dashboard (team performance)
- [ ] Sales dashboard (daily activity)

---

## Phase 3 — Advanced Features (Q1 2027)

### HR Module
- [ ] Employee management
- [ ] Attendance tracking
- [ ] Leave management
- [ ] Payroll (basic)

### Purchasing Module
- [ ] Supplier management
- [ ] Purchase orders
- [ ] Goods receiving
- [ ] Stock reorder alerts

### AI Module
- [ ] Demand forecasting for inventory
- [ ] Client insights (next-best-action)
- [ ] Smart search (semantic)

### Reports & Analytics
- [ ] Custom report builder
- [ ] Scheduled report delivery
- [ ] Export to PDF / Excel / CSV
- [ ] Audit trail viewer

---

## Phase 4 — Polish & Scale (Q2 2027)

### Performance
- [ ] Caching strategy (Redis)
- [ ] Database query optimization
- [ ] Image optimization & CDN
- [ ] Lighthouse score > 90

### Internationalization
- [ ] Spanish, French, Italian translations
- [ ] Multi-currency
- [ ] RTL support (Arabic)

### Integrations
- [ ] E-commerce platform connectors (Shopify, Magento)
- [ ] Payment gateway integration (Stripe)
- [ ] Email service (SendGrid / Resend)
- [ ] Webhook system

### Compliance & Security
- [ ] GDPR compliance
- [ ] SOC 2 preparation
- [ ] Penetration testing
- [ ] Security audit

### Mobile
- [ ] Mobile-adaptive web app (PWA)
- [ ] Native mobile apps (future consideration)

---

## Legend

- [x] Completed
- [ ] Not started
- [~] In progress

---

> Roadmap is reviewed every sprint (2 weeks). Priorities may shift based on user feedback and business needs.
