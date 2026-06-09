import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

const TeachingPage = lazy(() => import('./-teaching.component'))

export const Route = createFileRoute('/teaching')({
  component: TeachingPage,
})
