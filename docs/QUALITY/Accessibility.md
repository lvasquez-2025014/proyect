# Accessibility Checklist

> Target: WCAG 2.1 Level AA

## Perceivable

- [ ] All images have meaningful `alt` text
- [ ] Decorative images have `alt=""` (empty)
- [ ] Color is not the only way to convey information
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text (18px+ bold / 24px+ regular)
- [ ] Active focus indicators visible (not `outline: none` without replacement)
- [ ] Text can be resized up to 200% without loss of content
- [ ] Captions provided for video content (future)

## Operable

- [ ] All interactive elements keyboard accessible (Tab, Enter, Escape)
- [ ] Tab order follows visual order
- [ ] Skip-to-content link available
- [ ] No keyboard traps
- [ ] Touch targets ≥ 44×44px
- [ ] Motion reduced on `prefers-reduced-motion`
- [ ] No content that flashes more than 3 times/second

## Understandable

- [ ] Page language set (`<html lang="en">`)
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages clear and descriptive
- [ ] Error summary at top of form
- [ ] Consistent navigation across pages
- [ ] Navigation order predictable
- [ ] Input purpose can be programmatically determined (autocomplete attributes)

## Robust

- [ ] ARIA landmarks used (header, nav, main, contentinfo)
- [ ] ARIA labels on interactive elements where visual label is insufficient
- [ ] Custom components have proper ARIA roles, states, and properties
- [ ] Live regions for dynamic content updates (`aria-live="polite"`)
- [ ] Valid HTML (no duplicate IDs, proper nesting)

## Testing

- [ ] Tested with keyboard-only navigation
- [ ] Tested with screen reader (VoiceOver/NVDA)
- [ ] Tested with browser zoom at 200%
- [ ] Tested with reduced motion setting
- [ ] Automated a11y checks in CI (axe-core / Pa11y)
- [ ] Manual audit performed quarterly
