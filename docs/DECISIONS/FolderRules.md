# Folder Structure Rules

## Monorepo Root

```
luxury-enterprises/
├── apps/          # Deployable applications
├── services/      # Backend services
├── packages/      # Shared libraries
├── docs/          # Documentation
├── scripts/       # Automation
├── docker/        # Docker configuration
└── .github/       # CI/CD workflows
```

## Rules

### apps/web (Next.js)

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Public routes (no auth required)
│   ├── (auth)/             # Auth routes (login, register)
│   └── dashboard/          # Protected routes (auth required)
├── components/             # Shared components
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Layout components (sidebar, header)
│   └── modules/            # Module-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, API client
├── stores/                 # Zustand stores
├── types/                  # TypeScript types
└── styles/                 # Global CSS
```

**Rules**:
- `app/` contains only route files (page.tsx, layout.tsx, loading.tsx, error.tsx)
- `components/` contains reusable UI components (not page-specific)
- Module-specific components go in `components/modules/{module}/`
- Shared types go in `types/`, module-specific types inline or in `types/{module}`
- API client and utilities go in `lib/`

### services/backend (Spring Boot)

```
services/backend/
└── src/main/java/com/luxury/
    ├── shared/             # Shared Kernel
    │   ├── common/         # Base classes, utilities
    │   ├── security/       # JWT, auth, roles
    │   ├── event/          # Domain event infrastructure
    │   ├── exception/      # Global exception handler
    │   └── persistence/    # Base entities, auditors
    ├── {module}/           # Each domain module
    │   ├── domain/         # Entities, value objects, ports
    │   ├── application/    # DTOs, services, mappers
    │   └── infrastructure/ # Persistence, web, integrations
    └── resources/
        └── db/migration/   # Flyway migrations
```

**Rules**:
- One top-level package per module
- Every module follows Clean Architecture layers
- `shared/` is the only cross-cutting package
- Flyway migrations are the single source of truth for DB schema

### docs/

```
docs/
├── 00-PROJECT-VISION.md    # North star document
├── 01-PRODUCT-REQUIREMENTS.md
├── ...                     # Core docs
├── ADR/                    # Architecture Decision Records
├── SPECIFICATIONS/         # Business specs per module
├── API/                    # API contracts
├── DATABASE/               # Table definitions
├── UI/                     # Screen designs
├── QUALITY/                # Checklists
├── BRANDING/               # Visual identity
├── DECISIONS/              # Conventions
└── PROMPTS/                # AI prompts
```

## What Goes Where

| Type | Location |
|------|----------|
| Next.js page | `apps/web/app/{route}/page.tsx` |
| Shared UI component | `apps/web/components/ui/{component}.tsx` |
| Module component | `apps/web/components/modules/{module}/{Component}.tsx` |
| Custom hook | `apps/web/hooks/use-{name}.ts` |
| API client | `apps/web/lib/api.ts` |
| State store | `apps/web/stores/{name}-store.ts` |
| Shared types | `apps/web/types/{entity}.ts` |
| Spring module | `services/backend/src/.../{module}/` |
| DB migration | `services/backend/src/.../db/migration/V{date}__{name}.sql` |
| Docker config | `docker/` |
| CI/CD config | `.github/workflows/` |
| Docs | `docs/` |
| Scripts | `scripts/` |

## Rules of Thumb
- If a file is used by more than one route, it goes in `components/` or `lib/`
- If a file is used by only one route, it goes next to that route (in a `_components/` folder)
- If logic spans multiple modules, it goes in `shared/` (backend) or `lib/` (frontend)
- If it's a decision worth remembering, it goes in `docs/DECISIONS/` or `docs/ADR/`
