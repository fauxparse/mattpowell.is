import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

const ImprovisingPage = lazy(() => import('./-improvising.component'))

export const Route = createFileRoute('/improvising')({
  component: ImprovisingPage,
  head: () => ({
    meta: [
      {
        title: 'Matt Powell is improvising',
      },
    ],
  }),
})
