# Typography — Branding

## Font Families

### Inter (UI)
- **Usage**: All interface text (dashboard, forms, tables, navigation)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Source**: Google Fonts (self-hosted for performance)

### Playfair Display (Marketing)
- **Usage**: Landing page headlines, hero titles, marketing copy
- **Weights**: 400 (regular), 700 (bold)
- **Fallback**: Georgia, serif
- **Source**: Google Fonts (self-hosted)

## Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 400 | 1.5 | Captions, footnotes |
| `text-sm` | 0.875rem (14px) | 400 | 1.5 | Labels, secondary text |
| `text-base` | 1rem (16px) | 400 | 1.5 | Body text |
| `text-lg` | 1.125rem (18px) | 500 | 1.5 | Large body, lead |
| `text-xl` | 1.25rem (20px) | 600 | 1.4 | Section headings |
| `text-2xl` | 1.5rem (24px) | 700 | 1.3 | Page headings |
| `text-3xl` | 1.875rem (30px) | 700 | 1.2 | Large headings |
| `text-4xl` | 2.25rem (36px) | 800 | 1.1 | Hero headings |
| `text-5xl` | 3rem (48px) | 800 | 1.1 | Large hero |

## Line Length
- Body text: max 75 characters per line
- Marketing copy: max 65 characters per line

## Letter Spacing
- Body: normal
- Headings (UI): -0.01em
- Small text (< 14px): +0.02em
- Uppercase labels: +0.05em

## Usage Rules
- Never use Inter for decorative/marketing headlines
- Never use Playfair Display for UI text
- Never mix more than 2 font sizes within a component
- Never use font weights below 400 for body text
