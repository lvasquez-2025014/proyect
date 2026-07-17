# Prompt: Create New API Endpoint

Use this when adding a new endpoint to an existing controller.

```
Add a new REST endpoint to the {ModuleName} module.

## Endpoint
{method} /api/v1/{module}/{resource}[/{id}][/{sub-resource}]

## Description
{What this endpoint does}

## Request
{Request body structure or query parameters}

## Response
{Response structure — success + error cases}

## Validations
{List of validation rules}

## Permissions
{Role required to access}

## Business Logic
{Description of what the endpoint should do internally}

## Implementation Notes
- Add method to existing {Resource}Controller
- Add DTO if needed (Create/Update {Resource}Request)
- Add service method to {Resource}ApplicationService
- Add mapper methods if needed
- Add tests
```
