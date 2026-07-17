# Prompt: Accessibility Review

```
Review the accessibility of {component/page}.

## WCAG 2.1 AA Checklist
1. **Perceivable**
   - Images have alt text (decorative: alt="")
   - Color contrast ≥ 4.5:1
   - Not relying on color alone
   - Text resizable to 200%

2. **Operable**
   - Keyboard navigation (Tab, Enter, Escape)
   - Focus indicators visible
   - Touch targets ≥ 44×44px
   - No keyboard traps

3. **Understandable**
   - Form labels associated (htmlFor/id)
   - Error messages clear
   - Language attribute set
   - Consistent navigation

4. **Robust**
   - ARIA landmarks present
   - Semantic HTML (button, nav, main)
   - Live regions for dynamic content

## Automated Tools
- axe DevTools (browser extension)
- Lighthouse Accessibility audit
- eslint-plugin-jsx-a11y

## Output Format
- Issue: description
- WCAG: criteria reference (e.g., 1.1.1, 2.4.7)
- Impact: who it affects
- Fix: specific code change
```
