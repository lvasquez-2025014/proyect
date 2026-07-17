# Prompt: Create Config

```
Create or update configuration for {component/environment}.

## Spring Boot Config
Location: services/backend/src/main/resources/application.yml

## Sections
- Server (port, context-path, compression)
- Datasource (url, user, pool settings)
- JPA (ddl-auto, show-sql, dialect)
- Flyway (enabled, locations)
- Security (JWT keys, CORS, rate limit)
- Cache (Redis host, port, ttl defaults)
- Async (thread pool size)
- Logging (level per package)

## Environment Variables
All values that differ between environments use ${VAR_NAME:default}

## Example
server:
  port: ${PORT:8080}
  compression:
    enabled: true
    mime-types: application/json,text/html

spring:
  datasource:
    url: ${DATABASE_URL}
    hikari:
      maximum-pool-size: ${DB_POOL_SIZE:20}

## Rules
- Never hardcode environment-specific values
- Document each env var in .env.example
- Profile-specific overrides: application-dev.yml, application-prod.yml
- Secrets only via env vars, never in config files
- Use @ConfigurationProperties for typed config classes
```
