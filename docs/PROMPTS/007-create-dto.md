# Prompt: Create DTO

```
Create DTOs for {entity} in the {module} module.

## Request DTO
{Name}Request (record)
- Fields with validation annotations
- Use Jakarta Validation (@NotBlank, @Positive, @NotNull, @Size, @Email, etc.)
- Include @Valid for nested objects

## Response DTO
{Name}Response (record)
- All fields the client needs
- Use UUID for IDs, Instant for timestamps
- Include nested DTOs where needed (flattened, not entity references)

## Example (from existing module):
public record CreateProductRequest(
    @NotBlank String sku,
    @NotBlank String name,
    @NotNull UUID categoryId,
    @Positive BigDecimal basePrice,
    @DecimalMin("0") @DecimalMax("1") BigDecimal taxRate
) {}

## Rules
- Records only (no classes with getters/setters)
- No business logic in DTOs
- No JPA annotations in DTOs
- No sensitive fields in responses (passwords, tokens)
```
