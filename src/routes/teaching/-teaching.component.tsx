import { Tag, useTags } from '@/components/ui/tag.tsx'
import { useMemo } from 'react'
import { XIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { hasWorkshop } from './-components/types'

const workshopModules = import.meta.glob('./workshops/*.tsx', { eager: true })
const workshops = Object.values(workshopModules)
  .map((module) => (hasWorkshop(module) ? module.Workshop : null))
  .filter((w) => !!w)

export default function TeachingPage() {
  const { tags, selected, toggle, clear, tagColors } = useTags()

  const filtered = useMemo(() => {
    if (selected.size === 0) return workshops

    return workshops.filter((workshop) => {
      return workshop.tags.some((tag) => selected.has(tag))
    })
  }, [selected])

  return (
    <>
      <div className="prose md:prose-lg lg:prose-xl py-10">
        <p>
          I’ve been teaching improv for over 20 years, from high school
          TheatreSports™ programmes to one-on-one coaching sessions. My personal
          teaching philosophy is that it works best when the teacher is also
          curious about the material, so many of my workshops are designed
          around interrogating a specific question or idea, rather than telling
          you what I think.
        </p>
        <p>
          All of the workshops below are battle-tested and ready to go. Most of
          them have been taught at NZIF or other improv festivals, so by
          convention they assume around 3 hours and around 12–16 participants,
          but everything is flexible. Click on the cards to learn more about
          each workshop.
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
            Filter workshops
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
        {filtered.map((workshop) =>
          workshop.tags.includes('show') ? null : (
            <Link
              to={`/teaching/workshops/${workshop.id}`}
              key={workshop.title}
              className="panel flex flex-col gap-2 before:border before:border-border before:bg-transparent rounded-lg p-4 hover:before:boil"
              style={{ viewTransitionName: `workshop-${workshop.id}` }}
            >
              <div className="flex flex-wrap gap-2">
                {workshop.tags.map((tag) => (
                  <Tag key={tag} color={tagColors[tag]}>
                    {tag}
                  </Tag>
                ))}
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold uppercase text-accent-500 text-balance">
                  {workshop.title}
                </h3>
                <p>{workshop.short}</p>
              </div>
            </Link>
          ),
        )}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>
    </>
  )
}
