import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '@/lib/site'
import { lazy } from 'react'

const ImprovisingPage = lazy(() => import('./-improvising.component'))

export const Route = createFileRoute('/improvising/')({
  component: ImprovisingPage,
  head: () => ({
    meta: [
      { title: 'Matt Powell is improvising' },
      {
        name: 'description',
        content:
          'Improv performances by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
      { property: 'og:url', content: `${SITE_URL}/improvising` },
      { property: 'og:title', content: 'Matt Powell is improvising' },
      {
        property: 'og:description',
        content:
          'Improv performances by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
      { name: 'twitter:title', content: 'Matt Powell is teaching' },
      {
        name: 'twitter:description',
        content:
          'Improv performances by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
    ],
  }),
})
