# Prompt: Create New Frontend Page

Use this when creating a new page in the Next.js app.

```
Create a new page for {ModuleName} in the Next.js frontend.

## Route
/dashboard/{module}/{resource}[/{id}][/{action}]

## Page Type
{list | detail | create | edit}

## Description
{What the page displays or does}

## API Endpoints Used
- GET /api/v1/{module}/{resource}
- POST /api/v1/{module}/{resource}
- PATCH /api/v1/{module}/{resource}/{id}
- DELETE /api/v1/{module}/{resource}/{id}

## Components Needed
- Server page (page.tsx) — data fetching, layout
- Client components in _components/:
  - {Resource}Table.tsx — list view
  - {Resource}Form.tsx — create/edit form
  - {Resource}Detail.tsx — detail view

## States
- Loading: skeleton screens
- Empty: illustration + CTA
- Error: error.tsx with retry
- Success: data rendered

## Form Fields
{Detailed field list with types, validation, and UI components}

## Rules
- Server component by default
- Only add "use client" where interactivity needed
- Use TanStack Query for data fetching
- Use React Hook Form + Zod for forms
- Use shadcn/ui components
- Responsive design (mobile-first)
- Dark mode support
```
