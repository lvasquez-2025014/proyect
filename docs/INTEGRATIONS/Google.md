# Integration — Google

**Status**: Planned
**Priority**: Medium

## Scope
Google Workspace integration: calendar sync, contacts sync, and Google Sheets export.

## Capabilities
- Calendar sync (meetings/interactions → Google Calendar)
- Contacts sync (bidirectional with Google Contacts)
- Google Sheets export for reports
- Google Sign-In (OAuth)

## Requirements
- Google Cloud Project
- OAuth 2.0 credentials
- Google API scopes: calendar, contacts, sheets, auth

## Data Flow
```
ERP Interaction → Google Calendar API → Calendar Event
Google Calendar → Webhook → ERP → Interaction logged
ERP Report → Google Sheets API → Spreadsheet
User → Google Sign-In → ERP → Authenticated session
```
