import { SectionPage } from '@/components/SectionPage.tsx'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { hasWorkshop } from './-components/types'
import { TagsProvider } from '@/components/ui/tag'
import { useCallback, useMemo } from 'react'
import { SITE_URL } from '@/lib/site'
import { ignoreSkippedViewTransition, parseSearchTags } from '@/lib/utils'

const workshopModules = import.meta.glob('./workshops/*.tsx', { eager: true })
const workshops = Object.values(workshopModules)
  .map((module) => (hasWorkshop(module) ? module.Workshop : null))
  .filter((w) => !!w)

const TeachingLayout = () => {
  const { tags: searchTags } = Route.useSearch()
  const navigate = Route.useNavigate()

  const allTags = useMemo(() => {
    return [...new Set(workshops.flatMap((workshop) => workshop.tags))].sort(
      (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
    )
  }, [])

  const selectedTags = useMemo(
    () => new Set(parseSearchTags(searchTags)),
    [searchTags],
  )
  const setSelectedTags = useCallback(
    (selected: Set<string>) => {
      const tags = [...selected]

      void navigate({
        search: tags.length > 0 ? { tags } : {},
        mask: {
          search: {},
          unmaskOnReload: true,
        },
      }).catch(ignoreSkippedViewTransition)
    },
    [navigate],
  )

  return (
    <TagsProvider
      tags={allTags}
      selected={selectedTags}
      onSelectedChange={setSelectedTags}
    >
      <SectionPage title="Teaching">
        <Outlet />
      </SectionPage>
    </TagsProvider>
  )
}

type SearchParams = {
  tags?: string[]
}

export const Route = createFileRoute('/teaching')({
  component: TeachingLayout,
  validateSearch: (search): SearchParams => {
    const tags = parseSearchTags(search.tags)

    return tags.length > 0 ? { tags } : {}
  },
  head: () => ({
    meta: [
      { title: 'Matt Powell is teaching' },
      {
        name: 'description',
        content:
          'Improv workshops by Matt Powell — available for festivals and events across Aotearoa and internationally.',
      },
      { property: 'og:url', content: `${SITE_URL}/teaching` },
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
