import { Tag, useTags } from '@/components/ui/tag'
import { hasShow } from './-components/types'
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { XIcon } from 'lucide-react'
import { Card } from '@/components/Card'

const showModules = import.meta.glob('./shows/*.tsx', { eager: true })
const shows = Object.values(showModules)
  .map((module) => (hasShow(module) ? module.Show : null))
  .filter((w) => !!w)

export default function ImprovisingPage() {
  const { tags, selected, toggle, clear, tagColors } = useTags()

  const filtered = useMemo(() => {
    if (selected.size === 0) return shows

    return shows.filter((show) => {
      return show.tags.some((tag) => selected.has(tag))
    })
  }, [selected])

  return (
    <>
      <h1 className="page-title">My shows and formats</h1>
      <div className="prose md:prose-lg lg:prose-xl py-10">
        <p>
          I’ve been improvising for over 25 years, in all kinds of formats and
          styles. Here are some of my favourites! Many of these are ready to
          teach and perform with your group: look out for the “workshop” tag
          below.
        </p>
        <p>
          If you’d like something more bespoke, feel free to{' '}
          <Link to="/" hash="available" className="link">
            get in touch
          </Link>
          !
        </p>
      </div>
      <div>
        <div className="flex items-start justify-between gap-4 py-2">
          <h3 className="text-lg font-bold uppercase text-accent-500">
            Filter shows
          </h3>
          {selected.size > 0 && (
            <button
              onClick={() => clear()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <XIcon className="size-4 sketchy" /> clear filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map(
            (tag) =>
              tag !== 'show' && (
                <Tag
                  key={tag}
                  variant={selected.has(tag) ? 'default' : 'outline'}
                  color={tagColors[tag]}
                  onClick={() => toggle(tag)}
                >
                  {tag}
                </Tag>
              ),
          )}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] auto-rows-[12rem] gap-4 py-8">
        {filtered.map((show) =>
          show.tags.includes('show') ? null : (
            <Card
              key={show.id}
              to={`/improvising/shows/${show.id}`}
              title={show.title}
              short={show.short}
              tags={show.tags}
              image={show.image}
            />
          ),
        )}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>
    </>
  )
}
