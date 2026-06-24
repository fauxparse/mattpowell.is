import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'
import { AwardIcon } from 'lucide-react'

export const Show = {
  id: 'awkward-threesome',
  title: 'Awkward Threesome',
  tags: ['duo', 'comedy'],
  short: 'Spice up your stage life',
} as const satisfies ShowDefinition

export const Route = createFileRoute('/improvising/shows/awkward-threesome')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <p>
          What do two seasoned improvisors do to spice up their stage life?
          Bring in a third player!
        </p>
        <p>
          Each night, a new guest joins Jennifer O’Sullivan and Matt Powell on
          stage for an hour of fresh theatrical magic. The catch? Nobody, except
          our specially-selected improv couples therapist, knows who the guests
          are until they walk out on stage.
        </p>
        <PullQuote
          source="Corey Matthews, The Plus Ones (Melbourne)"
          link="https://theplusones.com/melbourne/2018/04/11/awkward-threesome-at-the-melbourne-international-comedy-festival/"
        >
          With a duo this strong in their art, one can confidently predict that
          this is a show destined to shine no matter who the next guest might
          be, and what style of improvised theatre they may provide.
        </PullQuote>
        <p>
          Previous guests have included Jason Geary (Thank God You’re Here),
          Abby Howells (Taskmaster NZ), and Ben Russell (Aunty Donna).
        </p>
        <p className="flex gap-2 items-center">
          <AwardIcon className="size-6 sketchy" />
          <span>Winner, “Tastiest Show”, 2016 New Zealand Fringe Festival</span>
        </p>
        <p className="flex gap-2 items-center">
          <AwardIcon className="size-6 sketchy" />
          <span>
            Nominated, “Outstanding Ensemble”, 2018 New Zealand Fringe Festival
          </span>
        </p>
      </ShowBody>
    </>
  )
}
