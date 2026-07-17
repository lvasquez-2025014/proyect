#!/usr/bin/env bash
set -euo pipefail

echo "Starting infrastructure..."
docker compose -f infrastructure/docker/docker-compose.yml up -d

echo "Waiting for PostgreSQL..."
until docker exec luxury-postgres pg_isready -U luxury -d luxury_enterprises > /dev/null 2>&1; do
  sleep 1
done
echo "PostgreSQL is ready."

echo "Waiting for Redis..."
until docker exec luxury-redis redis-cli ping > /dev/null 2>&1; do
  sleep 1
done
echo "Redis is ready."

echo "Infrastructure is up and running."
echo "  PostgreSQL: localhost:5432"
echo "  Redis:      localhost:6379"
