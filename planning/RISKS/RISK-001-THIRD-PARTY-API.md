# RISK-001: Third-party API Changes

**Status**: Active
**Probability**: Medium
**Impact**: High
**Category**: Integration

## Description
Third-party APIs (WhatsApp, Instagram, Facebook, Stripe) may change their APIs, deprecate endpoints, or modify authentication requirements.

## Mitigation
- Wrap all third-party integrations behind an abstraction (port/adapter pattern)
- Never call third-party APIs directly from domain or application layers
- Use integration-specific modules that can be updated independently
- Monitor provider changelogs and deprecation notices
- Version-lock API clients in dependencies

## Contingency
If an integration breaks:
1. Identify the breaking change in provider docs
2. Update the integration adapter (isolated change)
3. Run integration tests
4. Deploy without touching core modules
