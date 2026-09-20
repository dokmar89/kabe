# IT knowledge base — compact prototype

A React/TypeScript support knowledge base with article views, administration and an email-signature utility.

**Status:** Legacy/parallel knowledge-base variant; `skolap` is the selected portfolio reference for the broader support portal.

## Scope

- Article browsing and administration screens.
- Setup and sign-in UI.
- Signature generator and Supabase-backed service modules.

## Technology

React, TypeScript, Vite, Supabase.

## Architecture and source map

- `pages/` — article, setup and administration screens
- `services/api.ts` — data-service methods
- `lib/supabase.ts` — configurable database client
- `db_schema.sql` — database schema

## Local development

Requires Node.js and npm. From the repository root:

```sh
npm install
npm run dev
```

Build command declared by this checkout: `npm run build`.

These are the repository scripts, not a claim of a passing build. Dependency installation, build and live integrations were not executed during the documentation review.

## Configuration and limitations

The Supabase configuration flow stores client configuration locally. Use only browser-safe project credentials and enforce authorization through database policies. Apply the schema only to a separate test project after review.

## Portfolio relevance

Shows how repeated support tasks can be collected into a reusable internal tool.

## Documentation next steps

Capture screenshots using synthetic data, document a reproducible test run, and record which integrations have been verified. Keep credentials and deployment-specific configuration outside version control.
