# Luxury Enterprises

Enterprise resource planning platform for luxury brands.

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | Spring Boot 3 + Java 21 |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Infrastructure | Docker Compose |

## Quick start

```bash
# Start infrastructure
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Install dependencies
pnpm install

# Start development
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:8080/api/health
- Actuator: http://localhost:8080/actuator/health

## Structure

```
apps/
├── web/        Next.js frontend
├── api/        Spring Boot API
packages/
├── ui/         Shared UI components
├── config/     ESLint, TypeScript configs
├── types/      Shared TypeScript types
├── utils/      Shared utilities
infrastructure/
├── docker/     Docker Compose, nginx, init scripts
├── scripts/    Setup and utility scripts
docs/           Project documentation
planning/       Roadmap, epics, sprints
```
