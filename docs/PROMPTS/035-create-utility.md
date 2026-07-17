# Prompt: Create Utility

```
Create a utility function/class for {purpose}.

## TypeScript Utility
Location: apps/web/lib/{name}.ts

- Pure functions only (no side effects)
- Unit tested
- Exported as named exports

Examples:
- formatCurrency(amount: number, currency: string): string
- formatDate(date: Date | string, format: string): string
- cn(...classes: (string | undefined | boolean)[]): string (class merge)
- debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T
- truncate(str: string, max: number): string

## Java Utility
Location: com.luxury.shared.common.util.{Name}Utils.java

- Private constructor (prevent instantiation)
- Static methods only
- No Spring dependencies

Examples:
- StringUtils
- NumberUtils (precision, rounding)
- DateUtils (conversion, formatting)
- ValidationUtils (common checks)

## Rules
- One purpose per utility
- No framework-specific utilities (framework code goes in lib/ or infrastructure/)
- Full test coverage
- Null-safe (handle null inputs gracefully)
```
