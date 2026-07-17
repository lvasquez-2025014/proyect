# Prompt: Security Review

```
Perform a security review of {file/module}.

## Checklist Focus
1. **Authentication**: Is the endpoint protected? JWT verified?
2. **Authorization**: Is the user allowed to perform this action on this resource?
3. **Input Validation**: Are all inputs validated (@Valid, sanitized)?
4. **SQL Injection**: Are all queries parameterized? (No concatenation)
5. **XSS**: Is user output escaped? CSP headers in place?
6. **Data Exposure**: Are we returning sensitive fields? (passwords, tokens, PII)
7. **Rate Limiting**: Should this endpoint be rate-limited?
8. **Audit**: Should this action be logged?

## Files to Review
{list of files}

## Output Format
For each issue:
- **Severity**: Critical / High / Medium / Low
- **Location**: file:line
- **Issue**: What's wrong
- **Fix**: How to fix it
- **Reference**: Link to docs/10-SECURITY.md or relevant standard
```
