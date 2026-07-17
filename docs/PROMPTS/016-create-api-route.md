# Prompt: Create API Route (BFF)

```
Create an API route in Next.js (backend-for-frontend).

## Location
apps/web/app/api/{module}/{resource}/route.ts

## Pattern
export async function GET(request: NextRequest) { ... }
export async function POST(request: NextRequest) { ... }
export async function PATCH(request: NextRequest) { ... }
export async function DELETE(request: NextRequest) { ... }

## Responsibilities
- Forward requests to backend API
- Transform response for frontend needs
- Add auth headers (get token from cookies)
- Handle errors (return consistent format)
- Rate limiting (optional)

## Example
export async function GET(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '0';

  const res = await fetch(`${BACKEND_URL}/api/v1/inventory/products?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return NextResponse.json(await res.json(), { status: res.status });
  }

  return NextResponse.json(await res.json());
}

## Rules
- BFF only: no business logic in API routes
- Error responses consistent with backend ProblemDetail format
- Authentication check before forwarding
- CORS handled by Next.js config
```
