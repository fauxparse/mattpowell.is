import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '@/lib/site'
import { lazy } from 'react'

const ImprovisingPage = lazy(() => import('./-improvising.component'))

export const Route = createFileRoute('/improvising')({
  component: ImprovisingPage,
  head: () => ({
    meta: [
      { title: 'Improvising | Matt Powell' },
      {
        name: 'description',
        content:
          'Matt Powell has been doing improv for 25+ years — shows, formats, and performances.',
      },
      { property: 'og:url', content: `${SITE_URL}/improvising` },
      { property: 'og:title', content: 'Improvising | Matt Powell' },
      {
        property: 'og:description',
        content:
          'Matt Powell has been doing improv for 25+ years — shows, formats, and performances.',
      },
      { name: 'twitter:title', content: 'Improvising | Matt Powell' },
      {
        name: 'twitter:description',
        content:
          'Matt Powell has been doing improv for 25+ years — shows, formats, and performances.',
      },
    ],
  }),
})
