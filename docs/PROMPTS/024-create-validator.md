# Prompt: Create Validator

```
Create a custom validation annotation and validator for {rule}.

## Annotation
Location: com.luxury.shared.common.validation.{Rule}Validator.java (or module-specific)

@Target({ FIELD, PARAMETER })
@Retention(RUNTIME)
@Constraint(validatedBy = {Rule}ValidatorImpl.class)
@Documented
public @interface Valid{Rule} {
    String message() default "Invalid {rule}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

## Implementation
public class {Rule}ValidatorImpl implements ConstraintValidator<Valid{Rule}, {FieldType}> {
    @Override
    public boolean isValid({FieldType} value, ConstraintValidatorContext context) {
        if (value == null) return true; // use @NotNull for null check
        // Custom validation logic
        return {validationExpression};
    }
}

## Usage
public record CreateProductRequest(
    @ValidSku String sku  // Custom validator
) {}

## Common Validators
- @ValidSku: format check (e.g., XXX-000)
- @ValidTaxId: VAT, RFC, SIREN validation
- @ValidPhone: international phone format
- @ValidColor: hex color code (#RRGGBB)
- @ValidUrl: URL format check

## Rules
- Null values handled by @NotNull (don't reject null in custom validator)
- Clear error messages
- Register in package for component scanning
- Unit test for valid + invalid cases
```
