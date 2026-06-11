import { SectionPage } from '@/components/SectionPage.tsx'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { hasWorkshop } from './-components/types'
import { TagsProvider } from '@/components/ui/tag'
import { useMemo } from 'react'

const workshopModules = import.meta.glob('./workshops/*.tsx', { eager: true })
const workshops = Object.values(workshopModules)
  .map((module) => (hasWorkshop(module) ? module.Workshop : null))
  .filter((w) => !!w)

const TeachingLayout = () => {
  const allTags = useMemo(() => {
    return [...new Set(workshops.flatMap((workshop) => workshop.tags))].sort(
      (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
    )
  }, [])

  return (
    <TagsProvider tags={allTags}>
      <SectionPage title="Teaching">
        <Outlet />
      </SectionPage>
    </TagsProvider>
  )
}

export const Route = createFileRoute('/teaching')({
  component: TeachingLayout,
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
