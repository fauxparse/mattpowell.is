import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SITE_URL } from '@/lib/site'
import { useCallback, useMemo } from 'react'
import { TagsProvider } from '@/components/ui/tag'
import { SectionPage } from '@/components/SectionPage'
import { hasShow } from './-components/types'
import { ignoreSkippedViewTransition, parseSearchTags } from '@/lib/utils'

const showModules = import.meta.glob('./shows/*.tsx', { eager: true })
const shows = Object.values(showModules)
  .map((module) => (hasShow(module) ? module.Show : null))
  .filter((w) => !!w)

const ImprovisingLayout = () => {
  const { tags: searchTags } = Route.useSearch()
  const navigate = Route.useNavigate()

  const allTags = useMemo(() => {
    return [...new Set(shows.flatMap((workshop) => workshop.tags))].sort(
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
      <SectionPage title="Improvising">
        <Outlet />
      </SectionPage>
    </TagsProvider>
  )
}

type SearchParams = {
  tags?: string[]
}

export const Route = createFileRoute('/improvising')({
  component: ImprovisingLayout,
  validateSearch: (search): SearchParams => {
    const tags = parseSearchTags(search.tags)

    return tags.length > 0 ? { tags } : {}
  },
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
