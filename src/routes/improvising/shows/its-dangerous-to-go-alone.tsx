import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'
import { MaskedImage } from '@/components/MaskedImage'

import ItsDangerousToGoAlone from '@/assets/images/idtga.webp'

export const Show = {
  id: 'its-dangerous-to-go-alone',
  title: 'It’s Dangerous to Go Alone',
  tags: ['ensemble', 'workshop', 'adventure'],
  short: 'An improvised epic quest',
  image: ItsDangerousToGoAlone,
} as const satisfies ShowDefinition

export const Route = createFileRoute(
  '/improvising/shows/its-dangerous-to-go-alone',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <PullQuote>
          In ancient times, our land was beset by evil.
          <br />
          When we needed them most, a hero arose to fight the darkness.
          <br />
          But in defeating the great evil, the hero fell, and vanished from
          memory.
          <br />
          1,000 years later…
        </PullQuote>
        <p>
          Conceived and mounted in just over 24 hours, IT’S DANGEROUS TO GO
          ALONE is a love letter to adventure games in the LEGEND OF ZELDA
          mould.
        </p>
        <p>
          At the 2025 New Zealand Improv Festival, we needed to fill a gap in
          the programme when several of our presenters were struck down by
          COVID. Based on the work I’d done with DON’T SEE THIS SHOW ALONE, I
          put together another large-cast ensemble show, this time taking
          inspiration from epic fantasy adventure games.
        </p>
        <picture className="not-prose w-full max-w-lg mx-auto flex flex-col items-center gap-4">
          <MaskedImage
            orientation="landscape"
            src={ItsDangerousToGoAlone}
            className="w-full aspect-4/3"
            alt="Jess Allen, Liz Butler, Christine Covode, and Matt Powell in IT’S DANGEROUS TO GO ALONE at the New Zealand Improv Festival in 2025. Liz Butler, the hero, is raising a sword aloft triumphantly, while the others hold three fragments of an ancient artefact."
          />
          <caption className="text-sm text-muted-foreground text-center px-4">
            Jess Allen, Liz Butler, Christine Covode, and Matt Powell in IT’S
            DANGEROUS TO GO ALONE at the New Zealand Improv Festival in 2025.
          </caption>
        </picture>
        <p>
          Journey through harsh deserts, icy mountain passes, and forgotten
          libraries, and assemble a party of heroes to reforge an ancient
          artefact and defeat a timeless evil.
        </p>
        <PullQuote
          source="John Smythe, Theatreview"
          link="https://www.theatreview.org.nz/production/oops-all-donkeys/#ingeniously-improvised-at-a-very-steady-pace"
        >
          …an ingeniously improvised show
        </PullQuote>
        <p>
          This show was been performed at the New Zealand Improv Festival
          (2025). It is teachable as a three-hour workshop for mixed experience
          levels.
        </p>
      </ShowBody>
    </>
  )
}
