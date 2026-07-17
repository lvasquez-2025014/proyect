# Contributing — Luxury ERP

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+
- Java 21 (Temurin)
- Docker & Docker Compose
- VS Code (recommended) with ESLint, Prettier, and Java extensions

### Setup

```bash
# 1. Clone the repository
git clone git@github.com:your-org/luxury-enterprises.git
cd luxury-enterprises

# 2. Install frontend dependencies
pnpm install

# 3. Start infrastructure (PostgreSQL + Redis)
docker compose -f docker/docker-compose.yml up -d

# 4. Build backend
cd services/backend
./mvnw clean compile
cd ../..

# 5. Run database migrations
cd services/backend
./mvnw flyway:migrate
cd ../..

# 6. Start development servers
# Terminal 1: Backend
cd services/backend && ./mvnw spring-boot:run

# Terminal 2: Frontend
pnpm --filter web dev
```

Open `http://localhost:3000` — you should see the login page.

---

## How to Contribute

### 1. Pick an Issue

- Check the project board for open issues.
- Assign yourself or comment to express interest.
- If it's your first contribution, look for `good-first-issue` labels.

### 2. Create a Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/PROJ-42-add-product-variants
```

Branch naming: `{type}/{ticket-id}-{description}`
Types: `feature`, `bugfix`, `hotfix`, `release`

### 3. Make Changes

- Follow the coding standards (`docs/08-CODING-STANDARDS.md`).
- Write tests for new code (unit + integration).
- Keep changes focused — one feature/fix per branch.

### 4. Commit

```bash
git add .
git commit -m "feat(inventory): add product variant management"
```

Conventional commits required:
- `feat(inventory):` — new feature in inventory module
- `fix(sales):` — bug fix in sales module
- `refactor(crm):` — refactor in CRM module
- `docs:` — documentation
- `test:` — tests
- `chore:` — tooling, dependencies

### 5. Push and Open a Pull Request

```bash
git push origin feature/PROJ-42-add-product-variants
```

Then open a PR on GitHub to `develop`.

### 6. PR Review

- At least 1 approval required.
- All CI checks must pass.
- Address review feedback with additional commits.
- Squash merge when approved.

---

## Coding Standards

See `docs/08-CODING-STANDARDS.md` for detailed rules.

Quick summary:
- TypeScript: strict mode, no `any`, named exports
- Java: constructor injection, records for DTOs, no field injection
- SQL: explicit columns, parameterized queries, snake_case
- Commits: conventional commits

## Testing

```bash
# Frontend tests
pnpm --filter web test

# Backend tests
cd services/backend && ./mvnw test

# All tests
pnpm test
```

- Write unit tests for domain logic.
- Write integration tests for repositories and controllers.
- Use Testcontainers for database-dependent tests.

## Documentation

- Every new feature must update the relevant `docs/` file.
- API changes must update the OpenAPI spec.
- Architecture decisions need an ADR in `docs/ADR/`.

## Code of Conduct

- Be respectful and constructive.
- Assume good intent.
- Focus on the code, not the person.
- Disagreements are resolved with data, not opinion.

---

## Need Help?

- Open a discussion in GitHub Discussions.
- Tag `@maintainers` in your PR for questions.
- Check existing docs in `docs/` first.
