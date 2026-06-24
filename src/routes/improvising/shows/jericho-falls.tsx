import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'

export const Show = {
  id: 'jericho-falls',
  title: 'The Last Days of Jericho Falls',
  tags: ['music', 'comedy'],
  short: 'All the hits you’ve never heard',
} as const satisfies ShowDefinition

export const Route = createFileRoute('/improvising/shows/jericho-falls')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <p>
          Jericho Falls is an aging rock legend, reunited with his band, The
          Crooked Walls (Lia Kelly, Matt Hutton, and Olly Howlett) for one final
          show.
        </p>
        <p>
          I know so many improvising musicians who are great improvisors but
          seldom get to act and play at the same time, so I put together this
          show for the 2024 NZ Improv Festival. Jennifer O’Sullivan hosted the
          show in the character of a TV presenter interviewing us about our
          careers, and the audience provided song titles by filling in the
          blanks in a “greatest hits” CD liner.
        </p>
        <PullQuote
          source="Kitty Parker, Theatreview"
          link="https://www.theatreview.org.nz/production/the-last-days-of-jericho-falls/#whoops-and-cheers-for-a-band-and-songs-that-didnt-exist-yesterday-and-wont-tomorrow"
        >
          Once the music starts these musicians have us tapping our toes,
          clapping our hands and belting out the chorus of most songs like they
          know and love them.
        </PullQuote>
        <p>
          Although it might be tricky to get the whole band back together,
          Jericho Falls is very much available to perform, and welcomes
          collaborations with local musicians.
        </p>
      </ShowBody>
    </>
  )
}
