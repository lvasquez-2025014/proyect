# DevOps — Luxury ERP

---

## Local Development

### Docker Compose

```yaml
# docker/docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: luxury_erp
      POSTGRES_USER: luxury
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U luxury -d luxury_erp"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

### Environment Variables

```bash
# .env.example
# Database
DB_PASSWORD=local_dev_password
DATABASE_URL=jdbc:postgresql://localhost:5432/luxury_erp

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_PRIVATE_KEY=...
JWT_PUBLIC_KEY=...
JWT_ACCESS_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

# CORS
CORS_ORIGINS=http://localhost:3000

# Sentry
SENTRY_DSN=...

# App
APP_ENV=development
```

## CI/CD — GitHub Actions

### CI Workflow

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [develop]
  pull_request:
    branches: [develop, main]

jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: "21"
          distribution: "temurin"
      - run: ./mvnw clean verify
        working-directory: services/backend

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm build
```

### CD Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install && pnpm build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
      - run: ./mvnw clean package -DskipTests
        working-directory: services/backend
      - uses: render-oss/render-deploy-action@v1
        with:
          render-api-key: ${{ secrets.RENDER_API_KEY }}
          service-id: ${{ secrets.RENDER_BACKEND_SERVICE_ID }}
```

## Deployed Environments

| Environment | URL | Purpose |
|------------|-----|---------|
| Production | `https://luxuryenterprises.com` | Live |
| Staging | `https://staging.luxuryenterprises.com` | Pre-release QA |
| Development | Local | Feature development |

## Monitoring & Observability

### Sentry
- All errors tracked with context (user, route, environment).
- Performance monitoring with traces.
- Alerts on error spikes.

### Logs
- Backend: JSON structured logging (Logback).
- Frontend: `console.log` only in development; Sentry for production.
- Centralized: Loki + Grafana (future).

```xml
<!-- logback-spring.xml -->
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
</appender>
```

### Health Checks

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when-authorized
```

## Backups

- PostgreSQL: Daily automated backups (Render managed or `pg_dump` cron job).
- Backups stored in S3-compatible storage (30-day retention).
- Test restore monthly.

## Secrets Management

- **Never commit secrets** to the repository.
- Development: `.env` file (gitignored).
- CI/CD: GitHub Secrets.
- Production: Environment variables on Render / Vercel.

## Dockerfiles

```dockerfile
# docker/Dockerfile.backend
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY services/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```dockerfile
# docker/Dockerfile.frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY apps/web .
RUN pnpm install && pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
```
