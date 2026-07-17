# Prompt: Refactor Code

Use this when refactoring existing code.

```
Refactor {component/file/function} to improve {quality/readability/performance/maintainability}.

## Current Issues
{Describe what's wrong}

## Constraints
- Do not change public API (method signatures, component props, endpoint contracts)
- Keep same behavior (no functional changes)
- Follow project coding standards
- Keep or improve test coverage

## Target Pattern
{Describe the desired approach or pattern}

## Files Affected
{List of files to modify}

## Risk Level
{Low / Medium / High}

## Testing Strategy
- Unit tests should still pass without changes
- Integration tests may need updates if internals change
- Manual testing needed for {specific areas}

## Additional Notes
{Any context the AI needs}
```
