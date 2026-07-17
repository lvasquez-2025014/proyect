# Users API

## GET /api/v1/users

List users in the company.

**Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 0 | Page index |
| size | int | 20 | Page size |
| status | enum | — | active, inactive |

**Response 200**
```json
{
  "content": [
    {
      "id": "uuid",
      "first_name": "Carlos",
      "last_name": "García",
      "email": "carlos@luxury.com",
      "role": "ADMIN",
      "branches": [{ "id": "uuid", "name": "Madrid Boutique" }],
      "status": "active",
      "last_login": "2026-07-16T09:00:00Z",
      "created_at": "2026-01-15T10:00:00Z"
    }
  ]
}
```

## POST /api/v1/users

Invite a new user.

**Request**
```json
{
  "first_name": "Laura",
  "last_name": "Fernández",
  "email": "laura@luxury.com",
  "role": "SALES",
  "branch_ids": ["uuid"]
}
```

**Response 201**
```json
{
  "id": "uuid",
  "email": "laura@luxury.com",
  "status": "pending",
  "invitation_sent": true
}
```

**Permissions**: ADMIN

## PATCH /api/v1/users/{id}

Update user details or role.

**Request**
```json
{
  "first_name": "Laura Updated",
  "role": "MANAGER",
  "branch_ids": ["uuid1", "uuid2"]
}
```

**Response 200**: Returns updated user

## DELETE /api/v1/users/{id}

Deactivate a user (soft delete).

**Response 204**: No content

**Permissions**: ADMIN
