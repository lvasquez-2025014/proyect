# Prompt: Create Form

```
Create a form component for {entity} in the {module} module.

## Location
apps/web/components/modules/{module}/{Entity}Form.tsx

## Props Interface
interface {Entity}FormProps {
  defaultValues?: Partial<{Entity}FormData>;
  onSubmit: (data: {Entity}FormData) => Promise<void>;
  isSubmitting?: boolean;
  mode: 'create' | 'edit';
}

## Schema
Use Zod: const {entity}Schema = z.object({ ... });
Export type {Entity}FormData = z.infer<typeof {entity}Schema>;

## Structure
- React Hook Form with zodResolver
- shadcn/ui form fields
- Submit button with loading state
- Cancel button

## Field Types
- Text: Input
- Number: Input type="number"
- Select: Select + SelectTrigger + SelectContent + SelectItem
- Date: Popover + Calendar
- Textarea: Textarea
- Switch: Switch
- File: Drag-and-drop zone

## Rules
- Use shadcn/ui FormField pattern
- Group related fields with fieldset/legend or visual sections
- Show validation errors inline (per field)
- Disable submit button while submitting (not hidden)
- Support both create and edit modes
```
