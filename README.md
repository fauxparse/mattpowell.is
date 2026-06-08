# mattpowell.is

A static portfolio site built with React, TanStack Router, and deployed on Vercel.

## Getting Started

To run locally:

```bash
pnpm install
pnpm dev
```

The app runs on `http://localhost:3000`.

## Building For Production

```bash
pnpm build
```

Output is a static SPA in `dist/` ready for deployment.

## Deployment

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

- **Domain:** mattpowell.is (via DNSimple)
- **Email:** whoever@mattpowell.is (via Google Workspace)
- **Infrastructure:** Static SPA with client-side routing

Push to GitHub → live in ~30 seconds.

## Styling

Uses [Tailwind CSS](https://tailwindcss.com/) for styling. Linting and formatting with [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html):

```bash
pnpm lint
pnpm format
pnpm check
```

## Routing

File-based routing with [TanStack Router](https://tanstack.com/router). Routes are in `src/routes/`.

Add a new route by creating a file:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return <div>About</div>
}
```

Use the `Link` component for navigation:

```tsx
import { Link } from '@tanstack/react-router'

export function Nav() {
  return <Link to="/about">About</Link>
}
```

The root layout is in `src/routes/__root.tsx`. Anything added there appears on all pages.

## Testing

```bash
pnpm test
```

Uses [Vitest](https://vitest.dev/) for unit and integration tests.
