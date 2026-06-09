import {
  Tag,
  TAG_COLORS,
  useTags,
  type TagColor,
} from '#/components/ui/tag.tsx'
import { SectionPage } from '@/components/SectionPage.tsx'
import type React from 'react'
import { useMemo } from 'react'

type Workshop = {
  title: string
  tags: string[]
  duration: number
  short: string
  description: React.ReactNode
}

const workshops: Workshop[] = [
  {
    title: 'En Pointe',
    tags: ['physical', 'scenework'],
    duration: 180,
    short: 'Use techniques from ballet to create engaging physical scenes',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'The Idiot',
    tags: ['character'],
    duration: 180,
    short: 'Play with characters who know less than they should',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Starting Over and Over',
    tags: ['structure', 'confidence'],
    duration: 180,
    short: 'Explore over a hundred different ways to start a scene',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Big Me: MC Skills',
    tags: ['MCing', 'confidence', 'character'],
    duration: 180,
    short: 'Discover your MC persona',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Nothing Happened Today',
    tags: ['structure', 'scenework'],
    duration: 180,
    short: 'How to play scenes where nothing happens—and why you should',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Scenes that suck',
    tags: ['confidence', 'scenework'],
    duration: 360,
    short: 'Experience real failure in a controlled environment',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Sneaking up on yourself',
    tags: ['solo', 'structure'],
    duration: 180,
    short: 'Tips and tricks for creating solo improvised work',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Don’t do this workshop alone',
    tags: ['show'],
    duration: 180,
    short: 'A large-cast horror anthology format',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'It’s dangerous to go alone',
    tags: ['show'],
    duration: 180,
    short: 'A large-cast fantasy video game adventure format',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Your extraordinary life',
    tags: ['show'],
    duration: 180,
    short: 'A “This is Your Life” style show featuring real audience members',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
  {
    title: 'Reading the scene',
    tags: ['character', 'scenework'],
    duration: 180,
    short: 'Playing with what’s already in front of you',
    description: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    ),
  },
]

export default function TeachingPage() {
  const allTags = useMemo(() => {
    return [...new Set(workshops.flatMap((workshop) => workshop.tags))].sort()
  }, [])

  const { selected, toggle } = useTags()

  const tagColors = useMemo(
    () =>
      allTags.reduce(
        (acc, tag, index) => {
          acc[tag] = TAG_COLORS[index % TAG_COLORS.length]
          return acc
        },
        {} as Record<string, TagColor>,
      ),
    [allTags],
  )

  const filtered = useMemo(() => {
    if (selected.size === 0) return workshops

    return workshops.filter((workshop) => {
      return workshop.tags.some((tag) => selected.has(tag))
    })
  }, [selected])

  return (
    <SectionPage title="Teaching">
      <div className="flex flex-wrap gap-2">
        {allTags.map(
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] auto-rows-[12rem] gap-4 py-8">
        {filtered.map((workshop) =>
          workshop.tags.includes('show') ? null : (
            <article
              key={workshop.title}
              className="panel flex flex-col gap-2 before:border before:border-border before:bg-transparent rounded-lg p-4 hover:before:boil"
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
            </article>
          ),
        )}
      </div>
    </SectionPage>
  )
}
