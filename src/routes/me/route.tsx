import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

const MePage = lazy(() => import('./-me.component'))

export const Route = createFileRoute('/me')({
  component: MePage,
})
