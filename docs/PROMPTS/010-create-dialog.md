# Prompt: Create Dialog

```
Create a dialog/modal component for {action} {entity} in the {module} module.

## Location
apps/web/components/modules/{module}/{Entity}{Action}Dialog.tsx

## Props Interface
interface {Entity}{Action}DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  {entity}?: {Entity}; // for edit mode
}

## Structure
- shadcn/ui Dialog component
- DialogHeader with title and description
- Form with React Hook Form + Zod
- Submit button with loading state
- Error handling with toast

## States
- Loading: form skeleton or spinner
- Error: inline error alert + toast
- Success: close dialog, show toast, call onSuccess

## Rules
- Use shadcn/ui Dialog, FormField, FormItem, FormLabel, FormControl, FormMessage
- Use Zod schema for validation (reuse from lib/validations if exists)
- Use useMutation for form submission
- Optimistic close on success
- Confirm on close if form is dirty
```
