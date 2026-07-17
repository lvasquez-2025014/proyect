# Git Workflow

---

## Branching Strategy

```
main (production)
  └── develop (integration)
        ├── feature/PROJ-123-description
        ├── bugfix/PROJ-456-description
        ├── hotfix/PROJ-789-description
        └── release/v1.2.3
```

### Branches

| Branch | Source | Merges Into | Purpose |
|--------|--------|-------------|---------|
| `main` | — | — | Production. Protected — no direct pushes |
| `develop` | `main` | `main` | Integration branch. Latest stable |
| `feature/*` | `develop` | `develop` | New features |
| `bugfix/*` | `develop` | `develop` | Bug fixes |
| `hotfix/*` | `main` | `main`, `develop` | Urgent production fixes |
| `release/*` | `develop` | `main`, `develop` | Release preparation |

## Naming Convention

```
{type}/{ticket-id}-{kebab-case-description}
```

Examples:
- `feature/PROJ-42-add-product-variants`
- `bugfix/PROJ-17-fix-tax-calculation`
- `hotfix/PROJ-99-critical-security-patch`

## Commit Messages

Format (conventional commits):

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `style`, `ci`

Examples:
```
feat(inventory): add stock movement history
fix(sales): correct tax calculation for discounts
refactor(crm): extract contact validation into domain service
docs: add ADR for modular monolith decision
test(inventory): add stock reservation edge cases
```

## Pull Request Process

1. Create a branch from `develop`.
2. Make changes, commit following convention.
3. Push and open a PR to `develop`.
4. PR title follows commit convention: `feat(inventory): add product variants`.
5. PR description template:

```markdown
## Summary
<!-- Brief description of the change -->

## Related Issue
Closes PROJ-42

## Type of Change
- [ ] feat
- [ ] fix
- [ ] refactor
- [ ] test
- [ ] docs

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests passed
- [ ] Manual testing performed

## Checklist
- [ ] Code follows coding standards
- [ ] Documentation updated (if needed)
- [ ] No new warnings/lint errors
- [ ] Self-reviewed
```

6. Require:
   - At least 1 approval
   - CI passing
   - No merge conflicts
7. **Squash merge** into `develop`.
8. Delete the feature branch after merge.

## Releases

1. Create `release/v{major}.{minor}.{patch}` from `develop`.
2. Bump version, update changelog.
3. QA on release branch.
4. Merge into `main` (with a merge commit).
5. Tag: `v{major}.{minor}.{patch}`.
6. Merge back into `develop`.

## Hotfixes

1. Branch from `main`: `hotfix/PROJ-99-description`.
2. Fix, PR into `main`.
3. After merge, cherry-pick or merge into `develop`.

## Protection Rules (GitHub)

- `main`: Require PR, require approvals, dismiss stale reviews, require CI.
- `develop`: Require PR, require CI.

## Conventional Commits Cheat Sheet

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `docs` | Documentation only |
| `chore` | Build process, dependencies, tooling |
| `style` | Formatting, linting (no logic change) |
| `ci` | CI/CD configuration |
