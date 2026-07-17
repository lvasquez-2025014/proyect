# Prompt: Create Enum

```
Create a Java enum or TypeScript enum/type for {domain} values.

## Java Enum
Location: com.luxury.{module}.domain.model.{EnumName}.java

public enum {EnumName} {
    VALUE1("label1"),
    VALUE2("label2");

    private final String label;

    {EnumName}(String label) { this.label = label; }
    public String getLabel() { return label; }

    // Optional: fromString, isValid, listAll
}

## TypeScript Type (preferred) / Enum
Location: apps/web/types/{domain}.ts

export type {EnumName} = 'VALUE1' | 'VALUE2';
export const {ENUM_NAME}_OPTIONS: { value: {EnumName}; label: string }[] = [
  { value: 'VALUE1', label: 'Label 1' },
  { value: 'VALUE2', label: 'Label 2' },
];

## Database CHECK Constraint
ALTER TABLE {table} ADD CONSTRAINT chk_{table}_{column}
    CHECK ({column} IN ('VALUE1', 'VALUE2'));

## Rules
- Java enum in domain layer (no framework dependencies)
- TypeScript type (union) preferred over const enum
- Database CHECK constraint matches enum values
- Labels come from i18n (can be overridden per language)
- Add Javadoc/TS doc comment explaining each value
```
