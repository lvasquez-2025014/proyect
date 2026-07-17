# Prompt: Create Middleware

```
Create a Next.js middleware for {purpose}.

## Location
apps/web/src/middleware.ts

## Use Cases
- Auth check: redirect unauthenticated users to /login
- Tenant resolution: subdomain → tenant ID
- Redirects: / → /dashboard
- Headers: security headers, correlation ID
- i18n: detect language, redirect

## Example (Auth Middleware)
export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    // Public routes (no auth required)
    const publicRoutes = ['/login', '/register', '/forgot-password', '/', '/features', '/pricing'];
    if (publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Protected routes
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

## Rules
- Edge-compatible (no Node.js APIs in middleware)
- Performance: keep middleware fast (< 100ms)
- Matcher config to limit execution scope
- Don't fetch data in middleware (use cookies/headers only)
```
