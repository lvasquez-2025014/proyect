# MASTER ARCHITECTURE — Luxury Enterprises ERP

> **Documento maestro del proyecto.**  
> Este archivo unifica la visión, arquitectura, módulos, flujos y convenciones.  
> Todos los demás documentos en `docs/` referencian este como fuente principal.

**Versión**: 1.0  
**Última actualización**: 2026-07-16  
**Estado**: En definición (pre-implementación)

---

## Índice

1. [Visión del Sistema](#1-visión-del-sistema)
2. [Principios de Ingeniería](#2-principios-de-ingeniería)
3. [Diagrama de Arquitectura General](#3-diagrama-de-arquitectura-general)
4. [Modelo Multiempresa y Multisucursal](#4-modelo-multiempresa-y-multisucursal)
5. [Mapa de Módulos y Relaciones](#5-mapa-de-módulos-y-relaciones)
6. [Flujo de Autenticación](#6-flujo-de-autenticación)
7. [Comunicación Frontend ↔ Backend ↔ DB](#7-comunicación-frontend--backend--db)
8. [Eventos del Dominio](#8-eventos-del-dominio)
9. [Convenciones Técnicas](#9-convenciones-técnicas)
10. [Principios de Escalabilidad](#10-principios-de-escalabilidad)
11. [Roadmap de Evolución](#11-roadmap-de-evolución)
12. [Referencia Cruzada de Documentos](#12-referencia-cruzada-de-documentos)

---

## 1. Visión del Sistema

**Luxury Enterprises** es un ERP cloud-native para empresas del sector lujo: moda alta, joyería, relojería, automóviles premium, bienes raíces de lujo y hotelería exclusiva.

### Diferenciadores clave

| Aspecto | Propuesta |
|---------|-----------|
| Enfoque | Exclusivo para lujo (no un ERP genérico adaptado) |
| Modelo | Modular monolith → microservicios cuando sea necesario |
| UX | Diseñado para boutiques de lujo (no para almacenes industriales) |
| IA | Integración profunda desde el inicio (forecasting, OCR, smart search) |
| Multi-tenant | Aislamiento completo por compañía |

### Documento fuente
→ `docs/00-PROJECT-VISION.md`

---

## 2. Principios de Ingeniería

| # | Principio | Esencia | Documento |
|---|-----------|---------|-----------|
| 1 | **Calidad sobre velocidad** | Sin `// TODO` sin ticket. Deuda se prioriza. | `ENGINEERING_PRINCIPLES.md` |
| 2 | **Single Source of Truth** | Lógica en `domain/`, no duplicada | `ENGINEERING_PRINCIPLES.md` |
| 3 | **Documentar primero** | Sin spec no hay código | `ENGINEERING_PRINCIPLES.md` |
| 4 | **API estable** | Breaking changes = nueva versión | `ENGINEERING_PRINCIPLES.md` |
| 5 | **Seguridad por defecto** | Auth + validación en todo endpoint nuevo | `ENGINEERING_PRINCIPLES.md` |
| 6 | **Observabilidad** | Logs JSON, tracing, métricas | `LOGGING.md`, `OBSERVABILITY.md` |
| 7 | **Escalabilidad desde el día 1** | Paginación, índices, async, multi-tenant | `PERFORMANCE.md` |
| 8 | **Developer Experience** | Código auto-explicativo, < 3 comandos para empezar | `17-CONTRIBUTING.md` |

→ `docs/ENGINEERING_PRINCIPLES.md`

---

## 3. Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                │
│  ┌─────────────────────────┐    ┌──────────────────────────────┐   │
│  │    Next.js App Router   │    │     Mobile (future)          │   │
│  │  ┌───────────────────┐  │    └──────────────────────────────┘   │
│  │  │  (marketing)      │  │                                       │
│  │  │  Landing, Pricing │  │                                       │
│  │  │  Blog, About      │  │                                       │
│  │  ├───────────────────┤  │                                       │
│  │  │  (auth)           │  │                                       │
│  │  │  Login, Register  │  │                                       │
│  │  ├───────────────────┤  │                                       │
│  │  │  /dashboard       │  │                                       │
│  │  │  ERP Application  │  │                                       │
│  │  └───────────────────┘  │                                       │
│  └───────────┬─────────────┘                                       │
└──────────────┼─────────────────────────────────────────────────────┘
               │
┌──────────────┼─────────────────────────────────────────────────────┐
│              │   API GATEWAY (Next.js API Routes / BFF)            │
│              │   /api/v1/* → Backend                               │
│              │   Auth, Rate Limit, CORS, Logging                   │
└──────────────┼─────────────────────────────────────────────────────┘
               │
┌──────────────┼─────────────────────────────────────────────────────┐
│              ▼   BACKEND (Spring Boot 3 + Java 21)                │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  INVENTORY   │  │     CRM      │  │    SALES     │   ...       │
│  │  Module      │  │   Module     │  │   Module     │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                 │                 │                      │
│         └─────────────────┼─────────────────┘                      │
│                           │                                        │
│  ┌────────────────────────▼──────────────────────────┐            │
│  │                 SHARED KERNEL                      │            │
│  │  Security, Events, Base Entities, Exceptions      │            │
│  └────────────────────────┬──────────────────────────┘            │
│                            │                                        │
│  ┌─────────────────────────┼─────────────────────────────────────┐ │
│  │           DATA LAYER    │                                      │ │
│  │  ┌──────────┐  ┌───────▼───────┐  ┌──────────┐              │ │
│  │  │PostgreSQL│  │    Redis      │  │  MinIO   │              │ │
│  │  │  (RDB)   │  │   (Cache)     │  │ (Objects)│              │ │
│  │  └──────────┘  └───────────────┘  └──────────┘              │ │
│  └──────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

---

## 4. Modelo Multiempresa y Multisucursal

### Tenant Isolation

Cada compañía es un tenant con aislamiento completo de datos:

```
Company A                    Company B
┌──────────────────┐        ┌──────────────────┐
│ company_id: abc   │        │ company_id: xyz   │
│                   │        │                   │
│ Branches:         │        │ Branches:         │
│  └─ Madrid (WH)   │        │  └─ Paris (WH)    │
│  └─ Barcelona     │        │  └─ Lyon          │
│                   │        │                   │
│ Users: 12         │        │ Users: 8          │
│ Products: 340     │        │ Products: 560     │
│ Orders: 1,200     │        │ Orders: 890       │
└──────────────────┘        └──────────────────┘
```

### Data isolation strategy

- `company_id` en TODAS las tablas (no solo en algunas)
- Filtro automático via `@TenantId` / Spring Filter en cada query
- El `tenant_id` se extrae del JWT y se propaga via `ThreadLocal`
- El super admin puede ver datos de cualquier compañía (casos excepcionales auditados)

### Branch hierarchy

```
Company
  └── Branch (boutique / warehouse / office / online)
       └── Warehouse (physical storage location)
```

- Cada sucursal tiene su propio stock, usuarios asignados, y configuración
- Los reportes pueden ser por sucursal o consolidados
- Las transferencias de stock entre sucursales se registran como movimientos

---

## 5. Mapa de Módulos y Relaciones

```
                    ┌──────────┐
                    │ Identity │
                    │ & Auth   │
                    └────┬─────┘
                         │
     ┌───────────────────┼───────────────────────┐
     │                   │                       │
┌────▼─────┐      ┌──────▼──────┐      ┌────────▼──────┐
│ Inventory│◄──────┤    Sales    │◄──────┤     CRM       │
│          │ events│             │ events│              │
└────┬─────┘      └──────┬──────┘      └───────────────┘
     │                   │
     │            ┌──────▼──────┐
     └────────────┤   Billing   │
                  │             │
                  └─────────────┘
```

### Dependencias entre módulos

| Módulo | Depende de | Vía |
|--------|-----------|-----|
| Inventory | — | — |
| CRM | — | — |
| Sales | Inventory, CRM | Eventos |
| Billing | Sales | Eventos |
| Purchasing | Inventory | Eventos |
| HR | — | — |
| AI | Todos | Servicios internos |
| Notifications | Todos | Eventos |
| Identity | — | — |

### Documentos fuente
→ `docs/14-MODULES.md`  
→ `docs/DOMAIN/*.md`  
→ `docs/SPECIFICATIONS/*.md`

---

## 6. Flujo de Autenticación

```
                          ┌─────────────┐
                          │   Usuario    │
                          └──────┬──────┘
                                 │
                          POST /api/v1/auth/login
                                 │
                    ┌────────────▼────────────┐
                    │  AuthenticationFilter    │
                    │  Validate credentials    │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │ ✓ éxito          │ ✗ fallo           │
              ▼                  ▼                    │
     ┌────────────────┐  ┌──────────────┐           │
     │ Generar JWT     │  │ Incrementar  │           │
     │ Access: 15min   │  │ fail count   │           │
     │ Refresh: 7d     │  └──────┬───────┘           │
     └───────┬────────┘         │                    │
             │                  ▼                    │
             │           ┌──────────────┐            │
             │           │ count >= 5?  │            │
             │           └──────┬───────┘            │
             │            ┌─────┴──────┐             │
             │            │ YES        │ NO          │
             │            ▼            └─────────────┘
             │     ┌───────────┐
             │     │ Lock 15m  │
             │     └───────────┘
             ▼
    ┌────────────────┐
    │  Response:      │
    │  access_token   │
    │  refresh_token  │
    │  (HTTP-only     │
    │   cookie)       │
    └────────────────┘
```

### Protected resource flow
```
Request → Middleware → CorrelationIdFilter
                     → TenantFilter (company_id from JWT)
                     → SecurityFilter (validate JWT)
                     → RateLimitFilter
                     → Controller
                     → @PreAuthorize check
                     → ApplicationService
```

### Multi-tenant resolution
- El `company_id` se extrae del claim `tenant_id` en el JWT
- Se almacena en `ThreadLocal` para acceso desde cualquier capa
- Todas las queries se filtran automáticamente por `WHERE company_id = ?`
- Aislamiento a nivel de API (un usuario no puede acceder a datos de otra compañía)

### Documentos fuente
→ `docs/10-SECURITY.md`  
→ `docs/API/authentication.md`  
→ `docs/PERMISSIONS.md`

---

## 7. Comunicación Frontend ↔ Backend ↔ DB

### Request típico: Listar productos

```
Browser
  │
  ├── GET /dashboard/inventory
  │
  ├── Next.js Server (RSC)
  │   ├── Verifica auth (cookies)
  │   ├── GET /api/v1/inventory/products?page=0&size=20
  │   │
  │   ├── Backend Filter Chain
  │   │   ├── CorrelationIdFilter
  │   │   ├── TenantFilter (company_id de cookie)
  │   │   ├── SecurityFilter (JWT validation)
  │   │   ├── RateLimitFilter (check)
  │   │   └── Controller
  │   │
  │   ├── ProductController.list(Pageable)
  │   │   └── ProductApplicationService.findAll(company_id, pageable)
  │   │       └── ProductRepository (JPA)
  │   │           └── PostgreSQL
  │   │               └── SELECT p.* FROM inventory.products p
  │   │                   WHERE p.company_id = ? AND p.deleted_at IS NULL
  │   │                   ORDER BY p.created_at DESC
  │   │                   LIMIT 20 OFFSET 0
  │   │
  │   └── JSON Response ← ProductController
  │       └── Page<ProductResponse>
  │
  └── Next.js Server Component
      ├── Renderiza ProductTable con data inicial
      └── Envía HTML + RSC Payload al navegador
```

### Mutación: Crear producto

```
Browser → Form Submit
  → ProductForm (Client Component)
    → useCreateProduct() mutation (TanStack Query)
      → POST /api/v1/inventory/products
        → Backend validation (@Valid)
        → ProductApplicationService.create()
          → ProductDomainService.create() (reglas de negocio)
          → ProductRepository.save()
          → EventPublisher.publish(ProductCreatedEvent)
            → AuditListener (audit.logs)
            → SearchIndexer (embeddings)
        → Response 201 + ProductResponse
      → TanStack Query invalidate: ["products"]
      → Toast: "Product created successfully"
```

### Documentos fuente
→ `docs/02-ARCHITECTURE.md`  
→ `docs/FRONTEND-ARCHITECTURE.md`  
→ `docs/BACKEND-ARCHITECTURE.md`  
→ `docs/API/*.md`

---

## 8. Eventos del Dominio

### Principios

- Los eventos se publican **después del commit** (`AFTER_COMMIT`)
- Son **inmutables** (records en Java)
- Llevan **suficiente contexto** para que el consumidor no necesite query adicional
- Se nombran en **pasado**: `ProductCreated`, `OrderConfirmed`
- Se **documentan** en `docs/EVENTS/`

### Mapa de eventos principales

```
INVENTORY
  ProductCreated ──────► Audit, Search Index
  StockReserved  ◄────── OrderConfirmed (from Sales)
  StockReleased  ◄────── OrderCancelled (from Sales)
  StockLow       ──────► Notifications, Purchasing

SALES
  OrderCreated   ──────► CRM (purchase history)
  OrderConfirmed ──────► Inventory (reserve stock)
  OrderDelivered ──────► Billing (generate invoice)
  OrderCancelled ──────► Inventory (release stock)

BILLING
  InvoiceCreated ──────► CRM, Audit
  PaymentReceived──────► Sales (mark paid)
  InvoiceOverdue ──────► Notifications (reminder)

CRM
  ContactCreated ──────► Search Index
  ContactMerged  ──────► Sales, Billing (reassign data)
```

### Ejemplo de flujo completo: Order → Payment

```
User crea orden
  → OrderCreatedEvent
    → CRM actualiza purchase history

User confirma orden
  → OrderConfirmedEvent
    → Inventory reserva stock
    → StockReservedEvent (audit)

Admin despacha orden
  → OrderDeliveredEvent
    → Billing genera factura
    → InvoiceCreatedEvent (CRM + audit)

User registra pago
  → PaymentReceivedEvent
    → Invoice se marca como pagada
    → InvoicePaidEvent
      → Sales marca orden como pagada
      → CRM actualiza customer stats
```

### Documentos fuente
→ `docs/EVENTS/*.md`  
→ `docs/DOMAIN/*.md`

---

## 9. Convenciones Técnicas

### Stack principal

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | Next.js | 14+ (App Router) |
| Lenguaje (FE) | TypeScript | 5+ (strict) |
| Estilos | Tailwind CSS | 3+ |
| UI Components | shadcn/ui | — |
| Estado cliente | Zustand | 4+ |
| Server state | TanStack Query | 5+ |
| Formularios | React Hook Form + Zod | — |
| Backend | Spring Boot | 3+ |
| Lenguaje (BE) | Java | 21 (LTS) |
| ORM | Spring Data JPA | — |
| Migraciones | Flyway | — |
| Base de datos | PostgreSQL | 16 |
| Cache | Redis | 7 |
| Contenedores | Docker | — |
| CI/CD | GitHub Actions | — |

### Decisiones arquitectónicas documentadas

| Decisión | Conclusión | ADR |
|----------|-----------|-----|
| Monorepo | Sí, con pnpm workspaces | `ADR/001-monorepo.md` |
| Microservicios vs Monolith | Modular monolith (empezar así) | `ADR/002-modular-monolith.md` |
| PostgreSQL vs MySQL | PostgreSQL | `ADR/003-postgresql.md` |

### Clean Architecture (por módulo)

```
┌──────────────────────────────────────────────┐
│           Adapters (In) — Web                │
│  Controllers, DTOs, Exception Handlers      │
├──────────────────────────────────────────────┤
│           Application                        │
│  Use Cases, Services, Mappers (MapStruct)   │
├──────────────────────────────────────────────┤
│           Domain                             │
│  Entities, Value Objects, Domain Events,    │
│  Port Interfaces                            │
├──────────────────────────────────────────────┤
│           Adapters (Out) — Infrastructure   │
│  JPA Repositories, REST Clients, Email      │
└──────────────────────────────────────────────┘
```

**Regla de dependencia**: Solo hacia adentro. Domain no sabe de Spring ni JPA.

### Naming

| Contexto | Convención | Documento |
|----------|-----------|-----------|
| TypeScript | camelCase, PascalCase comps | `DECISIONS/Naming.md` |
| Java | camelCase, PascalCase classes | `DECISIONS/Naming.md` |
| SQL | snake_case | `DECISIONS/Naming.md` |
| Git | conventional commits | `09-GIT-WORKFLOW.md` |
| API | `/api/v1/{module}/{resource}` | `DECISIONS/Naming.md` |

### Documentos fuente
→ `docs/03-TECH-STACK.md`  
→ `docs/08-CODING-STANDARDS.md`  
→ `docs/DECISIONS/*.md`

---

## 10. Principios de Escalabilidad

### Database
- **Paginación server-side** en todas las listas (nunca cargar todo en memoria)
- **Índices desde el día 1** en todas las foreign keys y columnas de filtro
- **Partial indexes** para queries con WHERE comunes
- **Connection pooling** (HikariCP, max 20)
- **Vistas materializadas** para reportes pesados (futuro)

### Backend
- **Async processing** para PDFs, emails, reportes, OCR
- **Caching en Redis** por tipo de recurso con TTL configurable
- **Stateless services** (horizontal scaling listo)
- **Event-driven** para operaciones cross-module (no blocking calls)

### Frontend
- **Server Components** (cero JS para contenido estático)
- **Streaming + Suspense** para cargas parciales
- **ISR** para páginas públicas (marketing)
- **Lazy loading** de librerías pesadas

### Multi-tenant
- `company_id` como partición lógica (no física — una DB, filtro por columna)
- Preparado para migrar a schema-per-tenant si un tenant requiere aislamiento físico
- Share de recursos entre tenants (contenedores, pool de conexiones) con fair usage

### Documentos fuente
→ `docs/PERFORMANCE.md`  
→ `docs/12-DEVOPS.md`

---

## 11. Roadmap de Evolución

```
FASE 1 — Fundación (Q3 2026)
├── Monorepo + CI/CD + Docker Compose
├── Auth + Multi-tenant
├── Inventory (Products, Stock, Movements)
├── Marketing Site + SEO
└── Design System + Dashboard Shell

FASE 2 — Core Business (Q4 2026)
├── CRM (Contacts, Interactions, Clienteling)
├── Sales (Quotes, Orders, Fulfillment)
├── Billing (Invoices, Payments, Credit Notes)
└── Dashboards (Executive, Manager, Sales)

FASE 3 — Advanced (Q1 2027)
├── HR (Employees, Attendance, Payroll)
├── Purchasing (Suppliers, POs, Receiving)
├── AI (Forecasting, Insights, Smart Search)
└── Reports (Custom Builder, Scheduling)

FASE 4 — Scale (Q2 2027)
├── Performance Optimization
├── i18n (ES, FR, IT)
├── Integrations (Stripe, Email, E-commerce)
├── Compliance (GDPR, SOC 2)
└── Mobile (PWA + Native)
```

→ `docs/15-ROADMAP.md`

---

## 12. Referencia Cruzada de Documentos

### Por área

| Área | Documentos |
|------|-----------|
| **Visión y requisitos** | `00-PROJECT-VISION.md`, `01-PRODUCT-REQUIREMENTS.md` |
| **Arquitectura** | `02-ARCHITECTURE.md`, `FRONTEND-ARCHITECTURE.md`, `BACKEND-ARCHITECTURE.md` |
| **Stack y estándares** | `03-TECH-STACK.md`, `08-CODING-STANDARDS.md` |
| **Estructura** | `04-MONOREPO-STRUCTURE.md`, `DECISIONS/FolderRules.md` |
| **Frontend** | `05-FRONTEND-GUIDELINES.md`, `UI/*.md`, `DECISIONS/ComponentRules.md` |
| **Backend** | `06-BACKEND-GUIDELINES.md`, `DOMAIN/*.md`, `DECISIONS/ModuleRules.md` |
| **Base de datos** | `07-DATABASE-DESIGN.md`, `DATABASE/*.md` |
| **Git y contribución** | `09-GIT-WORKFLOW.md`, `17-CONTRIBUTING.md` |
| **Seguridad** | `10-SECURITY.md`, `PERMISSIONS.md`, `AUDIT.md` |
| **SEO** | `11-SEO.md` |
| **DevOps** | `12-DEVOPS.md` |
| **UI/UX** | `13-UI-UX.md`, `UX_PRINCIPLES.md` |
| **Módulos** | `14-MODULES.md`, `SPECIFICATIONS/*.md` |
| **Roadmap** | `15-ROADMAP.md` |
| **Reglas IA** | `16-AI_RULES.md` |
| **Calidad** | `QUALITY/*.md` |
| **Branding** | `BRANDING/*.md` |
| **Eventos** | `EVENTS/*.md` |
| **Integraciones** | `INTEGRATIONS/*.md` |
| **IA** | `AI/*.md` |
| **Observabilidad** | `LOGGING.md`, `OBSERVABILITY.md` |
| **Performance** | `PERFORMANCE.md` |
| **Decisiones** | `DECISIONS/*.md`, `ADR/*.md` |
| **Prompts** | `PROMPTS/*.md` |
| **Ingeniería** | `ENGINEERING_PRINCIPLES.md` |

### Por tipo de lector

| Lector | Documentos clave |
|--------|-----------------|
| **Nuevo desarrollador** | `00`, `02`, `03`, `04`, `08`, `09`, `17`, `ENGINEERING_PRINCIPLES.md`, `FRONTEND-ARCHITECTURE.md`, `BACKEND-ARCHITECTURE.md` |
| **Frontend** | `05`, `13`, `FRONTEND-ARCHITECTURE.md`, `UI/*.md`, `UX_PRINCIPLES.md`, `DECISIONS/ComponentRules.md` |
| **Backend** | `06`, `07`, `BACKEND-ARCHITECTURE.md`, `DOMAIN/*.md`, `EVENTS/*.md`, `DECISIONS/ModuleRules.md` |
| **DevOps** | `12`, `OBSERVABILITY.md`, `PERFORMANCE.md`, `LOGGING.md` |
| **Product Manager** | `00`, `01`, `14`, `15`, `SPECIFICATIONS/*.md` |
| **Diseñador** | `13`, `UX_PRINCIPLES.md`, `BRANDING/*.md`, `UI/*.md` |
| **IA / Assistant** | `16`, `AI_RULES.md`, `PROMPTS/*.md`, `ENGINEERING_PRINCIPLES.md`, `DECISIONS/Naming.md` |

---

> **Este documento es vivo.** Se actualiza cuando cambia la arquitectura, se añade un módulo, o se toma una decisión significativa.  
> Cualquier cambio debe reflejarse también en los documentos fuente referenciados.
