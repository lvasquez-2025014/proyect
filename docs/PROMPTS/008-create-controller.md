# Prompt: Create Controller

```
Create a REST controller for {entity} in the {module} module.

## Location
com.luxury.{module}.infrastructure.web.{Entity}Controller

## Endpoints
- GET /api/v1/{module}/{resources} — list (paginated)
- GET /api/v1/{module}/{resources}/{id} — get by ID
- POST /api/v1/{module}/{resources} — create
- PATCH /api/v1/{module}/{resources}/{id} — update
- DELETE /api/v1/{module}/{resources}/{id} — soft delete

## Pattern
@RestController
@RequestMapping("/api/v1/{module}/{resources}")
public class {Entity}Controller {
    private final {Entity}ApplicationService service;

    // Constructor injection

    @GetMapping
    public ResponseEntity<Page<{Entity}Response>> list(@PageableDefault Pageable pageable) { }

    @GetMapping("/{id}")
    public ResponseEntity<{Entity}Response> get(@PathVariable UUID id) { }

    @PostMapping
    public ResponseEntity<{Entity}Response> create(@Valid @RequestBody Create{Entity}Request req) { }

    @PatchMapping("/{id}")
    public ResponseEntity<{Entity}Response> update(@PathVariable UUID id, @Valid @RequestBody Update{Entity}Request req) { }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) { }
}

## Rules
- Constructor injection
- @Valid on request bodies
- ResponseEntity with proper status codes (201 for create, 204 for delete)
- @PreAuthorize for permissions (refer to PERMISSIONS.md)
```
