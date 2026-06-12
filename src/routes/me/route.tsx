import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '@/lib/site'
import { lazy } from 'react'

const MePage = lazy(() => import('./-me.component'))

export const Route = createFileRoute('/me')({
  component: MePage,
  head: () => ({
    meta: [
      { title: 'Matt Powell has a media kit' },
      {
        name: 'description',
        content:
          'Bio and photos for Matt Powell — performer, artist, and developer.',
      },
      { property: 'og:url', content: `${SITE_URL}/me` },
      { property: 'og:title', content: 'Matt Powell has a media kit' },
      {
        property: 'og:description',
        content:
          'Bio and photos for Matt Powell — performer, artist, and developer.',
      },
      { name: 'twitter:title', content: 'Matt Powell has a media kit' },
      {
        name: 'twitter:description',
        content:
          'Bio and photos for Matt Powell — performer, artist, and developer.',
      },
    ],
  }),
})
