# Prompt: Code Review

Use this prompt to request a code review from the AI.

```
Review the following code changes for the Luxury ERP project.

## Files Changed
{List of files}

## Checklist
1. **Architecture**: Does it follow Clean Architecture? Are module boundaries respected?
2. **Naming**: Do names follow conventions (docs/DECISIONS/Naming.md)?
3. **Security**: Are endpoints protected? Input validated? No secrets exposed?
4. **Performance**: Any N+1 queries? Missing indexes? Unnecessary re-renders?
5. **Error handling**: Are errors caught at the right level? Meaningful error messages?
6. **Testing**: Are there tests for edge cases? Error scenarios?
7. **Duplication**: Any repeated logic that should be extracted?
8. **Documentation**: Are docs updated? API documented? Migration described?

## Code to Review
```{language}
{paste code here}
```

## Response Format
For each issue found, provide:
- Severity (blocking / major / minor)
- File and line
- Why it's a problem
- Suggested fix
```
