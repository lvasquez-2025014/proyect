# Monorepo Structure

```
luxury-enterprises/
├── apps/
│   ├── web/                          # Next.js frontend
│   │   ├── app/
│   │   │   ├── (marketing)/          # Public routes (landing, pricing, about)
│   │   │   ├── (auth)/               # Login, register, forgot-password
│   │   │   └── dashboard/            # ERP application (protected)
│   │   │       ├── inventory/
│   │   │       ├── crm/
│   │   │       ├── sales/
│   │   │       ├── billing/
│   │   │       ├── hr/
│   │   │       ├── reports/
│   │   │       └── settings/
│   │   ├── components/               # Shared React components
│   │   │   ├── ui/                   # shadcn/ui primitives
│   │   │   ├── layout/               # Header, Sidebar, PageContainer
│   │   │   └── modules/              # Module-specific components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/                      # Utilities, API client, constants
│   │   ├── stores/                   # Zustand stores
│   │   ├── types/                    # TypeScript type definitions
│   │   └── styles/                   # Global CSS, Tailwind config
│   └── api/ (future)                 # Optional: standalone BFF
│
├── services/
│   └── backend/                      # Spring Boot application
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/luxury/
│       │   │   │   ├── shared/           # Shared Kernel
│       │   │   │   │   ├── common/       # Base classes, utilities
│       │   │   │   │   ├── security/     # JWT, auth filter, roles
│       │   │   │   │   ├── event/        # Domain event infrastructure
│       │   │   │   │   ├── exception/    # Global exception handler
│       │   │   │   │   └── persistence/  # Base entities, auditors
│       │   │   │   ├── inventory/         # Inventory module
│       │   │   │   │   ├── domain/
│       │   │   │   │   ├── application/
│       │   │   │   │   └── infrastructure/
│       │   │   │   ├── crm/               # CRM module
│       │   │   │   ├── sales/
│       │   │   │   ├── billing/
│       │   │   │   ├── hr/
│       │   │   │   ├── purchasing/
│       │   │   │   ├── ai/
│       │   │   │   └── reports/
│       │   │   └── resources/
│       │   │       ├── db/migration/     # Flyway migrations
│       │   │       └── application.yml
│       │   └── test/
│       └── pom.xml
│
├── packages/                        # Shared packages
│   ├── eslint-config/              # Shared ESLint configuration
│   ├── tsconfig/                   # Shared TypeScript configuration
│   ├── ui/                         # Shared UI component library (if extracted)
│   └── validations/                # Shared Zod schemas (frontend+backend)
│
├── docs/                           # Project documentation
│   ├── ADR/                        # Architecture Decision Records
│   └── *.md                        # See index
│
├── scripts/                        # Automation & utility scripts
│   ├── setup.sh                    # Initial project setup
│   ├── seed-db.sh                  # Seed development database
│   └── generate-module.sh          # Scaffold a new backend module
│
├── docker/
│   ├── docker-compose.yml          # Local development stack
│   ├── Dockerfile.frontend
│   └── Dockerfile.backend
│
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, test, build
│       └── deploy.yml              # Deploy to Vercel + Render
│
├── .env.example                    # Environment template
├── .gitignore
├── package.json                    # Root (workspaces config)
├── pnpm-workspace.yaml
└── README.md
```

## Key Conventions

- **Root `package.json`** — manages workspace scripts, no dependencies.
- **`apps/*`** — deployable applications. Each has its own `package.json`.
- **`services/*`** — backend services (Java/Spring Boot).
- **`packages/*`** — shared libraries consumed by apps.
- **`docs/*`** — living documentation, updated with every PR.
- **`scripts/*`** — automation; add a script before doing something manually twice.
- **`docker/*`** — Dockerfiles and compose files for all environments.
