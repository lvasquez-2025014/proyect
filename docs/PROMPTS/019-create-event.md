# Prompt: Create Event

```
Create a domain event and its listener for the {module} module.

## Event Record
Location: com.luxury.{module}.domain.event.{Entity}{Action}Event

public record {Entity}{Action}Event(UUID {entity}Id, ...otherFields) implements DomainEvent {}

## Event Publisher
Use shared DomainEventPublisher (Spring ApplicationEventPublisher)

## Event Listener
Location: com.luxury.{module}.infrastructure.event.{Entity}{Action}Listener

@Component
public class {Entity}{Action}Listener {
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void on{Entity}{Action}Event({Entity}{Action}Event event) { }
}

## When to Publish
- After entity is created/updated/deleted
- After business operation completes
- AFTER_COMMIT (not during transaction)

## Rules
- Events are immutable records
- Events carry enough context for consumers (no need to query DB again)
- Events named in past tense: ProductCreated, OrderConfirmed
- Documentation in docs/EVENTS/{module}Events.md
```
