# Prompt: Create Layout

```
Create a layout component for the {section} section.

## Location
apps/web/app/{section}/layout.tsx

## Types
- Marketing layout: public, SEO-optimized, header + footer
- Auth layout: centered card, minimal
- Dashboard layout: sidebar + header + content area

## Dashboard Layout Structure
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

## Rules
- Server component by default
- Metadata export for SEO
- Nested layouts inherit from parent
- Loading.tsx at layout level for route group
- Error.tsx boundary at layout level
```
