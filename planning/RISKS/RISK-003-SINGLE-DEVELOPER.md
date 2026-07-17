# RISK-003: Single Developer Dependency

**Status**: Active
**Probability**: High
**Impact**: High
**Category**: Team

## Description
Single developer project. If the developer is unavailable (illness, burnout, other commitments), project progress stops completely.

## Mitigation
- Comprehensive documentation (this entire docs/ folder)
- Self-documenting code (naming, structure, conventions)
- All decisions recorded in ADR/ and DECISIONS/
- AI prompts in PROMPTS/ enable another developer to continue
- CI/CD ensures code quality regardless of who commits
- Docker Compose for zero-setup development environment

## Contingency
If developer becomes unavailable:
1. Any Java/TypeScript developer can onboard via docs/17-CONTRIBUTING.md
2. AI assistants can continue development using PROMPTS/ library
3. Architecture decisions are documented (no tribal knowledge)
