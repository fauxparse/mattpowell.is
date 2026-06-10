import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

const TeachingPage = lazy(() => import('./-teaching.component'))

export const Route = createFileRoute('/teaching/')({
  component: TeachingPage,
  head: () => ({
    meta: [
      { title: 'Matt Powell is teaching' },
      {
        name: 'description',
        content:
          'Improv workshops by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
      { property: 'og:url', content: 'https://mattpowell.is/teaching' },
      { property: 'og:title', content: 'Matt Powell is teaching' },
      {
        property: 'og:description',
        content:
          'Improv workshops by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
      { name: 'twitter:title', content: 'Matt Powell is teaching' },
      {
        name: 'twitter:description',
        content:
          'Improv workshops by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
    ],
  }),
})
